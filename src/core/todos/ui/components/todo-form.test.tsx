import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TodoForm } from "./todo-form";

const user = userEvent.setup();

describe("CreateTodoForm", () => {
  it("should render", () => {
    render(<TodoForm onSubmit={() => {}} />);
    expect(screen.getByPlaceholderText(/new todo title/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /add todo/i })
    ).toBeInTheDocument();
  });

  it("should send new todo title when form is submitted", async () => {
    const onSubmit = vi.fn();
    render(<TodoForm onSubmit={onSubmit} />);

    const input = screen.getByPlaceholderText(/new todo title/i);
    const button = screen.getByRole("button", { name: /add todo/i });

    await user.type(input, "New Todo");
    expect(input).toHaveValue("New Todo");

    await user.click(button);

    expect(onSubmit).toHaveBeenCalledWith("New Todo");
    expect(input).toHaveValue("");
  });

  it("should not submit empty todo title", async () => {
    const onSubmit = vi.fn();
    render(<TodoForm onSubmit={onSubmit} />);

    const input = screen.getByPlaceholderText(/new todo title/i);
    const button = screen.getByRole("button", { name: /add todo/i });

    await user.type(input, "   ");
    expect(input).toHaveValue("   ");

    await user.click(button);

    expect(onSubmit).not.toHaveBeenCalled();
    expect(input).toHaveValue("   ");
  });

  it("should show error message when todo creation fails", async () => {
    const errorMessage = "Failed to create todo";
    render(<TodoForm onSubmit={vi.fn()} error={new Error(errorMessage)} />);

    const error = await screen.findByText(errorMessage);
    expect(error).toBeInTheDocument();
  });

  it("should disable submit button while creating todo", async () => {
    render(<TodoForm onSubmit={vi.fn()} pending={true} />);
    const button = screen.getByRole("button", { name: /add todo/i });
    expect(button).toBeDisabled();
  });
});
