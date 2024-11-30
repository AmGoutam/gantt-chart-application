import { useState } from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { useGlobalContext } from "../context/AppProvider";

const Modal = ({ filter, handleFilter }) => {
  const { createNewTask, tasks } = useGlobalContext();
  const [open, setOpen] = useState(false);

  const [task, setTask] = useState({
    taskName: "",
    status: "",
    startDate: "",
    endDate: "",
    priority: "",
    assignees: "",
    color: "",
    progress: "",
    description: "",
  });

  const handleChnage = (e) => {
    const { name, value } = e.target;
    setTask((preTask) => ({
      ...preTask,
      [name]: value,
    }));
  };

  // ********************* Add Task *********************
  const addTask = async (e) => {
    e.preventDefault();
    const {
      taskName,
      status,
      startDate,
      endDate,
      priority,
      assignees,
      color,
      progress,
      description,
    } = task;
    console.log(Object.values(task), "dddddd");
    if (Object.values(task).some((value) => !value.trim())) {
      alert("Please fill all details.");
      return;
    } else {
      createNewTask(
        taskName,
        status,
        startDate,
        endDate,
        priority,
        assignees,
        color,
        progress,
        description
      );
      setTask({
        taskName: "",
        status: "",
        startDate: "",
        endDate: "",
        priority: "",
        assignees: "",
        color: "",
        progress: "",
        description: "",
      });
      setTimeout(() => {
        setOpen(false);
      }, 2000);
    }
  };

  return (
    <>
      <Dialog open={open} onClose={setOpen} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
            >
              <div className="px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="flex items-center justify-center">
                  <div className="mx-auto w-full max-w-[550px]">
                    <form>
                      <div className="-mx-3 flex flex-wrap">
                        <div className="w-full px-3 sm:w-1/2">
                          <div className="mb-3">
                            <label
                              htmlFor="taskName"
                              className="mb-3 block text-base font-medium text-[#07074D]"
                            >
                              Task Name
                            </label>
                            <input
                              type="text"
                              name="taskName"
                              id="taskName"
                              placeholder="Task Name"
                              value={task.taskName}
                              onChange={handleChnage}
                              className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            />
                          </div>
                        </div>
                        <div className="w-full px-3 sm:w-1/2">
                          <div className="mb-3">
                            <label
                              htmlFor="status"
                              className="mb-3 block text-base font-medium text-[#07074D]"
                            >
                              Status
                            </label>
                            <input
                              type="text"
                              name="status"
                              id="status"
                              placeholder="status"
                              value={task.status}
                              onChange={handleChnage}
                              className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="-mx-3 flex flex-wrap">
                        <div className="w-full px-3 sm:w-1/2">
                          <div className="mb-3">
                            <label
                              htmlFor="startDate"
                              className="mb-3 block text-base font-medium text-[#07074D]"
                            >
                              Start Date
                            </label>
                            <input
                              type="date"
                              name="startDate"
                              id="startDate"
                              value={task.startDate}
                              onChange={handleChnage}
                              className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            />
                          </div>
                        </div>
                        <div className="w-full px-3 sm:w-1/2">
                          <div className="mb-3">
                            <label
                              htmlFor="endDate"
                              className="mb-3 block text-base font-medium text-[#07074D]"
                            >
                              End Date
                            </label>
                            <input
                              type="date"
                              name="endDate"
                              id="endDate"
                              value={task.endDate}
                              onChange={handleChnage}
                              className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="-mx-3 flex flex-wrap">
                        <div className="w-full px-3 sm:w-1/2">
                          <div className="mb-3">
                            <label
                              htmlFor="priority"
                              className="mb-3 block text-base font-medium text-[#07074D]"
                            >
                              Priority
                            </label>
                            <select
                              name="priority"
                              id="priority"
                              value={task.priority}
                              onChange={handleChnage}
                              className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            >
                              <option value="">Choose Any One</option>
                              <option value="low">Low</option>
                              <option value="high">High</option>
                            </select>
                          </div>
                        </div>
                        <div className="w-full px-3 sm:w-1/2">
                          <div className="mb-3">
                            <label
                              htmlFor="assignees"
                              className="mb-3 block text-base font-medium text-[#07074D]"
                            >
                              Assignees
                            </label>
                            <input
                              type="email"
                              name="assignees"
                              id="assignees"
                              value={task.assignees}
                              onChange={handleChnage}
                              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                              placeholder="test@gmail.com"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="-mx-3 flex flex-wrap">
                        <div className="w-full px-3 sm:w-1/2">
                          <div className="mb-3">
                            <label
                              htmlFor="color"
                              className="mb-3 block text-base font-medium text-[#07074D]"
                            >
                              Color
                            </label>
                            <select
                              name="color"
                              id="color"
                              value={task.color}
                              onChange={handleChnage}
                              className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            >
                              <option value="">Choose Any Color</option>
                              <option value="red">Red</option>
                              <option value="yellow">Yellow</option>
                              <option value="green">Green</option>
                            </select>
                          </div>
                        </div>
                        <div className="w-full px-3 sm:w-1/2">
                          <div className="mb-3">
                            <label
                              htmlFor="progress"
                              className="mb-3 block text-base font-medium text-[#07074D]"
                            >
                              Progress %
                            </label>
                            <input
                              type="number"
                              name="progress"
                              id="progress"
                              value={task.progress}
                              onChange={handleChnage}
                              className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                              placeholder="0.00"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="-mx-3 flex flex-wrap mb-3">
                        <label
                          htmlFor="description"
                          className="mb-3 block text-base font-medium text-[#07074D]"
                        >
                          Task Description
                        </label>
                        <textarea
                          name="description"
                          id="description"
                          value={task.description}
                          onChange={handleChnage}
                          className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md resize-none h-32"
                        ></textarea>
                      </div>

                      <div className=" sm:flex sm:flex-row-reverse sm:px-6">
                        <button
                          type="button"
                          data-autofocus
                          onClick={() => setOpen(false)}
                          className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto mx-2"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          onClick={addTask}
                          className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
                        >
                          Create
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
      <div className="my-4 flex justify-between items-center">
        <button
          onClick={() => setOpen(true)}
          className=" middle none center ml-4 rounded-lg bg-blue-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          data-ripple-light="true"
        >
          New Task
        </button>
        <input
          type="text"
          name="taskName"
          id="taskName"
          placeholder="Task Name"
          value={filter}
          onChange={handleFilter}
          className="w-50 mr-4 rounded-md border border-[#e0e0e0] bg-white py-2 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
        />
      </div>
    </>
  );
};

export default Modal;
