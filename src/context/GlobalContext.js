import { createContext, useContext } from "react";

export const MyGlobalContext = createContext({
  user: null,
  setUser: () => {},
  userDet: null,
  setUserDet: () => {},
  loading: true,
  setLoading: () => {},
  error: false,
  setError: () => {},
});

export const useGlobalContext = () => useContext(MyGlobalContext);