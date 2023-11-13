import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  IoCreateOutline,
  IoLogInOutline,
  IoLogOutOutline,
  IoPersonAddOutline,
} from "react-icons/io5";
import { useSelector } from "react-redux";
import { IRootState } from "../../store";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const user = useSelector((state: IRootState) => state.auth.currentUser);
  const userLogout = () => {
    sessionStorage.removeItem("jwt");
    sessionStorage.removeItem("userInfo");
    window.location.reload();
  };

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
<<<<<<< Updated upstream
        <div className="flex items-center">
          {user?.username}
          {user?.role === "ADMIN" && (
            <Link to="/new-restaurant" className="text-lg font-bold">
=======
        <div className="flex items-center gap-3 text-sm">
          {user && user.username}
          {user?.role === "Admin" && (
            <Link to="/restaurants/create" className="text-lg font-bold">
>>>>>>> Stashed changes
              <IoCreateOutline />
            </Link>
          )}
          <button
            type="button"
            onClick={userLogout}
            className="flex items-center gap-1"
          >
            <IoLogOutOutline />
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <Link
            to="/sign-up"
            className="text-lg font-bold hover:bg-slate-200 rounded-full p-2"
          >
            <IoPersonAddOutline />
          </Link>
          <Link
            to="/login"
            className="text-lg font-bold hover:bg-slate-200 rounded-full p-2"
          >
            <IoLogInOutline />
          </Link>
        </div>
      )}
    </div>
  );
};

export default Header;
