import { render, screen } from "@testing-library/react";
import { todoListMock } from "../../domain/todo.model.mock";
import { TodoList } from "./todo-list";

describe("TodoList", () => {
  it("should render loading state", () => {
    render(<TodoList loading={true} />);
    expect(screen.getByText(/loading todos.../i)).toBeInTheDocument();
  });

  it("should render error state", () => {
    const error = new Error("Failed to load todos");
    render(<TodoList error={error} />);
    expect(
      screen.getByText(/error loading todos: failed to load todos/i)
    ).toBeInTheDocument();
  });

  it("should render no todos found state", () => {
    render(<TodoList todos={[]} />);
    expect(screen.getByText(/no todos found./i)).toBeInTheDocument();
  });

  it("should render a list of todos", () => {
    render(<TodoList todos={todoListMock} />);
    expect(screen.getByText(/todos:/i)).toBeInTheDocument();
    for (const todo of todoListMock) {
      expect(screen.getByText(todo.title)).toBeInTheDocument();
    }
  });
});
