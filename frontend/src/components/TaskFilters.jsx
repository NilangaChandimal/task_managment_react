import PropTypes from "prop-types";

const TaskFilters = ({ filter, setFilter }) => {
    return (
        <div className="mb-5 space-x-2">
            {['All', 'Completed', 'Not Completed'].map((status) => (
                <button
                    key={status}
                    onClick={() => setFilter(status)} // Update the selected filter
                    className={`px-4 py-2 rounded ${
                        filter === status
                            ? 'bg-blue-500 text-white' // Highlight active filter
                            : 'bg-gray-200 text-black' // Style inactive filters
                    }`}
                >
                    {status}
                </button>
            ))}
        </div>
    );
};

TaskFilters.propTypes = {
    filter: PropTypes.string.isRequired, // Current filter value
    setFilter: PropTypes.func.isRequired, // Function to update filter in parent
};

export default TaskFilters;
