import type { Todo } from "../../domain/todo.model";

type Props = {
  todos?: Todo[];
  loading?: boolean;
  error?: Error | null;
};

export const TodoList: React.FC<Props> = ({ todos, loading, error }) => {
  if (loading) {
    return <div>Loading todos...</div>;
  }

  if (error) {
    console.error("Error loading todos:", error);
    return <div>Error loading todos: {error.message}</div>;
  }

  if (!todos || todos.length === 0) {
    return <div>No todos found.</div>;
  }

  return (
    <div>
      <p>Todos:</p>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </div>
  );
};
