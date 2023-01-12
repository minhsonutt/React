import { useState } from 'react';
import { taskType } from '../../@types/task.type';
import styles from './taskInput.module.scss';

interface TaskInputProps {
  addTask: (name: string) => void;
  currentTasks: taskType | null;
  editTask: (name: string) => void;
  finishEditTask: () => void;
}

export default function TaskInput(props: TaskInputProps) {
  const { addTask, currentTasks, editTask, finishEditTask } = props;
  const [name, setName] = useState<string>('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (currentTasks) {
      finishEditTask();
      if (name) setName('');
    } else {
      addTask(name);
      setName('');
    }
  };

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (currentTasks) {
      editTask(value);
    } else {
      setName(value);
    }
  };

  return (
    <div className='mb-2'>
      <h1 className={styles.title}>Task List TS</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Caption goes here'
          value={currentTasks ? currentTasks.name : name}
          onChange={onChangeInput}
        />
        <button type='submit' className={`${styles.btn} ${styles.btn_primary}`}>
          {currentTasks ? 'edit' : 'add'}
        </button>
      </form>
    </div>
  );
}
