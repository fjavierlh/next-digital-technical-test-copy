import { screen } from "@testing-library/react";
import App from "./App";
import { usersDTOMock } from "./core/user/infrastructure/user.dto.mock";
import { renderWithProviders } from "./test-utils/render/render-with-providers";
import { givenUsers } from "./test-utils/http/given-users";

describe("App", () => {
  it("should render", () => {
    renderWithProviders(<App />);
    expect(screen.getByText(/loading.../i)).toBeInTheDocument();
  });

  it("should display a list of users", async () => {
    givenUsers();
    renderWithProviders(<App />);
    const firstUser = await screen.findByText(usersDTOMock[0].name);
    const secondUser = await screen.findByText(usersDTOMock[1].name);
    expect(firstUser).toBeInTheDocument();
    expect(secondUser).toBeInTheDocument();
  });
});
