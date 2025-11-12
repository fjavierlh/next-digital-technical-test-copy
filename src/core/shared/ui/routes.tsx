import { Route, Routes } from "react-router-dom";
import { UserDetailPage } from "./pages/user-detail-page";
import { UsersListPage } from "../../user/ui/pages/users-list-page";

export const AppRoutes: React.FC = () => (
  <Routes>
    <Route path="/" element={<UsersListPage />} />
    <Route path="/user/:userId" element={<UserDetailPage />} />
  </Routes>
);
