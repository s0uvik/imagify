import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { assets } from "../assets/assets";

const Navbar = () => {
  const { user, setShowLogin, logout, credit } = useAppContext();
  const navigate = useNavigate();

  return (
    <header className=" flex  justify-between items-center py-4">
      <Link to="/">
        <img src={assets.logo} alt="logo" className=" w-28 sm:w-32 lg:w-40" />
      </Link>
      <nav>
        {user ? (
          <div className=" flex items-center gap-2 sm:gap-5">
            <button
              className="flex items-center gap-2 bg-blue-100 px-4 py-2 sm:px-6 text-sm rounded-full hover:scale-105 transition-all duration-300"
              onClick={() => navigate("/price")}
            >
              <img src={assets.credit_star} alt="credit" className=" w-5" />
              <p className=" font-medium text-gray-600">
                Credit left: {credit}
              </p>
            </button>
            <p className=" text-gray-600 max-sm:hidden pl-4">Hi, Souvik</p>
            <div className=" relative group">
              <img
                src={assets.profile_icon}
                alt="user"
                className="w-10 drop-shadow"
              />
              <div
                className=" absolute hidden group-hover:block top-0 right-0 z-10 text-black
               rounded-none pt-12"
              >
                <u className=" list-none">
                  <li
                    onClick={logout}
                    className=" py-1 px-2 cursor-pointer pr-10 bg-white"
                  >
                    Logout
                  </li>
                </u>
              </div>
            </div>
          </div>
        ) : (
          <div className=" flex items-center gap-2 sm:gap-5">
            <Link to="/price">
              <p className=" cursor-pointer">Pricing</p>
            </Link>
            <button
              onClick={() => setShowLogin(true)}
              className=" bg-zinc-800 text-white px-7 py-2 sm:px-10 text-sm rounded-full"
            >
              Login
            </button>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
