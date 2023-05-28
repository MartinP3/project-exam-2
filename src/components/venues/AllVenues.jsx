import React, { useEffect, useState } from "react";
import { VENUES_URL } from "../../utils/ApiUrls";
import { Link } from "react-router-dom";
import "./index.css";

async function fetchData() {
  const response = await fetch(VENUES_URL);
  const json = await response.json();
  return json;
}

export function VenuesList() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchData().then((result) => {
      setData(result);
    });
  }, []);

  const filteredVenues = data.filter((venue) =>
    venue.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <div className="flex justify-center">
        <label
          className=" sr-only"
          htmlFor="search"
        >
          Search Venues
        </label>
        <input
          type="text"
          id="search"
          className="my-4 py-2 px-1 w-1/2"
          placeholder="Search venues"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <div className="w-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVenues.map((venue, index) => (
          <div
            key={venue.id}
            className="venueContainer"
          >
            <Link to={`/venue/${venue.id}`}>
              <img
                src={venue.media}
                className="venueImage"
                alt="Venue image"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://dummyimage.com/300x300/000/fff&text=403PICTURE";
                }}
              />
              <div className="venueInfo">
                <h1 className="mb-1">{venue.name}</h1>
                <div className="flex gap-1">
                  <p>{venue.price}kr a night |</p>
                  <p>max {venue.maxGuests} guests</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
