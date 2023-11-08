import logo from "./logo.svg";
import "./App.css";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
        <Route path="/" exact element={<Home />} />
        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
