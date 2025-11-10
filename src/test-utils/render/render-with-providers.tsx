import { render } from "@testing-library/react";

import React from "react";
import { QueryClientWrapper } from "./query-client-wrapper";
import { RouterWrapper } from "./router-wrapper";

type RenderWithProvidersOptions = {
  initialEntries?: string[];
};

export function renderWithProviders(
  ui: React.ReactElement,
  options: RenderWithProvidersOptions = {}
) {
  const { initialEntries } = options;
  return render(
    <RouterWrapper initialEntries={initialEntries}>
      <QueryClientWrapper>{ui}</QueryClientWrapper>
    </RouterWrapper>
  );
}
