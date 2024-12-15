import { useState, useEffect } from 'react';
import { fetchTasks } from '../../api/tasks';
import TaskList from '../TaskList';
import AddTask from '../AddTask';
import TaskFilters from '../TaskFilters';

const ViewPage = () => {
    const [tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState('All'); // Track the selected filter

    useEffect(() => {
        fetchTasks()
            .then((res) => setTasks(res.data))
            .catch((err) => console.error(err));
    }, []);

    const filteredTasks = tasks.filter((task) =>
        filter === 'All' ? true : task.status === filter
    );

    return (
        <div>
            <AddTask />
            <TaskFilters filter={filter} setFilter={setFilter} /> {/* Pass props */}
            <TaskList tasks={filteredTasks} setTasks={setTasks} />
        </div>
    );
};

export default ViewPage;
