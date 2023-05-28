import React, { useEffect, useState, useContext } from "react";
import { BOOKINGS_URL } from "../utils/ApiUrls";
import { UserContext } from "./UserContext";

export function ManageBooking() {
  const [data, setData] = useState([]);
  const { user } = useContext(UserContext);
  const { token } = user;

  const id = window.location.pathname.substring(
    window.location.pathname.lastIndexOf("/") + 1
  );
  const params = "?_customer=true&_venue=true";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BOOKINGS_URL}/${id}${params}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setData(data);
        } else {
          console.log("Failed to fetch the booking data");
        }
      } catch (error) {
        console.log("There was an error fetching the booking data", error);
      }
    };

    fetchData();
  }, [id]);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div>
      <h1 className="text-3xl mb-4">Manage booking</h1>
      {data.venue && (
        <>
          <img
            src={data.venue.media}
            className="max-w-xs"
          />
          <p className="text-2xl mb-1">{data.venue.name}</p>
        </>
      )}
      <h2 className="text-xl">Customer</h2>
      {data.customer && (
        <div className="pl-2">
          <p>{data.customer.name}</p>
          <p>{data.customer.email}</p>
        </div>
      )}
      <h2 className="text-xl">Duration</h2>
      <div className="pl-2">
        <p>
          {formatDate(data.dateFrom)} &rarr; {formatDate(data.dateTo)}
        </p>
      </div>
      <h2 className="text-xl">Guests</h2>
      <div className="pl-2">
        <p>{data.guests}</p>
      </div>
    </div>
  );
}
