import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
// import { FormikHelpers } from 'formik';

// Define the properties you expect in your AuthContext

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
  // isAuthenticated: boolean;
  login: (values: LoginValues) => Promise<void | boolean>;
  logout: () => Promise<boolean>;
  refreshUser: () => Promise<boolean>;
  signup: (values: FormValues) => Promise<void | boolean>;
  getCookie: (name: string) => string;
  user: object | null
}

// Create the AuthContext with the defined properties
export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// Define the props for the AuthProvider component
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

// Create the AuthProvider component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );


  useEffect(()=>{
    refreshUser()
  },[])

  const getCookie = (name: string): string => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);

    if (parts.length === 2) {
      return parts.pop()?.split(';').shift() || '';
    }

    return '';
  };

  const refreshUser = (): Promise<boolean> => {
    return fetch('/api/user', {
      credentials: 'include'
    }).then(res => {
      if (res.ok) {
        return res.json().then(data => {
          setUser(data);
          return true;
        }) as Promise<boolean>;
      } else {
        if (res.status === 401) {
          return fetch('/api/refresh', {
            headers: {
              'X-CSRF-TOKEN': getCookie('csrf_refresh_token')
            }
          }).then(res => {
            if (res.ok) {
              return res.json().then(data => {
                setUser(data);
                return true;
              }) as Promise<boolean>;
            } else {
              setUser(null)
              return false;
            }
          })
          .catch(e => {
            console.error(e);
            return false;
          }) as Promise<boolean>;
        } else {
          return false;
        }
      }
    }).catch(e => {
      console.error(e);
      return false;
    }) as Promise<boolean>;
  };

  const login = (values: LoginValues): Promise<void | boolean> => {
    return fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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
        setUser(data)
        setSnackbarMessage(data.message || "Login successful");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
        // Redirect or update UI state
        return true;
      })
      .catch((error) => {
        setSnackbarMessage((error as Error).message || "Failed to login. Please try again.");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
        return false;
      })
  };

  const logout = (): Promise<boolean> => {
    return fetch('/api/user/logout',{
      method: 'DELETE'
    })
    .then(resp =>{
      if(resp.ok){
        setUser(null);
        return true
      }else{
        return false
      }
    })
    .catch(()=>false)
    
    // Handle logout logic
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
          // Handle failure case
          console.error("Signup failed");
          setSnackbarMessage("Failed to sign up. Please try again.");
          setSnackbarSeverity("error");
          setSnackbarOpen(true);
          return false;
        }
  
        // Handle success case
        console.log("Success:", data);
        setUser(data);
        setSnackbarMessage(data.message || "User created successfully");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
        // resetForm();
        return true;
      })
      .catch((error) => {
        // Handle any other errors
        console.error("Error:", error);
        setSnackbarMessage("Failed to sign up. Please try again.");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
        return false;
      });
  };

  return (
    <AuthContext.Provider value={{ signup, login, logout, refreshUser, user, getCookie }}>
      {children}
    </AuthContext.Provider>
  );
};
