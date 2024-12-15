import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { updateTask } from '../api/tasks';

const EditTaskView = () => {
    const location = useLocation(); // Access the state passed via navigate
    const navigate = useNavigate(); // For redirecting after saving
    const [editedTask, setEditedTask] = useState(location.state?.task || {}); // Initialize with passed task

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedTask({ ...editedTask, [name]: value });
    };

    const handleSave = () => {
        updateTask(editedTask.id, editedTask)
            .then(() => {
                navigate('/'); // Redirect to the task list after saving
            })
            .catch((err) => console.error(err));
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
            <h3 className="text-2xl font-semibold text-center mb-6">Edit Task</h3>
            <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Name:
                </label>
                <input
                    id="name"
                    type="text"
                    name="name"
                    value={editedTask.name || ''}
                    onChange={handleChange}
                    className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Description:
                </label>
                <textarea
                    id="description"
                    name="description"
                    value={editedTask.description || ''}
                    onChange={handleChange}
                    rows="4"
                    className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div className="mb-6">
                <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                    Status:
                </label>
                <select
                    id="status"
                    name="status"
                    value={editedTask.status || ''}
                    onChange={handleChange}
                    className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="Not Completed">Not Completed</option>
                    <option value="Completed">Completed</option>
                </select>
            </div>
            <div className="flex justify-between">
                <button
                    onClick={handleSave}
                    className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Save
                </button>
                <button
                    onClick={() => navigate('/')}
                    className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default EditTaskView;
