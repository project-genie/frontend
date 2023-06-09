import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import Image from "next/image";
import TaskExtendedChunk from "./TaskExtendedChunk";
import Button from "./Button";
import ButtonError from "./ButtonError";

const PeopleCard = ({ user, person, type }) => {
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const router = useRouter();
  const handleRemovePersonFromOrganization = async () => {
    try {
      await axios.delete(
        `${NEXT_PUBLIC_BACKEND_URL}/api/organizations/${router.query?.organization}/members/${person.user.id}`,
        {
          withCredentials: true,
        }
      );
      toast.success("Person removed successfully.");
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } catch (error) {
      toast.error(error.response?.data.message);
    }
  };

  const handleRemovePersonFromProject = async () => {
    try {
      console.log(router.query);
      await axios.post(
        `${NEXT_PUBLIC_BACKEND_URL}/api/projects/${router.query?.project}/members/remove`,
        {
          userId: person.user.id,
        },
        {
          withCredentials: true,
        }
      );
      toast.success("Person removed successfully.");
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } catch (error) {
      toast.error(error.response?.data.message);
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

      if (type === "project") {
        await axios.put(
          `http://localhost:8080/api/projects/${router.query?.project}/members`,
          body,
          {
            withCredentials: true,
          }
        );
      } else if (type === "organization") {
        await axios.put(
          `http://localhost:8080/api/organizations/${router.query?.organization}/members`,
          body,
          {
            withCredentials: true,
          }
        );
      }

      toast.success("Person updated successfully.");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      setIsOptionsOpen(false);
      toast.error(error.response?.data.message);
    }
  };

  const handleIncreaseUserLevel = async () => {
    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/${person.user.id}`,
        {
          level: person.user.level + 1,
          organizationId: router.query?.organization,
        },
        {
          withCredentials: true,
        }
      );
      toast.success("Level increased successfully.");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data.message);
    }
  };

  const handleDecreaseUserLevel = async () => {
    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/${person.user.id}`,
        {
          level: person.user.level - 1,
          organizationId: router.query?.organization,
        },
        {
          withCredentials: true,
        }
      );
      toast.success("Level decreased successfully.");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      toast.error(error.response?.data.message);
    }
  };

  return (
    <div className="p-4 rounded-md bg-secondary-100 my-2">
      <div className="flex items-center justify-between">
        <div className="flex justify-center items-center">
          <Image
            className="mr-1"
            src="/icons/person.svg"
            alt="person"
            width={24}
            height={24}
          />
          <h2 className="text-sm text-neutral-800 mr-1 font-semibold">
            {person.user.name}
          </h2>
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
                  onClick={
                    type === "organization"
                      ? handleRemovePersonFromOrganization
                      : handleRemovePersonFromProject
                  }
                  className="p-2 text-sm text-neutral-50 bg-error-300 hover:bg-error-400 w-full flex justify-center rounded-bl-lg rounded-br-lg hover:cursor-pointer"
                >
                  Remove
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
      <div>
        <p className="text-xs font-medium text-secondary-700">{person.role}</p>
      </div>
      <div>
        <TaskExtendedChunk
          description="Email"
          text={person.user.email}
          icon="mail"
        />
        <div className="flex justify-start items-center">
          <TaskExtendedChunk
            description="Level"
            text={person.user.level}
            icon="level_chart"
          />
          {user.role === "owner" && (
            <div>
              <Button handle={handleIncreaseUserLevel} text={"Increase"} />
              <ButtonError handle={handleDecreaseUserLevel} text={"Decrease"} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PeopleCard;
