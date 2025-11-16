import { render } from "@testing-library/react";
import { UserDetail } from "./user-detail";
import type { User } from "../../domain/user.model";
import { UserId } from "../../domain/user-id.vo";

describe("UserDetail", () => {
  it("should render user details correctly", () => {
    const mockUser: User = {
      id: UserId.create("1"),
      name: "John Doe",
      username: "johndoe",
      email: "john.doe@example.com",
      city: "New York",
      website: "johndoe.com",
      company: "Doe Inc.",
      albumIds: [1, 2, 3],
      todoListIds: [1, 2],
    };

    const { getByText } = render(<UserDetail user={mockUser} />);

    expect(getByText("John Doe")).toBeInTheDocument();
    expect(getByText("Email: john.doe@example.com")).toBeInTheDocument();
    expect(getByText("Username: johndoe")).toBeInTheDocument();
    expect(getByText("City: New York")).toBeInTheDocument();
    expect(getByText("Website: johndoe.com")).toBeInTheDocument();
    expect(getByText("Company: Doe Inc.")).toBeInTheDocument();
  });
});
