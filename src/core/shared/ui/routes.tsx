import { Route, Routes } from "react-router-dom";
import { UserDetailPage } from "./pages/user-detail-page";
import { UsersListPage } from "../../user/ui/pages/users-list-page";
import { AlbumDetailPage } from "../../album/ui/pages/album-detail-page";

export const AppRoutes: React.FC = () => (
  <Routes>
    <Route path="/" element={<UsersListPage />} />
    <Route path="/user/:userId" element={<UserDetailPage />} />
    <Route path="/user/:userId/album/:albumId" element={<AlbumDetailPage />} />
  </Routes>
);
