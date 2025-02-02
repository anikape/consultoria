import { createRoot } from "react-dom/client";
import App from "@/App.jsx";
import "@/index.css";

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
// )

const root = createRoot(document.querySelector("#root"));

root.render(<App />);
