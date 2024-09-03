import { Task } from "src/interfaces/task.interface";
import styles from "./TaskList.module.css";

interface Props {
  tasks: Task[];
  onTaskClick: (task: Task) => void;
  currentId?: number | null;
}

export function TaskList({ tasks, onTaskClick, currentId }: Props) {
  return (
    <div className={styles.root}>
      {tasks.map((task, index) => (
        <div
          key={`${task.id}-${index}`}
          className={`${styles.task} ${
            currentId === task.id ? styles.current : ""
          }`}
          onClick={() => onTaskClick(task)}
        >
          <div>
            <div>{task.title}</div>
            <div>{task.description}</div>
          </div>
          <div>{task.status}</div>
        </div>
      ))}
    </div>
  );
}
