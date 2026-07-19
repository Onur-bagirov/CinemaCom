import React, { createContext, useState, useContext, ReactNode } from "react";

interface FavoritesContextType {
  favorites: string[];
  addFavorite: (movieId: string) => void;
  removeFavorite: (movieId: string) => void;
  isFavorite: (movieId: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<string[]>([]);

  const addFavorite = (movieId: string) => {
    setFavorites((prev) => {
      if (!prev.includes(movieId)) {
        return [...prev, movieId];
      }
      return prev;
    });
  };

  const removeFavorite = (movieId: string) => {
    setFavorites((prev) => prev.filter((id) => id !== movieId));
  };

  const isFavorite = (movieId: string): boolean => {
    return favorites.includes(movieId);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within FavoritesProvider");
  }
  return context;
};