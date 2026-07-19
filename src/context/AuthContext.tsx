import React, { createContext, useState, useContext, ReactNode } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  age: number;
  password: string;
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  signup: (name: string, email: string, phone: string, password: string, age: number) => Promise<string>;
  signin: (email: string, password: string) => Promise<string>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string): boolean => {
    return password.length >= 6;
  };

  const validatePhone = (phone: string): boolean => {
    return phone.length >= 10;
  };

  const signup = async (name: string, email: string, phone: string, password: string, age: number): Promise<string> => {
    if (!name.trim()) {
      return "Name is required";
    }

    if (!validateEmail(email)) {
      return "Invalid email format";
    }

    if (!validatePhone(phone)) {
      return "Phone must be 10+ digits";
    }

    if (!validatePassword(password)) {
      return "Password must be 6+ characters";
    }

    if (age < 13) {
      return "Age must be 13 or older";
    }

    if (users.some(u => u.email === email)) {
      return "Email already registered";
    }

    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
      phone,
      password,
      age,
    };

    setUsers([...users, newUser]);
    setUser(newUser);
    setIsLoggedIn(true);

    return "";
  };

  const signin = async (email: string, password: string): Promise<string> => {
    if (!validateEmail(email)) {
      return "Invalid email format";
    }

    const foundUser = users.find(u => u.email === email);

    if (!foundUser) {
      return "Email not found";
    }

    if (foundUser.password !== password) {
      return "Invalid password";
    }

    setUser(foundUser);
    setIsLoggedIn(true);

    return "";
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, signup, signin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};