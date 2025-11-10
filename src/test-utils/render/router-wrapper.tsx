import type { ReactNode } from "react";
import { MemoryRouter } from "react-router-dom";
import { AppRoutes } from "../../core/shared/ui/routes";

export type RouterWrapperProps = {
  children?: ReactNode;
  initialEntries?: string[];
};

export const RouterWrapper = ({
  children = <AppRoutes />,
  initialEntries = ["/"],
}: RouterWrapperProps) => {
  return (
    <MemoryRouter initialEntries={initialEntries}>{children}</MemoryRouter>
  );
};
