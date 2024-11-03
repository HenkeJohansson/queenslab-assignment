import { createRoot } from "react-dom/client";
import CreditCard from "./components/CreditCard/CreditCard";

const App = () => (
  <>
    <CreditCard />
  </>
);

const container = document.getElementById("react-root");
const root = createRoot(container);

root.render(<App tab="home" />);
