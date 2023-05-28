import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../UserContext";
import { PROFILES_URL, VENUES_URL } from "../../utils/ApiUrls";
import { Link } from "react-router-dom";

export function ManageVenues() {
  const [data, setData] = useState([]);
  const [venueInfo, setVenueInfo] = useState([]);
  const { user } = useContext(UserContext);
  const { name, token } = user;
  const endpoints = "?_bookings=true&_venues=true";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${PROFILES_URL}/${name}${endpoints}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setData(data);
        } else {
          console.log("Failed to fetch the data");
        }
      } catch (error) {
        console.log("There was an error fetching the data", error);
      }
    };

    fetchData();
  }, [name]);

  const venues = data.venues;
  const venueIds = venues ? venues.map((venue) => venue.id) : [];

  useEffect(() => {
    const fetchVenueDetails = async () => {
      try {
        const venuePromises = venueIds.map(async (venueId) => {
          const response = await fetch(
            `${VENUES_URL}/${venueId}?_bookings=true`,
            {
              method: "GET",
            }
          );
          if (response.ok) {
            const venueData = await response.json();
            return venueData;
          } else {
            console.log(`Failed to fetch venue details for ID: ${venueId}`);
            return null;
          }
        });

        const venueDetails = await Promise.all(venuePromises);
        setVenueInfo(venueDetails.filter((venue) => venue !== null));
      } catch (error) {
        console.log("There was an error fetching venue details", error);
      }
    };

    if (venueInfo.length === 0) {
      fetchVenueDetails();
    }
  }, [venueInfo]);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="flex flex-col w-full">
      <h1 className="text-4xl mb-8">My venues' bookings</h1>
      {venueInfo.length > 0 ? (
        venueInfo.map(
          (venue) =>
            venue.bookings.length > 0 && (
              <div
                key={venue.id}
                className="bg-neutral-900 mb-4 p-4 rounded-lg max-w-lg"
              >
                <div className="flex justify-start">
                  <div className="w-1/2 flex">
                    <img src={venue.media} />
                  </div>
                  <div className="ml-2">
                    <div className="mb-6">
                      <p className="text-xs">Venue:</p>
                      <h2>{venue.name}</h2>
                      <p className="text-xs">Created:</p>
                      <p>{formatDate(venue.created)}</p>
                      <p className="text-xs">Last updated:</p>
                      <p>{formatDate(venue.updated)}</p>
                    </div>
                    <Link
                      to={`/venue/${venue.id}`}
                      className="px-2 py-4 max-h-14 rounded-md uppercase text-blue-400 shadow-md shadow-blue-400 hover:text-blue-200 hover:shadow-blue-200"
                    >
                      View venue
                    </Link>
                  </div>
                </div>
                <div className="my-2 pl-2 flex flex-col">
                  <h2>Bookings</h2>
                  <div className="divide-y divide-gray-700 flex flex-col gap-4">
                    {venue.bookings.map((booking) => (
                      <div
                        key={booking.id}
                        className="flex justify-start"
                      >
                        <div className="w-3/5">
                          <div>
                            <p className="my-1">
                              {formatDate(booking.dateFrom)} &rarr;{" "}
                              {formatDate(booking.dateTo)}
                            </p>
                            <p>{booking.guests} guest(s)</p>
                          </div>
                        </div>
                        <Link
                          to={`/manage/bookings/${booking.id}`}
                          className="p-2 my-auto rounded-md h-full uppercase text-green-400 shadow-md shadow-green-400 hover:text-green-500 hover:shadow-green-500"
                        >
                          View booking
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )
        )
      ) : (
        <p>Loading venue information...</p>
      )}
    </div>
  );
}
