import React, { useState } from 'react';

export default function Calendar({ tasks, updateTaskDate }) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetDate) => {
    e.preventDefault();
    const taskIndex = e.dataTransfer.getData("taskIndex");
    if (taskIndex !== null && taskIndex !== "") {
      updateTaskDate(parseInt(taskIndex, 10), targetDate);
    }
  };

  // Generate days array
  const days = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const formatDate = (day) => {
    if (!day) return null;
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const dayStr = String(day).padStart(2, '0');
    return `${year}-${month}-${dayStr}`;
  };

  const todayStr = formatDate(new Date().getDate());
  const isCurrentMonth = new Date().getMonth() === currentDate.getMonth() && new Date().getFullYear() === currentDate.getFullYear();

  return (
    <div className="calendar">
      <div className="calendar-header">
        <button onClick={prevMonth}>&lt;</button>
        <h2>{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</h2>
        <button onClick={nextMonth}>&gt;</button>
      </div>
      <div className="calendar-grid">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="calendar-day-name">{day}</div>
        ))}
        {days.map((day, index) => {
          const dateStr = formatDate(day);
          const dayTasks = dateStr ? tasks.filter(t => t.date === dateStr) : [];
          const isToday = isCurrentMonth && dateStr === todayStr;
          
          return (
            <div 
              key={index} 
              className={`calendar-cell ${day ? '' : 'empty'} ${isToday ? 'today' : ''}`}
              onDragOver={day ? handleDragOver : undefined}
              onDrop={day ? (e) => handleDrop(e, dateStr) : undefined}
            >
              {day && <span className="day-number">{day}</span>}
              <div className="calendar-tasks-container">
                {dayTasks.map((t, i) => (
                  <div key={i} className={`calendar-task priority-${t.priority}`} title={t.text}>
                    {t.text}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
