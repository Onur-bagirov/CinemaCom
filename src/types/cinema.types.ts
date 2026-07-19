export interface Movie {
  id: number;
  title: string;
  genre: string;
  rating: number;
  image: string;
  duration: number;
  language: string;
  price: number;
  time: string;
  description: string;
}

export interface CartItem {
  movieId: number;
  movieTitle: string;
  quantity: number;
  price: number;
}

export interface Booking {
  id: number;
  movieTitle: string;
  date: string;
  time: string;
  status: string;
}

export type ThemeType = "light" | "dark";
