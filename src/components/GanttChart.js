import React, { useEffect } from 'react';
import gantt from 'dhtmlx-gantt';
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css';
import axios from 'axios';
import 'date-format-lite';

const GanttChart = ({ projectId }) => {
  useEffect(() => {
    gantt.config.xml_date = "%Y-%m-%d %H:%i:%s";
    gantt.config.date_format = "%Y-%m-%d %H:%i:%s";

    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/projects/${projectId}/tasks`);
        gantt.clearAll();
        gantt.parse(response.data);
      } catch (error) {
        console.error('Failed to fetch tasks:', error);
      }
    };

    const createTask = async (task) => {
      console.log('Creating task:', task);
      const formattedTask = {
        ...task,
        start_date: new Date(task.start_date).format("YYYY-MM-DD HH:mm:ss"),
        end_date: task.end_date ? new Date(task.end_date).format("YYYY-MM-DD HH:mm:ss") : null,
        duration: parseInt(task.duration, 10)
      };
      try {
        const response = await axios.post(`http://localhost:5000/api/projects/${projectId}/tasks`, formattedTask);
        console.log('Task creation response:', response.data);
        return response.data.id || null; // Ensure the backend returns the new task id or null
      } catch (error) {
        console.error('Failed to create task:', error.response ? error.response.data : error.message);
        throw error;
      }
    };

    const updateTask = async (id, task) => {
      console.log('Updating task:', id, task);
      try {
        await axios.put(`http://localhost:5000/api/projects/${projectId}/tasks/${id}`, task);
      } catch (error) {
        console.error('Failed to update task:', error);
      }
    };

    const deleteTask = async (id) => {
      console.log('Deleting task:', id);
      try {
        await axios.delete(`http://localhost:5000/api/projects/${projectId}/tasks/${id}`);
      } catch (error) {
        console.error('Failed to delete task:', error);
      }
    };

    fetchData();

    gantt.init('gantt_here');

    // Handle CRUD operations
    gantt.attachEvent("onTaskCreated", async (id, item) => {
      console.log('Task created with ID:', id, 'and item:', item);

      // Retrieve task if item is undefined
      if (!item) {
        item = gantt.getTask(id);
        console.log('Retrieved task using ID:', item);
      }

      // Create a minimal task if still undefined
      if (!item) {
        item = {
          id: id,
          text: "New task",
          start_date: new Date(),
          duration: 1
        };
        console.log('Created minimal task:', item);
      }

      // Ensure dates are formatted correctly
      if (item.start_date) {
        item.start_date = new Date(item.start_date).format("YYYY-MM-DD HH:mm:ss");
      }

      if (item.end_date) {
        item.end_date = new Date(item.end_date).format("YYYY-MM-DD HH:mm:ss");
      }

      try {
        const newTask = await createTask(item);
        if (newTask && newTask.id) {
          gantt.changeTaskId(id, newTask.id);
          gantt.updateTask(newTask.id, {
            id: newTask.id,
            text: newTask.text,
            start_date: new Date(newTask.start_date),
            duration: newTask.duration
          });
          console.log('Task updated with server data:', newTask);
        } else {
          throw new Error('Failed to get new task data from server');
        }
      } catch (error) {
        console.error('Error creating task:', error);
        gantt.deleteTask(id);
      }
    });

    gantt.attachEvent("onAfterTaskUpdate", (id) => {
      const item = gantt.getTask(id);
      console.log('Task updated with ID:', id, 'and item:', item);

      if (!item) {
        console.error('Task update failed: item is undefined');
        return;
      }

      if (item.start_date) {
        item.start_date = new Date(item.start_date).format("YYYY-MM-DD HH:mm:ss");
      }

      if (item.end_date) {
        item.end_date = new Date(item.end_date).format("YYYY-MM-DD HH:mm:ss");
      }

      updateTask(id, item);
    });

    gantt.attachEvent("onAfterTaskDelete", (id) => {
      console.log('Task deleted with ID:', id);
      deleteTask(id);
    });

    return () => {
      gantt.clearAll();
    };
  }, [projectId]);

  return <div id="gantt_here" style={{ width: '100%', height: '500px' }}></div>;
};

export default GanttChart;
