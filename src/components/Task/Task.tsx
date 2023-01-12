import styles from './task.module.scss';
import { taskType } from '../../@types/task.type';
import TaskInput from '../TaskInput';
import TaskList from '../TaskList';
import { useEffect, useState } from 'react';
export default function Task() {
  const [tasks, setTasks] = useState<taskType[]>([]);
  const doneTasks = tasks.filter((task) => task.done);
  const notdoneTasks = tasks.filter((task) => !task.done);
  const [currentTasks, setCurrentTasks] = useState<taskType | null>(null);

  useEffect(() => {
    const taskString = localStorage.getItem('tasks');
    const taskObj: taskType[] = JSON.parse(taskString || '[]');
    setTasks(taskObj);
  }, []);

  // (use interface)
  interface HandleNewTasks {
    (tasks: taskType[]): taskType[];
  }

  // (use type)
  // type HandleNewTasks = (tasks: taskType[]) => taskType[];

  const syncDataToLocalStorage = (handleNewTasks: HandleNewTasks) => {
    const taskString = localStorage.getItem('tasks');
    const taskObj: taskType[] = JSON.parse(taskString || '[]');
    const newTaskObj = handleNewTasks(taskObj);
    localStorage.setItem('tasks', JSON.stringify(newTaskObj));
  };

  const addTask = (name: string) => {
    const task: taskType = {
      name,
      done: false,
      id: new Date().toISOString()
    };
    setTasks((prev) => [...prev, task]);
    syncDataToLocalStorage((taskObj: taskType[]) => [...taskObj, task]);
  };

  const handleDoneTask = (id: string, done: boolean) => {
    const handleTaskCheckBox = (taskObj: taskType[]) => {
      return taskObj.map((task) => {
        if (task.id === id) {
          return { ...task, done };
        }
        return task;
      });
    };
    setTasks(handleTaskCheckBox);
    syncDataToLocalStorage(handleTaskCheckBox);
  };

  const startEditTask = (id: string) => {
    const selectedEditTask = tasks.find((task) => task.id === id);
    if (selectedEditTask) setCurrentTasks(selectedEditTask);
  };

  const editTask = (name: string) => {
    if (!currentTasks) return;

    setCurrentTasks((prev) => {
      if (prev) return { ...prev, name };
      return null;
    });
  };

  const finishEditTask = () => {
    const handleEditTask = (tasks: taskType[]) => {
      return tasks.map((task) => {
        if (task.id === currentTasks?.id) {
          return currentTasks;
        }
        return task;
      });
    };
    setTasks(handleEditTask);
    syncDataToLocalStorage(handleEditTask);
    setCurrentTasks(null);
  };

  const removeTask = (id: string) => {
    if (currentTasks) setCurrentTasks(null);

    const handleRemoveTask = (taskObj: taskType[]) => {
      return taskObj.filter((task) => task.id !== id);
    };
    setTasks(handleRemoveTask);
    syncDataToLocalStorage(handleRemoveTask);
  };

  return (
    <div className={styles.taskList}>
      <div className={styles.taskContainer}>
        <TaskInput addTask={addTask} currentTasks={currentTasks} editTask={editTask} finishEditTask={finishEditTask} />
        <TaskList
          tasks={notdoneTasks}
          handleDoneTask={handleDoneTask}
          startEditTask={startEditTask}
          removeTask={removeTask}
        />
        <TaskList
          doneTaskList
          tasks={doneTasks}
          handleDoneTask={handleDoneTask}
          startEditTask={startEditTask}
          removeTask={removeTask}
        />
      </div>
    </div>
  );
}
