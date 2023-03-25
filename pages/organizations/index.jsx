import React, { useEffect, useState } from "react";
import axios from "axios";
import MainLayout from "../components/layout/MainLayout";
import { useRouter } from "next/router";
import Button from "../components/Button";
import CreateModal from "../components/CreateModal";
import { useFormik } from "formik";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import { useTable } from "react-table";

const Organizations = () => {
  const [organizations, setOrganizations] = useState([]);
  const [isCreateOrganizationModalOpen, setIsCreateOrganizationModalOpen] =
    useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const openCreateOrganizationModal = () => {
    setIsCreateOrganizationModalOpen(true);
  };

  const closeCreateOrganizationModal = () => {
    setIsCreateOrganizationModalOpen(false);
  };

  const handleFetch = async () => {
    console.log("Fetch Orgs");
    await axios
      .get("http://localhost:8080/api/organizations", {
        withCredentials: true,
      })
      .then((response) => {
        setOrganizations(response.data.data);
        console.log("Organizations: ", response);
      })
      .catch((error) => {
        console.log("Error occured!: ", error);
      });
  };

  useEffect(() => {
    handleFetch();
  }, []);

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
    },
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const response = await axios.post(
          "http://localhost:8080/api/organizations",
          values,
          {
            withCredentials: true,
          }
        );
        setLoading(false);
        closeCreateOrganizationModal();
        toast.success("Organization is created successfully.", {
          position: "bottom-right",
        });
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } catch (error) {
        setLoading(false);
        toast.error(error.response.data.message, {
          position: "bottom-right",
        });
        console.log("Error occured!: ", error);
      }
    },
  });

  const data = React.useMemo(() => organizations, [organizations]);

  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "organization.name", // accessor is the "key" in the data
      },
      {
        Header: "Role",
        accessor: "role",
      },
    ],
    []
  );

  const tableInstance = useTable({ columns, data });
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;
  return (
    <MainLayout>
      <div className="flex flex-col justify-center items-center">
        <div className="flex justify-center items-center mt-10">
          <p className="text-base">Select an organization.</p>
        </div>
        <div className="w-[80%] bg-secondary-100 rounded-lg mt-10">
          <div className="flex md:flex-row flex-col justify-between items-center p-2 border-b border-secondary-700">
            <h1 className="text-lg font-medium underline">Organizations</h1>
            <Button
              text="Create Organization"
              handle={openCreateOrganizationModal}
            />
          </div>
          <div className="flex justify-center w-full">
            <table {...getTableProps()} className="w-full">
              <thead>
                {
                  // Loop over the header rows
                  headerGroups.map((headerGroup) => (
                    // Apply the header row props
                    <tr
                      key=""
                      {...headerGroup.getHeaderGroupProps()}
                      className=""
                    >
                      {
                        // Loop over the headers in each row
                        headerGroup.headers.map((column) => (
                          // Apply the header cell props
                          <th
                            className="text-sm text-left p-2 border-b border-secondary-400"
                            key=""
                            {...column.getHeaderProps()}
                          >
                            {
                              // Render the header
                              column.render("Header")
                            }
                          </th>
                        ))
                      }
                    </tr>
                  ))
                }
              </thead>
              {/* Apply the table body props */}
              <tbody {...getTableBodyProps()}>
                {
                  // Loop over the table rows
                  rows.map((row) => {
                    // Prepare the row for display
                    prepareRow(row);
                    return (
                      // Apply the row props
                      <tr
                        className="hover:bg-secondary-200 cursor-pointer"
                        key=""
                        {...row.getRowProps()}
                      >
                        {
                          // Loop over the rows cells
                          row.cells.map((cell) => {
                            // Apply the cell props
                            return (
                              <td
                                className="text-sm border-b border-secondary-400 p-2"
                                key=""
                                {...cell.getCellProps()}
                              >
                                {
                                  // Render the cell contents
                                  cell.render("Cell")
                                }
                              </td>
                            );
                          })
                        }
                      </tr>
                    );
                  })
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <CreateModal
        isOpen={isCreateOrganizationModalOpen}
        closeModal={() => setIsCreateOrganizationModalOpen(false)}
        contentLabel="Create Organization"
      >
        <div className="w-full">
          <div className="mb-6">
            <h2 className="font-medium text-lg">Create organization.</h2>
          </div>

          <form onSubmit={formik.handleSubmit}>
            <div className="mb-3">
              <label
                htmlFor="name"
                className="block mb-1 text-sm font-medium text-neutral-800"
              >
                Name*
              </label>
              <input
                type="text"
                id="name"
                className="bg-transparent border border-neutral-800 text-neutral-800 text-sm rounded-lg  focus:ring-primary-500 focus:border-primary-500 outline-primary-500 block w-full p-2.5 "
                placeholder="Squad"
                onChange={formik.handleChange}
                value={formik.values.email}
                required
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="description"
                className="block mb-1 text-sm font-medium text-neutral-800"
              >
                Description
              </label>
              <input
                type="text"
                id="description"
                className="bg-transparent border border-neutral-800 text-neutral-800 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 outline-primary-500 block w-full p-2.5 "
                onChange={formik.handleChange}
                value={formik.values.password}
              />
            </div>

            <button
              type="submit"
              className="text-neutral-50 bg-primary-500 hover:bg-primary-600 focus:ring-4 focus:outline-none focus:ring-primary-500 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
              {loading ? <Spinner /> : <p>Create</p>}
            </button>
          </form>
        </div>
      </CreateModal>
    </MainLayout>
  );
};

export default Organizations;
