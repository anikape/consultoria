import { AdminProfile } from "@components/AdminProfile";
import { AdminProvider } from "@contexts/Admin/AdminContext";

const Index = () => {
  return (
    <AdminProvider>
      <AdminProfile />
    </AdminProvider>
  );
};

export default Index;
