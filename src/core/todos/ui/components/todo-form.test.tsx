import { render, screen, waitFor } from "@testing-library/react";
import { TodoForm } from "./todo-form";
import userEvent from "@testing-library/user-event";

const user = userEvent.setup();

describe("CreateTodoForm", () => {
  it("should render", () => {
    render(<TodoForm onCreateTodo={() => {}} />);
    expect(screen.getByPlaceholderText(/new todo title/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /add todo/i })
    ).toBeInTheDocument();
  });

  it("should send new todo title when form is submitted", async () => {
    const onCreateTodo = vi.fn();
    render(<TodoForm onCreateTodo={onCreateTodo} />);

    const input = screen.getByPlaceholderText(/new todo title/i);
    const button = screen.getByRole("button", { name: /add todo/i });

    await user.type(input, "New Todo");
    expect(input).toHaveValue("New Todo");

    await user.click(button);

    expect(onCreateTodo).toHaveBeenCalledWith("New Todo");
    expect(input).toHaveValue("");
  });

  it("should not submit empty todo title", async () => {
    const onCreateTodo = vi.fn();
    render(<TodoForm onCreateTodo={onCreateTodo} />);

    const input = screen.getByPlaceholderText(/new todo title/i);
    const button = screen.getByRole("button", { name: /add todo/i });

    await user.type(input, "   ");
    expect(input).toHaveValue("   ");

    await user.click(button);

    expect(onCreateTodo).not.toHaveBeenCalled();
    expect(input).toHaveValue("   ");
  });

  it("should show error message when todo creation fails", async () => {
    const errorMessage = "Failed to create todo";
    render(<TodoForm onCreateTodo={vi.fn()} error={new Error(errorMessage)} />);

    const error = await screen.findByText(errorMessage);
    expect(error).toBeInTheDocument();
  });

  it("should disable submit button while creating todo", async () => {
    const onCreateTodo = vi.fn();
    render(<TodoForm onCreateTodo={onCreateTodo} isCreatingTodo={true} />);
    const button = screen.getByRole("button", { name: /add todo/i });
    expect(button).toBeDisabled();
  });
});
