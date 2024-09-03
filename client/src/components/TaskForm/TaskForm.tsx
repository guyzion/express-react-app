import { Task } from "src/interfaces/task.interface";
import styles from "./TaskForm.module.css";
import { taskService } from "../../services/tasks.service";

interface Props {
  task?: Task;
  onUpdate?: (task: Task) => void;
}

export function TaskForm({ task, onUpdate }: Props) {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const data = Object.fromEntries(formData.entries()) as any as Task;

      if (!task) {
        const newTask = await taskService.createTask(data);
        onUpdate?.(newTask);
      } else {
        const updatedTask = await taskService.updateTask({
          ...data,
          id: task.id,
        });
        onUpdate?.(updatedTask);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.form} key={task?.id}>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            defaultValue={task?.title}
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            defaultValue={task?.description}
          />
        </div>
        <div>
          <label htmlFor="status">Status</label>
          <select id="status" name="status" defaultValue={task?.status}>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <div>
          <button type="submit">Save</button>
        </div>
      </form>
    </div>
  );
}
