import { useState } from 'react';
import { addTask } from '../api/tasks';

const AddTask = () => {
    const [formData, setFormData] = useState({ name: '', description: '', status: 'Not Completed' });

    const handleSubmit = (e) => {
        e.preventDefault();
        addTask(formData)
            .then(() => {
                setFormData({ name: '', description: '', status: 'Not Completed' }); // Reset form
                window.location.reload(); // Refresh the page
            })
            .catch((err) => console.error('Error adding task:', err));
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
            <h3 className="text-2xl font-semibold text-center mb-6">Add New Task</h3>
            
            <div className="mb-4">
                <label htmlFor="taskName" className="block text-sm font-medium text-gray-700">
                    Task Name
                </label>
                <input
                    id="taskName"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter task name"
                    required
                />
            </div>

            <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Description
                </label>
                <textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows="4"
                    className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter task description"
                    required
                />
            </div>

            <div className="mb-6">
                <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                    Status
                </label>
                <select
                    id="status"
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="Not Completed">Not Completed</option>
                    <option value="Completed">Completed</option>
                </select>
            </div>

            <button
                type="submit"
                className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                Add Task
            </button>
        </form>
    );
};

export default AddTask;
