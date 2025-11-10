import { render } from "@testing-library/react";

import React from "react";
import { QueryClientWrapper } from "./query-client-wrapper";
import { RouterWrapper } from "./router-wrapper";

export function renderWithProviders(ui: React.ReactElement) {
  return render(
    <RouterWrapper>
      <QueryClientWrapper>{ui}</QueryClientWrapper>
    </RouterWrapper>
  );
}
