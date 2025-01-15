import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const value = {
    user,
    setUser,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

AppContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAppContext = () => useContext(AppContext);
export default AppContextProvider;
