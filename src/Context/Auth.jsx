import React from "react";
import './Auth.css'
import { useContext,createContext,useState,useEffect } from "react";
import { toast, ToastContainer } from 'react-toastify';

const AuthContext=createContext();

const FakeUsers=[
    
       { email:"anjali004@gmail.com",password:"Anj@123"},
       { email:"anjalixyz@gmail.com",password:"anxyz12"},
        {email:"limenzy220@gmail.com",password:"LzDev@123"},
];
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);


  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  
  const login = (email, password) => {
    const foundUser = FakeUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (foundUser) {
      const userData = { email: foundUser.email };

      setUser(userData);
      localStorage.setItem("loggedInUser", JSON.stringify(userData));

      toast.success("Login successful ");
    } else {
      toast.error("Invalid credentials ");
    }
  };

  
  const logout = () => {
    setUser(null);
    localStorage.removeItem("loggedInUser");

    toast.info("Logged out successfully!");
  };

  return (
    <>
    
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />

      <AuthContext.Provider value={{ user, login, logout }}>
        {children}
      </AuthContext.Provider>
    </>
  );
};


export const useAuth = () => useContext(AuthContext);