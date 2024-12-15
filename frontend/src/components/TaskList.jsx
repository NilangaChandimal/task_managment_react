import { deleteTask, updateTask } from "../api/tasks";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const TaskList = ({ tasks, setTasks }) => {
  const navigate = useNavigate();

  // Handle task deletion
  const handleDelete = (id) => {
    deleteTask(id)
      .then(() => setTasks((prev) => prev.filter((task) => task.id !== id)))
      .catch((err) => console.error("Error deleting task:", err));
  };

  // Toggle task status
  const toggleStatus = (task) => {
    const updatedTask = {
      ...task,
      status: task.status === "Completed" ? "Not Completed" : "Completed",
    };
    updateTask(task.id, updatedTask)
      .then(() => {
        setTasks((prev) =>
          prev.map((t) =>
            t.id === task.id ? { ...t, status: updatedTask.status } : t
          )
        );
      })
      .catch((err) => console.error("Error updating task status:", err));
  };

  // Navigate to edit task
  const handleEdit = (task) => {
    navigate("/edit", { state: { task } });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg w-11/12 sm:w-3/4 lg:w-2/3">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800 text-center">Task List</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full table-auto text-left border-collapse">
            <thead className="bg-gray-200 text-gray-700 text-sm uppercase">
              <tr>
                <th className="px-6 py-3 border-b border-gray-300">Name</th>
                <th className="px-6 py-3 border-b border-gray-300">Description</th>
                <th className="px-6 py-3 border-b border-gray-300">Status</th>
                <th className="px-6 py-3 border-b border-gray-300 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-600">
              {tasks.map((task) => (
                <tr key={task.id} className="hover:bg-gray-100">
                  <td className="px-6 py-4 border-b border-gray-300 font-medium">
                    {task.name}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-300">{task.description}</td>
                  <td
                    className={`px-6 py-4 border-b border-gray-300 font-medium ${
                      task.status === "Completed"
                        ? "text-green-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {task.status}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-300 text-center space-x-2">
                    <button
                      className={`px-3 py-1 text-sm font-semibold rounded-lg ${
                        task.status === "Completed"
                          ? "bg-yellow-500 hover:bg-yellow-600 text-white"
                          : "bg-green-500 hover:bg-green-600 text-white"
                      }`}
                      onClick={() => toggleStatus(task)}
                    >
                      {task.status === "Completed" ? "Mark as Not Completed" : "Mark as Completed"}
                    </button>
                    <button
                      className="px-3 py-1 text-sm font-semibold bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
                      onClick={() => handleEdit(task)}
                    >
                      Edit
                    </button>
                    <button
                      className="px-3 py-1 text-sm font-semibold bg-red-500 hover:bg-red-600 text-white rounded-lg"
                      onClick={() => handleDelete(task.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Prop validation for TaskList
TaskList.propTypes = {
  tasks: PropTypes.array.isRequired,
  setTasks: PropTypes.func.isRequired,
};

export default TaskList;
