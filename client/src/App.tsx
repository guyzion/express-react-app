import { useEffect, useState } from "react";
import { Header } from "./components/Header/Header";
import { TaskList } from "./components/TaskList/TaskList";
import { Task } from "./interfaces/task.interface";
import { taskService } from "./services/tasks.service";
import styles from "./App.module.css";
import { TaskForm } from "./components/TaskForm/TaskForm";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [currentId, setCurrentId] = useState<number | null>(null);

  useEffect(() => {
    taskService
      .getTasks()
      .then((tasks) => {
        setTasks(tasks);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  return (
    <div>
      <Header />
      <div className={styles.body}>
        <div className={styles.list}>
          {error ? (
            <p>{error}</p>
          ) : (
            <TaskList
              tasks={tasks}
              onTaskClick={({ id }) => setCurrentId(id)}
              currentId={currentId}
            />
          )}
        </div>
        <div className={styles.form}>
          <TaskForm
            task={tasks.find((task) => task.id === currentId)}
            onUpdate={(task) => {
              setCurrentId(task.id);
              const newTasks = [...tasks];
              const index = newTasks.findIndex((task) => task.id === currentId);
              if (index !== -1) newTasks[index] = task;
              else newTasks.push(task);
              setTasks(newTasks);
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
