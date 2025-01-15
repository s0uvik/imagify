import { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import { motion } from "motion/react";

const Login = () => {
  const [state, setState] = useState("Login");
  const { setShowLogin } = useAppContext();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "unset");
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center">
      <motion.form
        className=" relative bg-white p-10 rounded-lg text-slate-500"
        initial={{ opacity: 0.2, y: 50 }}
        transition={{ duration: 0.5 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h1 className=" text-center text-2xl text-neutral-700">{state}</h1>
        <p className=" text-sm">Welcome! please {state} in to continue</p>
        {state !== "Login" && (
          <div className=" border px-6 py-2 flex items-center gap-2 rounded-full mt-5">
            <img width={30} src={assets.profile_icon} alt="" className="" />
            <input
              type="text"
              className=" outline-none text-sm"
              placeholder="Full name"
              required
              name=""
              id=""
            />
          </div>
        )}
        <div className=" border px-6 py-3 flex items-center gap-2 rounded-full mt-4">
          <img src={assets.email_icon} alt="" className=" ml-2 px-1" />
          <input
            type="email"
            className=" outline-none text-sm"
            placeholder="Email id"
            required
            name=""
            id=""
          />
        </div>
        <div className=" border px-6 py-3 flex items-center gap-2 rounded-full mt-4">
          <img src={assets.lock_icon} alt="" className=" ml-2 px-1" />
          <input
            type="password"
            className=" outline-none text-sm"
            placeholder="Password"
            required
            name=""
            id=""
          />
        </div>
        <p className=" text-sm text-blue-600 my-4 cursor-pointer">
          Forgot password
        </p>
        <button className="text-white bg-zinc-800 px-7 py-2 sm:px-10 text-sm w-full rounded-full">
          {state === "Login" ? "Login" : "Create Account"}
        </button>
        {state === "Login" ? (
          <button
            type="button"
            onClick={() => setState("Sign Up")}
            className=" mt-4 text-center"
          >
            Don&apos;`t have an account?{" "}
            <span className=" text-blue-600 cursor-pointer">Sign up</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setState("Login")}
            className=" mt-4 text-center"
          >
            Already have an account?{" "}
            <span className=" text-blue-600 cursor-pointer">Login</span>
          </button>
        )}
        <button type="button" onClick={() => setShowLogin(false)}>
          <img
            src={assets.cross_icon}
            className=" absolute top-3 right-3"
            alt=""
          />
        </button>
      </motion.form>
    </div>
  );
};

export default Login;
