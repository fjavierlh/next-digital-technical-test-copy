import { render, screen } from "@testing-library/react";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { PropsWithChildren } from "react";

describe("App", () => {
  it("should render", () => {
    renderWithProviders(<App />);
    expect(screen.getByText(/loading.../i)).toBeInTheDocument();
  });
});

export const QueryClientWrapper = ({ children }: PropsWithChildren) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

function renderWithProviders(ui: React.ReactElement) {
  return render(<QueryClientWrapper>{ui}</QueryClientWrapper>);
}
