import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { VENUES_URL } from '../../utils/ApiUrls';

export function SingleVenue() {
  const [data, setData] = useState([]);

  const url = new URL(window.location.href);
  const pathName = url.pathname;
  const id = pathName.substring(pathName.lastIndexOf('/') + 1);

  useEffect(() => {
    const fetchData = async () => {

      const response = await fetch(`${VENUES_URL}/${id}`);
      const json = await response.json();
      setData(json);
    }
    fetchData();
  }, [window.location.href]);

  const dateObj = new Date(data.created);
  const year = dateObj.getFullYear();
  const month = ("0" + (dateObj.getMonth() + 1)).slice(-2);
  const day = ("0" + dateObj.getDate()).slice(-2);
  const formattedDate = `${day}/${month}/${year}`;

  return (
    <div className="bg-neutral-700 pb-4 w-96">
      <img src={data.media} />
      <div className=" flex justify-center mb-2">
        <h1 className="text-2xl">{data.name}</h1>
      </div>
      <div className='flex gap-4 justify-center mb-1'>
        <p>{formattedDate}</p>
        <p>{data.maxGuests} guests</p>
        <p>{data.price}kr/day</p>
      </div>
      <div>
        <p>{data.description}</p>
      </div>
      <div className='mt-6 flex text-center justify-center'>
      <Link to={`/venue/booking/${id}`} className='p-3 w-6/12 uppercase cursor-pointer bg-gradient-to-r from-cyan-500 to-teal-500'>
        book venue
       </Link>
      </div>
    </div>
  );
}