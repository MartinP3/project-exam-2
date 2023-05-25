import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../../components/UserContext";

export function Header() {
  const { user, setUser } = useContext(UserContext);
  const { name } = user;

  const handleLogout = () => {
    setUser({ loggedIn: false, venueManager: false, token: "", name: "" });
    localStorage.removeItem("accessToken");
  };

  return (
    <header>
      <nav className="flex justify-center gap-16 md:gap-96 my-5">
        <ul>
          <li>
            <Link to="/">HOLIDAZE</Link>
          </li>
        </ul>
        <ul className="flex gap-5">
          {user.loggedIn ? (
            <>
              <li>
                <button
                  className="hover:underline hover:underline-offset-2"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
              <li className="hover:underline hover:underline-offset-2">
                <Link to={`/profile/${name}`}>{name}</Link>
              </li>
            </>
          ) : (
            <>
              <li className="hover:underline hover:underline-offset-2">
                <Link to="/login">Login</Link>
              </li>
              <li className="hover:underline hover:underline-offset-2">
                <Link to="/register">Register</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
