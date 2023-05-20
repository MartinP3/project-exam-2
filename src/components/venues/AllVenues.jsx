import React, { useEffect, useState } from 'react';
import { VENUES_URL } from '../../utils/ApiUrls';
import { Link } from 'react-router-dom';
import './index.css';

async function fetchData() {
  const response = await fetch(VENUES_URL);
  const json = await response.json();
  return json;
}

export function VenuesList() {
  const [data, setData] = useState([]);
  const [formattedDates, setFormattedDates] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchData().then((result) => {
      setData(result);

      const formattedDatesArray = result.map((venue) => {
        const dateObj = new Date(venue.created);
        const year = dateObj.getFullYear();
        const month = ('0' + (dateObj.getMonth() + 1)).slice(-2);
        const day = ('0' + dateObj.getDate()).slice(-2);
        return `${day}/${month}/${year}`;
      });

      setFormattedDates(formattedDatesArray);
    });
  }, []);

  const filteredVenues = data.filter((venue) => 
    venue.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  }

  return (
    <div>
      <div className='flex justify-center'>
        <input type='text' className='my-4 py-2 px-1 w-1/2' placeholder='Search venues' value={searchTerm} onChange={handleSearch}/>
      </div>
      <div className="w-auto grid md:grid-cols-2 gap-6">
        {filteredVenues.map((venue, index) => (
          <div key={venue.id} className="venueContainer">
            <Link to={`/venue/${venue.id}`}>
              <img src={venue.media} className="venueImage" alt="Venue image" />
              <div className="venueInfo">
                <h1 className="mb-1">{venue.name}</h1>
                <div className="flex gap-1">
                  <p>{venue.price}kr a night |</p>
                  <p>max {venue.maxGuests} guests</p>
                </div>
                <p>{formattedDates[index]}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}