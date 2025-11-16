import { useState } from "react";

type Props = {
  onCreateTodo: (title: string) => Promise<void> | void;
  isCreatingTodo?: boolean;
  error?: Error | null;
};

export const TodoForm: React.FC<Props> = ({
  onCreateTodo,
  isCreatingTodo,
  error,
}) => {
  const [title, setTitle] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedTitle = title.trim();
    if (trimmedTitle === "") {
      return;
    }
    await onCreateTodo(trimmedTitle);
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="New todo title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        pattern="^[^0-9]*$"
        title="Numbers are not allowed in the title"
      />
      {error && <div style={{ color: "red" }}>{error.message}</div>}
      {
        <button type="submit" disabled={isCreatingTodo}>
          Add Todo
        </button>
      }
    </form>
  );
};
