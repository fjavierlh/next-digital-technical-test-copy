import { useState } from "react";

type Props = {
  onSubmit: (title: string) => Promise<void> | void;
  pending?: boolean;
  error?: Error | null;
};

export const TodoForm: React.FC<Props> = ({ onSubmit, pending, error }) => {
  const [title, setTitle] = useState("");

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedTitle = title.trim();
    if (trimmedTitle === "") {
      return;
    }
    await onSubmit(trimmedTitle);
    setTitle("");
  };

  return (
    <form onSubmit={handleOnSubmit}>
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
        <button type="submit" disabled={pending}>
          Add Todo
        </button>
      }
    </form>
  );
};
