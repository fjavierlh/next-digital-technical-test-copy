import { render, screen } from "@testing-library/react";
import { givenUsers } from "../../../test-utils/http/given-users";
import { usersDTOMock } from "../../user/infrastructure/user.dto.mock";
import { App } from "./App";

describe("App", () => {
  beforeEach(() => givenUsers());

  it("should render", () => {
    render(<App />);
    expect(screen.getByText(/loading.../i)).toBeInTheDocument();
  });

  it("should display a list of users", async () => {
    render(<App />);
    const firstUser = await screen.findByText(usersDTOMock[0].name);
    const secondUser = await screen.findByText(usersDTOMock[1].name);
    expect(firstUser).toBeInTheDocument();
    expect(secondUser).toBeInTheDocument();
  });
});
