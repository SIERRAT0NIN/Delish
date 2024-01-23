import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";

// Define the properties you expect in your AuthContext
interface AuthContextProps {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
  refreshUser: () => Promise<boolean>;
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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

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

  const login = () => {
    setIsAuthenticated(true);
    // Handle login logic
  };

  const logout = () => {
    setIsAuthenticated(false);
    // Handle logout logic
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, refreshUser, user }}>
      {children}
    </AuthContext.Provider>
  );
};
