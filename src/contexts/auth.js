import React, { createContext, useState, useEffect } from "react";
import api from "../config/api";
import { toast } from "react-toastify";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadUserData() {
      // Get user info from locastorage
      let authData = await localStorage.getItem("@i9acquisitor:auth");
      if (authData) {
        authData = JSON.parse(authData);
        api.defaults.headers.Authorization = `Bearer ${authData.token}`;
        setUser({
          acquisitor: authData.acquisitor,
          auth: authData.auth,
        });
      }
    }
    loadUserData();
  }, []);

  async function setUserStatus() {}
  async function signIn(email, password) {
    try {
      const response = await api.post("/sessions", {
        type: "acquisitor",
        email,
        password,
      });
      api.defaults.headers.Authorization = `Bearer ${response.data.token}`;
      await localStorage.setItem(
        "@i9acquisitor:auth",
        JSON.stringify(response.data)
      );
      setUser({
        acquisitor: response.data.acquisitor,
        auth: response.data.auth,
      });
    } catch (e) {
      toast.error(e.response.data.error);
    }
  }
  async function signOut() {
    api.defaults.headers.Authorization = "";
    setUser(null);
    await localStorage.clear();
  }
  async function signUp(body) {}

  return loading ? null : (
    <AuthContext.Provider
      value={{
        signed: !!user,
        user,
        signIn,
        signOut,
        signUp,
        setUserStatus,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
