import React, { useEffect, useState } from 'react';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { useSelector } from 'react-redux';

const TaskReminder = () => {

  const saveTask = useSelector((state) => state.saveTask);

  const NotifyTaskNameReminder = (tasks) => {
    tasks.forEach(task => {
      const taskName = task.taskName;
      const taskCompletionTime = new Date(task.completionTime);
      const currentTime = new Date();
      const timeDifference = taskCompletionTime - currentTime;
      if (timeDifference > 0 && timeDifference <= 5 * 60 * 1000) {
        NotificationManager.warning('Your task: ' + taskName + ' is coming up in 5 minutes!', 'Task Reminder', 5000);
      }
    });
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (saveTask.length > 0) {
        NotifyTaskNameReminder(saveTask);
      } 
    }, 10000);
    return () => clearInterval(intervalId);
  }, [saveTask]);

  return (
    <div>
      <NotificationContainer />
    </div>
  );
};

export default TaskReminder;