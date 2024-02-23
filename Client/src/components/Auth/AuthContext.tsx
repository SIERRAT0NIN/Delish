import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";

interface FormValues {
  username: string;
  email: string;
  password: string;
}

interface LoginValues {
  email: string;
  password: string;
}

interface AuthContextProps {
  login: (values: LoginValues) => Promise<void | boolean>;
  logout: () => Promise<boolean>;
  refreshUser: () => Promise<boolean>;
  signup: (values: FormValues) => Promise<void | boolean>;
  getCookie: (name: string) => string;
  user: object | null;
  userId: string;
}

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);

interface AuthProviderProps {
  children: ReactNode;
}

export const useAuth = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return authContext;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<{
    id: string;
    username: string;
    email: string;
  } | null>(null);
  const [userId, setUserId] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );
  const [loadingLogout, setLoadingLogout] = useState(false);
  const { refreshToken, setRefreshToken } = useState();

  useEffect(() => {
    if (!loadingLogout) {
      refreshUser();
    }
  }, []);

  const getCookie = (name: string): string => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);

    if (parts.length === 2) {
      return parts.pop()?.split(";").shift() || "";
    }

    return "";
  };

  const refreshUser = (): Promise<boolean> => {
    return fetch("/api/user", {
      credentials: "include",
    })
      .then((res) => {
        if (res.ok) {
          return res.json().then((data) => {
            if (!loadingLogout) {
              setUser(data);
              return true;
            }
          }) as Promise<boolean>;
        } else {
          if (res.status === 401) {
            fetch("/api/refresh", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${refreshToken}`,
                "X-CSRF-TOKEN": getCookie("csrf_refresh_token"),
              },
              credentials: "include",
            })
              .then((res) => {
                if (res.ok) {
                  return res.json().then((data) => {
                    if (!loadingLogout) {
                      setUser(data);
                      return true;
                    }
                  }) as Promise<boolean>;
                } else {
                  setUser(null);
                  return false;
                }
              })
              .catch((e) => {
                console.error(e);
                return false;
              }) as Promise<boolean>;
          } else {
            return false;
          }
        }
      })
      .catch((e) => {
        console.error(e);
        return false;
      }) as Promise<boolean>;
  };

  const login = (values: LoginValues): Promise<void | boolean> => {
    const token = localStorage.getItem("token");
    return fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        x_csrf_token: getCookie("csrf_access_token"),
      },
      body: JSON.stringify({
        email: values.email,
        password: values.password,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Login failed");
        }
        return response.json();
      })
      .then((data) => {
        setUser({
          id: data.id,
          username: data.username,
          email: data.email,
        });

        setUserId(data.id);
        setSnackbarMessage(data.message || "Login successful");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
        localStorage.setItem("token", data.access_token);
        localStorage.setItem("refreshToken", data.refresh_token);
        return true;
      })
      .catch((error) => {
        setSnackbarMessage(
          (error as Error).message || "Failed to login. Please try again."
        );
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
        return false;
      });
  };

  const logout = (): Promise<boolean> => {
    setLoadingLogout(true);
    return fetch("/api/user/logout", {
      method: "DELETE",
    })
      .then((resp) => {
        if (resp.ok) {
          setUser(null);
          return true;
        } else {
          return false;
        }
      })
      .catch(() => false)
      .finally(() => {
        setLoadingLogout(false);
      });
  };

  const signup = (values: FormValues): Promise<void | boolean> => {
    return fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: values.username,
        email: values.email,
        password: values.password,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          return false;
        }
        return response.json();
      })
      .then((data) => {
        if (!data) {
          console.error("Signup failed");
          setSnackbarMessage("Failed to sign up. Please try again.");
          setSnackbarSeverity("error");
          setSnackbarOpen(true);
          console.log(data);
          localStorage.setItem("token", data.accessToken);
          localStorage.setItem("refreshToken", data.refreshToken);
          return false;
        }

        setUser(data);
        setSnackbarMessage(data.message || "User created successfully");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
        localStorage.setItem("token", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        setRefreshToken(data.refreshToken);
        return true;
      })
      .catch((error) => {
        console.error("Error:", error);
        setSnackbarMessage("Failed to sign up. Please try again.");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
        return false;
      });
  };

  return (
    <AuthContext.Provider
      value={{ signup, login, logout, refreshUser, user, getCookie, userId }}
    >
      {children}
    </AuthContext.Provider>
  );
};
