import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../../components/UserContext";

export function Header() {
  const { user, setUser } = useContext(UserContext);
  const { name, venueManager } = user;
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const handleLogout = () => {
    setUser({ loggedIn: false, venueManager: false, token: "", name: "" });
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userName");
    localStorage.removeItem("venueManager");
    location.href = "/";
  };

  useEffect(() => {
    const storedVenueManager = localStorage.getItem("venueManager");
    if (storedVenueManager) {
      setUser((prevUser) => ({
        ...prevUser,
        venueManager: JSON.parse(storedVenueManager),
      }));
    }
  }, []);

  return (
    <header>
      <nav className="flex justify-center gap-16 md:gap-96 my-5 px-6">
        <ul>
          <li>
            <Link to="/">HOLIDAZE</Link>
          </li>
        </ul>
        <ul className="flex gap-5">
          {user.loggedIn ? (
            <>
              <div
                className="relative"
                onMouseEnter={() => setIsDropdownVisible(true)}
                onMouseLeave={() => setIsDropdownVisible(false)}
                onFocus={() => setIsDropdownVisible(true)}
                onBlur={() => setIsDropdownVisible(false)}
              >
                <button
                  className="inline-flex items-center cursor-default"
                  type="button"
                >
                  {name}
                  <svg
                    className="w-4 h-4 ml-2"
                    aria-hidden="true"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </button>
                {isDropdownVisible && (
                  <div
                    id="dropdownHover"
                    className="absolute z-10 w-32 rounded-lg shadow bg-neutral-900"
                  >
                    <ul className="py-2 text-sm text-gray-200 divide-y divide-gray-700">
                      <li>
                        <a
                          href={`/profile/${name}`}
                          className="block px-4 py-2 hover:bg-gray-600 hover:text-white"
                        >
                          Profile
                        </a>
                      </li>
                      <li>
                        <a
                          href={`/profile/edit/${name}`}
                          className="block px-4 py-2 hover:bg-gray-600 hover:text-white"
                        >
                          Edit profile
                        </a>
                      </li>
                      <li>
                        <a
                          href={"/venue/add"}
                          className="block px-4 py-2 hover:bg-gray-600 hover:text-white"
                        >
                          Add venue
                        </a>
                      </li>
                      {!venueManager ? (
                        <li>
                          <a
                            href={`/profile/edit/${name}`}
                            className="block px-4 py-2 hover:bg-gray-600 hover:text-white"
                          >
                            Become a manager
                          </a>
                        </li>
                      ) : (
                        <li>
                          <a
                            href={"/manage/venues"}
                            className="block px-4 py-2 hover:bg-gray-600 hover:text-white"
                          >
                            Manage venues
                          </a>
                        </li>
                      )}
                      <li>
                        <a
                          href="#"
                          className="block px-4 py-2 hover:bg-gray-600 hover:text-white cursor-pointer"
                          onClick={handleLogout}
                        >
                          Logout
                        </a>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
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
