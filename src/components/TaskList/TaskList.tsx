import { taskType } from '../../@types/task.type';
import styles from './taskList.module.scss';

interface TaskListProps {
  doneTaskList?: boolean;
  tasks: taskType[];
  handleDoneTask: (id: string, done: boolean) => void;
  startEditTask: (id: string) => void;
  removeTask: (id: string) => void;
}

export default function TaskList(props: TaskListProps) {
  const { doneTaskList, tasks, handleDoneTask, startEditTask, removeTask } = props;
  const onChangeCheckbox = (taskId: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    handleDoneTask(taskId, event.target.checked);
  };

  return (
    <div className='mb-2'>
      <h2 className={styles.title}>{doneTaskList ? 'Completed' : 'Pending'}</h2>
      <div className={styles.tasks}>
        {tasks.map((task) => (
          <div className={styles.task} key={task.id}>
            <input
              type='checkbox'
              className={styles.taskCheckbox}
              checked={task.done}
              onChange={onChangeCheckbox(task.id)}
            />
            <span className={`${styles.taskName} ${task.done ? styles.taskNameDone : ''}`}>{task.name}</span>
            <div className={styles.taskActions}>
              <button className={`${styles.taskBtn} ${styles.edit}`} onClick={() => startEditTask(task.id)}>
                Edit
              </button>
              <button className={`${styles.taskBtn} ${styles.remove}`} onClick={() => removeTask(task.id)}>
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
