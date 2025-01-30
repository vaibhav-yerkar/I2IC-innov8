import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const CreateEvents = () => {
  const [tableData1, setTableData1] = useState([
    { description: "", price: "", reference: "" },
  ]);

  const [tableData2, setTableData2] = useState([
    { description: "", price: "", reference: "" },
  ]);

  const addRow1 = () => {
    setTableData1([
      ...tableData1,
      { description: "", price: "", reference: "" },
    ]);
  };

  const addRow2 = () => {
    setTableData2([
      ...tableData2,
      { description: "", price: "", reference: "" },
    ]);
  };

  const handleSubmit = async () => {
    const eventData = {
      title:
        document.querySelector<HTMLInputElement>("#floating_first_title")
          ?.value || "",
      startDate:
        document.querySelector<HTMLInputElement>("#floating_date")?.value || "",
      startTime:
        document.querySelector<HTMLInputElement>("#floating_time")?.value || "",
      proposedBy:
        document.querySelector<HTMLInputElement>("#floating_proposed_by")
          ?.value || "",
      eventType:
        document.querySelector<HTMLInputElement>("#floating_event_type")
          ?.value || "",
      location:
        document.querySelector<HTMLInputElement>("#floating_place")?.value ||
        "",
      description:
        document.querySelector<HTMLTextAreaElement>("#description")?.value ||
        "",
      eventGoal:
        document.querySelector<HTMLTextAreaElement>("#gaol + textarea")
          ?.value || "",
      expectedParticipants: parseInt(
        document.querySelector<HTMLInputElement>(
          '[name="floating_exp_participant_count"]'
        )?.value || "0"
      ),
    };
    const requiredFields = [
      "title",
      // "startDate",
      // "startTime",
      // "eventType",s
      // "location",
    ];
    const missingFields = requiredFields.filter(
      (field) => !eventData[field as keyof typeof eventData]
    );

    if (missingFields.length > 0) {
      alert(`Please fill in required fields: ${missingFields.join(", ")}`);
      return;
    }

    // Budget Information
    const budgetData = {
      expectedIncome: tableData1.filter((row) => row.description && row.price),
      expectedExpenses: tableData2.filter(
        (row) => row.description && row.price
      ),
    };

    const formData = {
      ...eventData,
      ...budgetData,
    };

    console.log(formData);
    try {
      const response = await axios.post("/events", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 201) {
        alert("Event created successfully");
      } else {
        alert("Failed to create event");
      }
    } catch (error) {
      console.error("Failed to create event", error);
    }
  };

  return (
    <>
      <hr></hr>
      <br></br>
      <div className="flex justify-around ">
        <div className="grid md:grid-cols-2 md:gap-6"></div>
        <ul className="flex justify-end">
          <li className="mr-3">
            <a
              className="inline-block border border-blue-500 rounded py-1 px-3 bg-blue-500 text-gray-300 align-right"
              href="#"
              onClick={handleSubmit}
            >
              Create
            </a>
          </li>
          <li className="mr-3">
            <Link to="/events">
              <a
                className="inline-block border rounded py-1 px-3 bg-gray-300 text-black align-right"
                href="#"
              >
                Back
              </a>
            </Link>
          </li>
        </ul>
      </div>
      <br />
      <form>
        <div className="px-2">
          <div className="flex justify-evenly">
            <div className="flex w-2/3 ">
              <h1>Basic Information</h1>
            </div>
          </div>
          <br></br>
          <div className="flex justify-around">
            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="relative z-0 w-2/3 px-1 mb-8 group">
                <input
                  type="text"
                  name="floating_first_title"
                  id="floating_first_title"
                  className="block py-2.5 px-0 w-96 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-300 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="floating_first_title"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Event Title :
                </label>
              </div>

              <div className="relative z-0 w-2/3 px-1 mb-2 group">
                <input
                  type="Date"
                  name="floating_date"
                  id="floating_date"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-300 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="floating_date"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Date
                </label>
              </div>
            </div>
          </div>
          <div className="flex justify-evenly">
            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="relative z-0 w-2/3 px-1 mb-8 group">
                <input
                  type="text"
                  name="floating_proposed_by"
                  id="floating_proposed_by"
                  className="block py-2.5 px-0 w-96 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-300 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="floating_proposed_by"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Proposed by :
                </label>
              </div>

              <div className="relative z-0 w-2/3 px-1 mb-2 group">
                <input
                  type="Time"
                  name="floating_time"
                  id="floating_time"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-300 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="floating_time"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Time
                </label>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="relative z-0 w-2/3 mb-6 group ">
              <input
                type="text"
                name="floating_event_type"
                id="floating_event_type"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-300 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="floating_event_type"
                className=" peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Event Type :
              </label>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="relative z-0 w-2/3 mb-6 group ">
              <input
                type="text"
                name="floating_place"
                id="floating_place"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-300 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="floating_place"
                className=" peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Place :
              </label>
            </div>
          </div>
          <div className="flex justify-evenly">
            <div className="w-2/3 justify-items-start">
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Event Description :
              </label>
              <textarea
                id="description"
                rows={4}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-300 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Leave a comment..."
              ></textarea>
            </div>
          </div>
          <br></br>
          <div className="flex justify-evenly">
            <div className="w-2/3 justify-items-star">
              <label
                htmlFor="goal"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Event Goal :
              </label>
              <textarea
                id="goal"
                rows={4}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-300 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Leave a comment..."
              ></textarea>
            </div>
          </div>{" "}
          <br></br>
          <div className="flex justify-evenly">
            <div className="flex w-2/3">
              <h1>Additional Information</h1>
            </div>
          </div>
          <br></br>
          <div className="flex justify-evenly">
            <div className="relative z-0 w-2/3 mb-6 group">
              <input
                type="text"
                name="floating_exp_participant_count"
                id="floating_exp_participant_count"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-300 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="floating_exp_participant_count"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Expected Participants Count :
              </label>
            </div>
          </div>
          <div className="flex justify-evenly">
            <div className="flex w-2/3">
              <h1 className="font-bold">
                <b> Budget Report </b>
              </h1>
            </div>
          </div>
          <br></br>
          <div className="flex justify-evenly">
            <div className="flex w-2/3">
              <h1>Expected Income Details</h1>
            </div>
          </div>
          <br></br>
          <div className="flex justify-evenly">
            <div className="relative z-0 w-2/3 mb-6 group">
              <table className="w-full text-sm text-left text-blue-100 dark:text-blue-100">
                <thead className="text-xs text-black uppercase bg-blue-200 border-b border-blue-100 dark:text-black">
                  <tr>
                    <th scope="col" className="px-6 py-3 bg-blue-200">
                      Description
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3 bg-blue-200">
                      Reference
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {tableData1.map((row, index) => (
                    <tr key={index}>
                      <td className="text-black">
                        <input
                          type="text"
                          value={row.description}
                          onChange={(e) => {
                            const updatedData = [...tableData1];
                            updatedData[index].description = e.target.value;
                            setTableData1(updatedData);
                          }}
                        />
                      </td>
                      <td className="text-black">
                        <input
                          type="text"
                          value={row.price}
                          onChange={(e) => {
                            const updatedData = [...tableData1];
                            updatedData[index].price = e.target.value;
                            setTableData1(updatedData);
                          }}
                        />
                      </td>
                      <td className="text-black">
                        <input
                          type="text"
                          value={row.reference}
                          onChange={(e) => {
                            const updatedData = [...tableData1];
                            updatedData[index].reference = e.target.value;
                            setTableData1(updatedData);
                          }}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={3}>
                      <button
                        className="text-gray-300 bg-blue-500 hover:bg-blue-700 text-sm py-2 px-4 rounded-md mt-4"
                        onClick={addRow1}
                      >
                        Add row
                      </button>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
          <div className="flex justify-evenly">
            <div className="flex w-2/3">
              <h1>Expected Expenses Details</h1>
            </div>
          </div>
          <br></br>
          <div className="flex justify-evenly">
            <div className="relative z-0 w-2/3 mb-6 group">
              <input
                type="text"
                name="floating_exp_expence"
                id="floating_exp_expence"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-300 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="floating_exp_expence"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Expected Total Expenses
              </label>
            </div>
          </div>
          <div className="flex justify-evenly">
            <div className="relative z-0 w-2/3 mb-6 group">
              <table className="w-full text-sm text-left text-blue-100 dark:text-blue-100">
                <thead className="text-xs text-black uppercase bg-blue-200 border-b border-blue-100 dark:text-black">
                  <tr>
                    <th scope="col" className="px-6 py-3 bg-blue-200">
                      Description
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3 bg-blue-200">
                      Reference
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {tableData2.map((row, index) => (
                    <tr key={index}>
                      <td className="text-black">
                        {" "}
                        {/* Add text-black className here */}
                        <input
                          type="text"
                          value={row.description}
                          onChange={(e) => {
                            const updatedData = [...tableData2];
                            updatedData[index].description = e.target.value;
                            setTableData2(updatedData);
                          }}
                        />
                      </td>
                      <td className="text-black">
                        {" "}
                        {/* Add text-black className here */}
                        <input
                          type="text"
                          value={row.price}
                          onChange={(e) => {
                            const updatedData = [...tableData2];
                            updatedData[index].price = e.target.value;
                            setTableData2(updatedData);
                          }}
                        />
                      </td>
                      <td className="text-black">
                        {" "}
                        {/* Add text-black className here */}
                        <input
                          type="text"
                          value={row.reference}
                          onChange={(e) => {
                            const updatedData = [...tableData2];
                            updatedData[index].reference = e.target.value;
                            setTableData2(updatedData);
                          }}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={3}>
                      <button
                        className="text-gray-300 bg-blue-500 hover:bg-blue-700 text-sm py-2 px-4 rounded-md mt-4"
                        onClick={addRow2}
                      >
                        Add row
                      </button>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
          <div className="flex justify-evenly">
            <div className="flex w-2/3">
              <h1>Promotion Details</h1>
            </div>
          </div>
          <br></br>
          <div className="flex justify-evenly">
            <div className="relative z-0 w-2/3 mb-6 group">
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      PNG, JPG, PDF{" "}
                    </p>
                  </div>
                  <input id="dropzone-file" type="file" className="hidden" />
                </label>
              </div>
            </div>
          </div>
          <div className="flex justify-evenly">
            <div className="w-2/3 justify-items-start">
              <label
                htmlFor="caption"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              ></label>
              <textarea
                id="caption"
                rows={4}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-300 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Caption"
              ></textarea>
            </div>
          </div>
        </div>
      </form>
      <br></br>
    </>
  );
};

export default CreateEvents;
