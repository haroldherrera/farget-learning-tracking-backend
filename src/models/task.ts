type User = {
  id: number;
  name: string;
  email: string;
};

type TaskStatus = 'To Do' | 'In Progress' | 'Done';
type TaskPriority = 'Low' | 'Medium' | 'High' | 'Critical';

export type Task = {
  id: number | string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  assignee: User | null;
  reporter: User;
  createdAt: string; // ISO 8601 date string
  updatedAt: string; // ISO 8601 date string
};
