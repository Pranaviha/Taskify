import Taskform from './Components/Taskform'
import Tasklist from './Components/Tasklist'
import Progresstracker from './Components/Progresstracker'
import Calendar from './Components/Calendar'
import { useEffect, useState } from 'react';

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });
  
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }, [tasks]);

  const addTask = (task) => {
    setTasks([...tasks, task]);
  }

  const updateTask = (updatedTask, index) => {
    const newTask = [...tasks];
    newTask[index] = updatedTask;
    setTasks(newTask);
  }

  const updateTaskDate = (index, date) => {
    const newTasks = [...tasks];
    newTasks[index] = { ...newTasks[index], date };
    setTasks(newTasks);
  }

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i != index ))
  }

  const clearTasks = () => {
     setTasks([]);
  }

  return (
    <div>
      <h1>Taskify</h1>
      <p><i>Organize your day, effortlessly.</i></p>
      
      <div className="main-content-layout">
        <div className="tasks-section">
          <Taskform addTask={addTask}/>
          <Tasklist tasks={tasks} deleteTask={deleteTask} updateTask={updateTask} />
          <Progresstracker tasks={tasks}/>

          {tasks.length > 0 && (<button className='clear-btn' onClick={clearTasks}>
            Clear All Tasks</button>)}
        </div>

        <div className="calendar-section">
          <Calendar tasks={tasks} updateTaskDate={updateTaskDate} />
        </div>
      </div>
    
    </div>
  );
}

export default App
