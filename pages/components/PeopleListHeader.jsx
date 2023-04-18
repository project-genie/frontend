import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useRouter } from "next/router";
import Button from "./Button";
import Spinner from "./Spinner";
import CreateModal from "./CreateModal";
import { toast } from "react-toastify";
import TextInput from "./TextInput";
import { Formik, Field, Form } from "formik";

const PeopleListHeader = ({ user, type }) => {
  const [isInviteUserModalOpen, setIsInviteUserModalOpen] = useState(false);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [nonMembersOfProject, setNonMembersOfProject] = useState([]);

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const openInviteUserModal = () => {
    setIsInviteUserModalOpen(true);
  };

  const closeInviteUserModal = () => {
    setIsInviteUserModalOpen(false);
  };

  const openAddUserModal = () => {
    setIsAddUserModalOpen(true);
  };

  const closeAddUserModal = () => {
    setIsAddUserModalOpen(false);
  };

  const getPotentialMembers = async () => {
    await axios
      .get(
        `http://localhost:8080/api/projects/${router.query?.project}/nonmembers`,
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        setNonMembersOfProject(response.data.data);
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  useEffect(() => {
    if (router.isReady) {
      if (type === "project") {
        getPotentialMembers();
      }
    }
  }, [router.isReady]);

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: async (values) => {
      try {
        setLoading(true);
        await axios.post(
          `http://localhost:8080/api/organizations/invite/${router.query?.organization}`,
          values,
          {
            withCredentials: true,
          }
        );
        setLoading(false);
        closeInviteUserModal();
        toast.success("Invitation sent successfully.");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } catch (error) {
        setLoading(false);
        toast.error(error.response?.data.message);
      }
    },
  });
  return (
    <div className="flex justify-between items-center border-b border-b-secondary-400">
      <h1>People</h1>
      {user?.role === "owner" && type === "organization" ? (
        <Button
          text="Invite People"
          handle={() => {
            openInviteUserModal();
          }}
        />
      ) : (
        user?.role === "owner" &&
        type === "project" && (
          <Button
            text="Add People"
            handle={() => {
              openAddUserModal();
            }}
          />
        )
      )}
      {/* invite user modal */}
      <CreateModal
        isOpen={isInviteUserModalOpen}
        closeModal={closeInviteUserModal}
        contentLabel="Invite People"
      >
        <div className="w-full ">
          <div className="mb-6">
            <h2 className="font-medium text-lg">Invite People</h2>
          </div>
          <form onSubmit={formik.handleSubmit}>
            <TextInput
              id="email"
              type="email"
              label="Email"
              placeholder="Enter an email address"
              onChange={formik.handleChange}
              value={formik.values.email}
              required={true}
            />

            <button
              type="submit"
              className="text-neutral-50 bg-primary-500 hover:bg-primary-600 focus:ring-4 focus:outline-none focus:ring-primary-500 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
              {loading ? <Spinner /> : <p>Invite</p>}
            </button>
          </form>
        </div>
      </CreateModal>
      {/* add user modal */}
      <CreateModal
        isOpen={isAddUserModalOpen}
        closeModal={closeAddUserModal}
        contentLabel="Add People"
      >
        <div className="w-full">
          <div className="mb-20 flex justify-center">
            <h2 className="font-medium text-lg">Add People</h2>
          </div>
          <div className="flex justify-center items-center">
            <Formik
              initialValues={{
                checked: [],
              }}
              onSubmit={async (values) => {
                values.checked.forEach(async (value) => {
                  await axios
                    .post(
                      `http://localhost:8080/api/projects/${router.query?.project}/members`,
                      {
                        userId: parseInt(value),
                        role: "member",
                      },
                      {
                        withCredentials: true,
                      }
                    )
                    .then((response) => {
                      console.log(response);
                    })
                    .catch((error) => {
                      toast.error(error);
                    });
                });
                toast.success("Members added successfully.");
                setTimeout(() => {
                  window.location.reload();
                }, 2000);
              }}
            >
              {() => (
                <Form>
                  <div
                    className="flex justify-center items-center mb-6"
                    role="group"
                    aria-labelledby="checkbox-group"
                  >
                    {nonMembersOfProject.map((person) => (
                      <label
                        className="scale-125 flex justify-center items-center"
                        key={person.user.id}
                      >
                        <Field
                          type="checkbox"
                          name="checked"
                          value={person.user.id.toString()}
                          className="mr-2"
                        />

                        {person.user.name}
                      </label>
                    ))}
                  </div>

                  <Button text={loading ? <Spinner /> : "Add"} />
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </CreateModal>
    </div>
  );
};

export default PeopleListHeader;
