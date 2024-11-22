import RoutesApp from "@/routes";

import { AuthProvider } from "@contexts/Auth/AuthProvider";
import "@/App.css";
import "@/index.css";
import { ClientProvider } from "@contexts/Client/ClientContext";
import { CompanyProvider } from "@contexts/Company/CompanyContext";

function App() {
  return (
    <AuthProvider>
      <ClientProvider>
        <CompanyProvider>
          <RoutesApp />
        </CompanyProvider>
      </ClientProvider>
    </AuthProvider>
  );
}

export default App;
