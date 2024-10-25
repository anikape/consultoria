import RoutesApp from "@/routes";

import { AuthProvider } from "@/contexts/Auth/AuthProvider";
import "@/App.css";
import "@/index.css";
import { ClientProvider } from "@contexts/Client/ClientContext";

function App() {
  return (
    <AuthProvider>
      <ClientProvider>
        <RoutesApp />
      </ClientProvider>
    </AuthProvider>
  );
}

export default App;
