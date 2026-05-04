import React, { useState } from 'react'

export default function Taskform({addTask}) {
    const [task, setTask]= useState('');
    const [priority, setPriority] = useState('medium');
    const [category, setCategory] = useState('general');
    const [date, setDate] = useState('');

    const handlesubmit = (e) => {
        e.preventDefault(); // stop from refreshing the page
        addTask({text: task, priority, category, date: date || null, completed: false})
        //Reset the values
        setTask('');
        setPriority('medium');
        setCategory('general');
        setDate('');
    }
    return (
      <form onSubmit={handlesubmit} className='task-form'>
        <div id='inp'>
            <input type='text' placeholder='Enter your task' onChange={(e) => setTask(e.target.value)} value={task}/>
            <button type='submit'>Add Task</button>
        </div>

        <div id='btns'>
            <input type='date' value={date} onChange={(e) => setDate(e.target.value)} style={{ padding: '0.75rem 1rem', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#e0e0e0', flex: 1 }} />
            <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
            </select>

             <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="general">General</option>
                <option value="work">Work</option>
                <option value="personal">Personal</option>
            </select>
        </div>
      </form>
  );
}
