import { createContext } from "react";
const AuthContext = createContext({
  token: null,
  setToken: () => {},
  history: [],
  setHistory: () => {},
});

export default AuthContext;
