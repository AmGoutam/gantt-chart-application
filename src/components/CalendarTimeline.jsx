import React, { useState } from "react";
import moment from "moment";
import Timeline, { DateHeader, TimelineHeaders, TodayMarker ,SidebarHeader} from "react-calendar-timeline";
import 'react-calendar-timeline';
import EditModal from "./EditModal";

const keys = {
    groupIdKey: "id",
    groupTitleKey: "title",
    groupRightTitleKey: "rightTitle",
    itemIdKey: "id",
    itemTitleKey: "title",
    itemDivTitleKey: "title",
    itemGroupKey: "group",
    itemTimeStartKey: "start",
    itemTimeEndKey: "end",
    groupLabelKey: "title",
};

const CalendarTimeline = ({ tasks, editTask, deleteTask }) => {

    const [open, setOpen] = useState(false);
    const [taskId, setTaskId] = useState("");

    const showAllData = (itemId) => {
        const task = tasks.find((task) => task.id === itemId);
        const taskDetails = `
        <strong>Task Name:</strong> ${task.taskName} <br>
        <strong>Status:</strong> ${task.status} <br>
        <strong>Start Date:</strong> ${moment(task.startDate).format("YYYY-MM-DD HH:mm:ss")} <br>
        <strong>End Date:</strong> ${moment(task.endDate).format("YYYY-MM-DD HH:mm:ss")} <br>
        <strong>Priority:</strong> ${task.priority} <br>
        <strong>Assignees:</strong> ${task.assignees || "N/A"} <br>
        <strong>Color:</strong> ${task.color || "N/A"} <br>
        <strong>Progress:</strong> ${task.progress || "N/A"} <br>
        <strong>Description:</strong> ${task.description || "N/A"} <br>
    `;
        alert(taskDetails);
    };

    const groups = tasks.map((task) => ({
        id: task.id,
        title: task.status || "Default Group",
        rightTitle: task.taskName || "",
        className: task.status,
    }));

    const items = tasks.map((task) => ({
        id: task.id,
        group: task.id, // Assuming task ID maps to a group
        title: task.description,
        start: moment(task.startDate).toDate().getTime(),
        end: moment(task.endDate).toDate().getTime(),
        className: task.status,
        progress: task.progress,

    }));

    const defaultTimeStart = moment().startOf("day").toDate();
    const defaultTimeEnd = moment().startOf("day").add(1, "day").toDate();

    const [timelineItems, setTimelineItems] = useState(items);

    const handleItemMove = (itemId, dragTime, newGroupOrder) => {
        setTimelineItems((prevItems) =>
            prevItems.map((item) =>
                item.id === itemId
                    ? {
                        ...item,
                        start: dragTime,
                        end: dragTime + (item.end - item.start),
                        group: groups[newGroupOrder].id,
                    }
                    : item
            )
        );
    };

    const handleItemResize = (itemId, time, edge) => {
        setTimelineItems((prevItems) =>
            prevItems.map((item) =>
                item.id === itemId
                    ? {
                        ...item,
                        start: edge === "left" ? time : item.start,
                        end: edge === "left" ? item.end : time,
                    }
                    : item
            )
        );
    };

    // CSV Export function
    const exportToCSV = () => {
        const csvRows = [];
        const headers = ["Task ID", "Task Name", "Status", "Start Date", "End Date"];
        csvRows.push(headers.join(",")); // Add headers to CSV

        // Add rows for each task
        tasks.forEach((task) => {
            const row = [
                task.id,
                task.taskName,
                task.status,
                moment(task.startDate).format("YYYY-MM-DD HH:mm:ss"),
                moment(task.endDate).format("YYYY-MM-DD HH:mm:ss"),
            ];
            csvRows.push(row.join(","));
        });

        // Create CSV content and trigger download
        const csvData = csvRows.join("\n");
        const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "tasks.csv";
        link.click();
    };

    return (
        <>
            <div style={{ display: "flex", height: "100vh" }}>
                {/* Sidebar */}
                <div style={{ width: "20%", backgroundColor: "#f0f0f0", padding: "1rem", overflowY: "auto" }}>
                    <h3 style={{ fontWeight: "bold", marginBottom: "4rem" }}>Task List</h3>
                    <ul style={{ listStyleType: "none", padding: 0 }}>
                        {
                            tasks.length === 0 ? <li>No Data Found...</li> : tasks.map((task) => (
                                <li
                                    key={task.id}
                                    style={{
                                        padding: "0.5rem",
                                        marginBottom: "0.5rem",
                                        backgroundColor: "#ffffff",
                                        borderRadius: "4px",
                                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                                        cursor: "pointer",
                                    }}
                                >
                                    {task.taskName}
                                    <button
                                        onClick={() => { setOpen(true); setTaskId(task.id); }}
                                        className="middle none center ml-1 rounded-lg bg-green-500 p-2 font-sans text-sm font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg green:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-3">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                        </svg>
                                    </button>
                                    <button
                                        onClick={() => deleteTask(task.id)}
                                        className="middle none center ml-1 rounded-lg bg-red-500 p-2 font-sans text-sm font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-3 text-white">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                                        </svg>
                                    </button>
                                </li>
                            ))
                        }
                    </ul>
                </div>

                {/* Timeline */}
                <div style={{ width: "80%" }}>
                    <button
                        onClick={exportToCSV}
                        className="middle none center ml-4 rounded-lg bg-blue-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    >
                        Export to CSV
                    </button>
                   
                    <Timeline
                        groups={groups}
                        items={timelineItems}
                        keys={keys}
                        fullUpdate
                        itemTouchSendsClick={true}
                        stackItems
                        itemHeightRatio={1}
                        canMove={true}
                        canResize={"both"}
                        defaultTimeStart={defaultTimeStart}
                        defaultTimeEnd={defaultTimeEnd}
                        onItemClick={showAllData}
                        onItemMove={handleItemMove}
                        onItemResize={handleItemResize}
                        showCursorLine
                        lineHeight={50}

                    >
                        <TimelineHeaders>
                            <DateHeader unit="primaryHeader" />
                            <DateHeader unit="day" />
                        </TimelineHeaders>
                        <TodayMarker />
                    </Timeline>
                </div>
            </div>

            <EditModal taskId={taskId} setOpen={setOpen} editTask={editTask} open={open} />
        </>
    );
};

export default CalendarTimeline;
