import RoutesApp from "@/routes";

import { AuthProvider } from "@/contexts/Auth/AuthProvider";
import "@/App.css";
import "@/index.css";

function App() {
  return (
    <AuthProvider>
      {/* <div> */}
      <RoutesApp />
      {/* </div> */}
    </AuthProvider>
  );
}

export default App;
