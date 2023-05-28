import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { VENUES_URL } from "../../utils/ApiUrls";
import { UserContext } from "../UserContext";
/**
 * Returns a single venue and its details.
 */
export function SingleVenue() {
  const [data, setData] = useState([]);
  const [deleted, setDeleted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [deleteStatus, setDeleteStatus] = useState("");
  const { user } = useContext(UserContext);
  const { name } = user;

  const id = window.location.pathname.substring(
    window.location.pathname.lastIndexOf("/") + 1
  );

  const endpoints = "?_owner=true&_bookings=true";

  async function fetchData() {
    const response = await fetch(`${VENUES_URL}/${id}${endpoints}`);
    const json = await response.json();
    return json;
  }

  useEffect(() => {
    fetchData().then((result) => {
      setData(result);
    });
  }, []);

  const handleDelete = async () => {
    const token = localStorage.getItem("accessToken");
    const response = await fetch(`${VENUES_URL}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.json());
    if (response.ok) {
      setDeleted(true);
      setDeleteStatus("Venue is now deleted");
      setShowModal(true);
    } else {
      setDeleteStatus("Failed to delete venue");
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    if (deleted) {
      location.href = "/";
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className=" p-1 pb-4 flex flex-col gap-3 max-w-lg">
      <div className="flex justify-center">
        <img
          src={data.media}
          alt="Image of venue"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "https://dummyimage.com/300x300/000/fff&text=403PICTURE";
          }}
        />
      </div>
      <div className="flex justify-center mb-2">
        <h1 className="text-3xl">{data.name}</h1>
      </div>
      <div className="flex gap-4 justify-center mb-1">
        <p>{formatDate(data.updated)}</p>
        <p>up to {data.maxGuests} guests</p>
        <p>${data.price},- /day</p>
      </div>
      <div>
        <p className="md:max-w-md">{data.description}</p>
        <h2 className="text-2xl mt-1">Location</h2>
        {data.location && (
          <p>
            {data.location.address} street, in the city of {data.location.city}{" "}
            in {data.location.country} land
          </p>
        )}
      </div>
      {data.owner && (
        <div>
          <h2 className=" text-2xl mt-4 mb-1">Meet your host</h2>
          <div className="flex gap-2">
            <img
              src={
                data.owner.avatar.length > 0
                  ? data.owner.avatar
                  : "https://dummyimage.com/300x300/000/fff&text=no+pic"
              }
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://dummyimage.com/300x300/000/fff&text=403PICTURE";
              }}
              alt="Host avatar"
              className="rounded-full w-20 h-20"
            />
            <div className="mr-2">
              <p>{data.owner.name}</p>
              <p>{data.owner.email}</p>
            </div>
          </div>
          <p className="mt-2">
            {data.owner.name} is your host for this venue, they're very much
            looking forward to getting paid ${data.price} a day! have a nice
            stay!
          </p>
        </div>
      )}
      <div className="mt-6 flex text-center justify-center gap-4">
        {data.owner && name === data.owner.name ? (
          <>
            <Link
              to={`/venue/edit/${id}`}
              className="mb-4 p-3 w-2/3 uppercase cursor-pointer shadow-md text-blue-400 shadow-blue-400 hover:text-blue-200 hover:shadow-blue-200"
            >
              Edit Venue
            </Link>
            <button
              onClick={handleDelete}
              className="mb-4 p-3 w-2/3 uppercase cursor-pointer shadow-md text-red-400 shadow-red-400 hover:text-red-500 hover:shadow-red-500"
            >
              Delete Venue
            </button>
          </>
        ) : (
          <Link
            to={`/booking/${id}`}
            className="mb-4 p-3 w-2/3 uppercase cursor-pointer shadow-md text-green-400 shadow-green-400 hover:text-green-500 hover:shadow-green-500"
          >
            Book Venue
          </Link>
        )}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-neutral-700 bg-opacity-50">
            <div className="bg-neutral-800 w-80 p-6 rounded shadow-lg">
              <p className="text-lg font-semibold">{deleteStatus}</p>
              <button
                onClick={handleCloseModal}
                className="mt-4 px-4 py-2 bg-neutral-800 shadow-md shadow-blue-400 hover:shadow-blue-200 rounded"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
