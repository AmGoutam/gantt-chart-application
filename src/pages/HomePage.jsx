import { useGlobalContext } from '../context/AppProvider';
import Modal from '../components/Modal';
import { useEffect, useState } from 'react';
import Loader from '../components/Loader';
import CalendarTimeline from '../components/CalendarTimeline';

const HomePage = () => {
  const { fetchTasks, tasks, loading, editTask, deleteTask } = useGlobalContext();
  const [filter, setFilter] = useState('');
  const [filteredTasks, setFilteredTasks] = useState([]);

  // Filter tasks by name
  const handleFilter = (e) => {
    const value = e.target.value.toLowerCase();
    setFilter(value);
    const filtered = tasks.filter((task) =>
      task.taskName.toLowerCase().includes(value)
    );
    setFilteredTasks(filtered);
  };



  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <>


      <Modal filter={filter} handleFilter={handleFilter} />
      {loading ? (
        <Loader />
      ) : (
        <>

          <CalendarTimeline tasks={filter ? filteredTasks : tasks} editTask={editTask} deleteTask={deleteTask} />
        </>
      )}



    </>
  );
};

export default HomePage;
