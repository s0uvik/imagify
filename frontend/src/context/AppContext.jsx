import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { API_URL } from "../constant";
import { toast } from "react-toastify";

const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [credit, setCredit] = useState(false);

  const logout = () => {
    localStorage.clear();
    setToken("");
    setUser(null);
  };

  const loadCreditData = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/api/user/credits`, {
        headers: { token },
      });
      if (data.success) {
        setCredit(data.credits);
        setUser(data.user);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const generateImage = async (prompt) => {
    try {
      const { data } = await axios.post(
        `${API_URL}/api/image/generate-image`,
        { prompt },
        {
          headers: { token },
        }
      );
      if (data.success) {
        loadCreditData();
        console.log(data);
        return data.image;
      } else {
        toast.success(data.message);
        loadCreditData();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    loadCreditData();
  }, [token]);

  const value = {
    user,
    setUser,
    showLogin,
    setShowLogin,
    token,
    setToken,
    credit,
    setCredit,
    logout,
    generateImage,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

AppContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAppContext = () => useContext(AppContext);
export default AppContextProvider;
