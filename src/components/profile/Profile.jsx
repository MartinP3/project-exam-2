import React, { useEffect, useState, useContext } from "react";
import { PROFILES_URL } from "../../utils/ApiUrls";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";

export function SingleProfile() {
  const [data, setData] = useState({});
  const { user } = useContext(UserContext);
  const { token } = user;
  const [showAllBookings, setShowAllBookings] = useState(false);
  const [showAllVenues, setShowAllVenues] = useState(false);

  const userName = window.location.pathname.substring(
    window.location.pathname.lastIndexOf("/") + 1
  );
  const endpoints = "?_bookings=true&_venues=true";

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${PROFILES_URL}/${userName}${endpoints}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const json = await response.json();
      setData(json);
    };
    fetchData();
  }, [window.location.href, token]);

  const handleShowBookings = () => {
    setShowAllBookings(!showAllBookings);
  };

  const handleShowVenues = () => {
    setShowAllVenues(!showAllVenues);
  };

  return (
    <div className="pb-4 md:w-[50rem] flex justify-center">
      <div className="flex flex-col">
        <div className="py-6">
          <div className="flex justify-center">
            <img
              src={data.avatar}
              className="w-60 rounded-full"
            />
          </div>
          <h1 className="text-4xl text-center my-2">{data.name}</h1>
        </div>
        <h2 className=" text-3xl mb-2 mx-4 text-center">Bookings</h2>
        <div
          className={`w-full gap-6 grid ${
            !showAllBookings || "md:grid-cols-2 sm:grid-cols-1"
          }`}
        >
          {data.bookings &&
            data.bookings.map((data, index) => (
              <div
                key={data.id}
                className={`w-full flex flex-row gap-4 mx-4 ${
                  showAllBookings || index < 0 ? "" : "hidden"
                }`}
              >
                <img
                  src={data.venue.media}
                  className="w-1/3 h-24"
                />
                <div className="flex flex-col w-1/3">
                  <p>{data.venue.name}</p>
                  <p>{data.guests} guests</p>
                  <p>{data.venue.price}kr/day</p>
                </div>
                <div className="w-1/3">
                  <Link to={`/booking/edit/${data.id}`}>
                    <button className="p-2 rounded-md h-full text-blue-400 shadow-md shadow-blue-400 hover:text-blue-200 hover:shadow-blue-200">
                      View booking
                    </button>
                  </Link>
                </div>
              </div>
            ))}
        </div>
        {data.bookings && data.bookings.length > 0 && (
          <div className="flex justify-center">
            <button
              className={`uppercase w-60 p-3 ${
                showAllBookings
                  ? "text-red-400 shadow-md shadow-red-400 hover:text-red-500 hover:shadow-red-500 mt-4"
                  : "text-green-400 shadow-md shadow-green-400 hover:text-green-500 hover:shadow-green-500"
              }`}
              onClick={handleShowBookings}
            >
              {showAllBookings ? "Show Less" : "Show All"}
            </button>
          </div>
        )}
        <h2 className=" text-3xl mb-2 mt-6 mx-4 text-center">Venues</h2>
        <div
          className={`w-full gap-6 grid ${
            !showAllVenues || "md:grid-cols-2 sm:grid-cols-1"
          }`}
        >
          {data.venues &&
            data.venues.map((venue, index) => (
              <div
                key={venue.id}
                className={`w-full flex flex-row gap-4 mx-4 ${
                  showAllVenues || index < 0 ? "" : "hidden"
                }`}
              >
                <img
                  src={venue.media}
                  className="w-1/3 h-24"
                />
                <div className="flex flex-col w-1/3">
                  <p className="font-bold">{venue.name}</p>
                  <p>{venue.maxGuests} guests</p>
                  <p>{venue.price}kr/day</p>
                </div>
                <div className="w-1/3">
                  <Link to={`/venue/${venue.id}`}>
                    <button className="p-2 rounded-md h-full text-blue-400 shadow-md shadow-blue-400 hover:text-blue-200 hover:shadow-blue-200">
                      View venue
                    </button>
                  </Link>
                </div>
              </div>
            ))}
        </div>
        {data.venues && data.venues.length > 0 && (
          <div className="flex justify-center">
            <button
              className={`uppercase p-3 w-60 ${
                showAllVenues
                  ? "text-red-400 shadow-md shadow-red-400 hover:text-red-500 hover:shadow-red-500 mt-4"
                  : "text-green-400 shadow-md shadow-green-400 hover:text-green-500 hover:shadow-green-500"
              }`}
              onClick={handleShowVenues}
            >
              {showAllVenues ? "Show Less" : "Show All"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
