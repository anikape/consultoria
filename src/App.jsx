import { useState } from "react";
import RoutesApp from "./routes";
// import { AuthProvider } from './contexts/auth'
import { AuthProvider } from "./contexts/Auth/AuthProvider";
import "./App.css";
import "./index.css"

import Singin from "../pages/Signin";

function App() {
  return (
    <AuthProvider>
      <div>
        <RoutesApp />
      </div>
    </AuthProvider>
  );
}

export default App;
