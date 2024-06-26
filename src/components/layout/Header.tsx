import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  IoCreateOutline,
  IoLogInOutline,
  IoLogOutOutline,
  IoPersonAddOutline,
} from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { enqueueSnackbar } from "notistack";
import { getCurrentUserThunk } from "../../redux/auth/authSlice";
import { AppDispatch, IRootState } from "../../store";

const Header = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: IRootState) => state.auth.currentUser);

  useEffect(() => {
    if (sessionStorage.getItem("jwt")) {
      dispatch(getCurrentUserThunk());
    }
  }, [dispatch]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const userLogout = () => {
    sessionStorage.removeItem("jwt");
    enqueueSnackbar("Logging out", {
      variant: "success",
    });
    setTimeout(() => {
      navigate(0);
    }, 1000);
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full flex justify-between px-4 h-16 bg-gray-100 z-10 ${
        scrolled && "shadow-lg opacity-90"
      }`}
    >
      {" "}
      <Link to="/" className="flex items-center gap-1">
        <img
          src={process.env.PUBLIC_URL + "/logo.png"}
          alt="OpenRice"
          className="w-8 h-8"
        />
        <h1 className="text-2xl font-bold">OpenRice</h1>
      </Link>
      {sessionStorage.getItem("jwt") ? (
        <div className="flex items-center justify-between">
          <Link
            to="/profile"
            className="hover:bg-slate-200 hover:text-gray-800 hover:font-semibold p-0.5 rounded-sm"
          >
            <div className="text-sm p-2">{user && user.username}</div>
          </Link>
          {user?.role === "Admin" && (
            <Link
              to="/restaurant/create"
              className="hover:bg-slate-200 rounded-full p-2"
            >
              <IoCreateOutline size={20} />
            </Link>
          )}
          <button
            type="button"
            onClick={userLogout}
            className="hover:bg-slate-200 rounded-full p-2"
          >
            <IoLogOutOutline size={20} />
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <Link to="/sign-up" className="hover:bg-slate-200 rounded-full p-2">
            <IoPersonAddOutline size={20} />
          </Link>
          <Link to="/login" className="hover:bg-slate-200 rounded-full p-2">
            <IoLogInOutline size={20} />
          </Link>
        </div>
      )}
    </div>
  );
};

export default Header;
