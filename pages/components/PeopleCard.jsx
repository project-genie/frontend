import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import Image from "next/image";

const PeopleCard = ({ user, person }) => {
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const router = useRouter();
  const handleRemovePersonFromOrganization = async () => {
    try {
      await axios.delete(
        `http://localhost:8080/api/organizations/${router.query?.organization}/members/${person.user.id}`,
        {
          withCredentials: true,
        }
      );
      toast.success("Person removed successfully.");
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const toggleOptions = () => {
    setIsOptionsOpen(!isOptionsOpen);
  };

  const handleUpdateMember = async () => {
    setIsOptionsOpen(false);
    try {
      let body = {};
      if (person.role === "owner") {
        body = {
          userId: person.user.id,
          role: "member",
        };
      } else if (person.role === "member") {
        body = {
          userId: person.user.id,
          role: "owner",
        };
      }

      await axios.put(
        `http://localhost:8080/api/organizations/${router.query?.organization}/members`,
        body,
        {
          withCredentials: true,
        }
      );
      toast.success("Person updated successfully.");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      setIsOptionsOpen(false);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="flex md:flex-row flex-col justify-between items-center p-4 border border-secondary-300 rounded-lg my-2">
      <div className="flex md:flex-row flex-col justify-between items-center p-4 w-full">
        <div className="flex items-center justify-start">
          <h2 className="text-primary-500 mr-1">{person.user.name}</h2>
          <p className="text-sm font-medium text-secondary-700">
            {person.role}
          </p>
        </div>
        <div className="flex items-center justify-start">
          <p>{person.user.email}</p>
        </div>
      </div>

      <div className="flex items-center justify-start relative">
        {user.role === "owner" && (
          <button onClick={toggleOptions}>
            <Image
              alt="dots"
              src="/icons/dots-black.svg"
              width={24}
              height={24}
            />
          </button>
        )}
        {isOptionsOpen && (
          <div className="bg-secondary-300 rounded-lg w-40 absolute top-8 right-0 z-50">
            <ul className="flex flex-col justify-start items-center h-full w-full">
              <li
                onClick={handleUpdateMember}
                className="p-2 text-sm text-neutral-800 hover:bg-secondary-400 w-full flex justify-center rounded-tl-lg rounded-tr-lg hover:cursor-pointer"
              >
                {person.role === "member" ? "Make owner" : "Make member"}
              </li>
              <li
                onClick={handleRemovePersonFromOrganization}
                className="p-2 text-sm text-neutral-50 bg-error-300 hover:bg-error-400 w-full flex justify-center rounded-bl-lg rounded-br-lg hover:cursor-pointer"
              >
                Remove
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default PeopleCard;
