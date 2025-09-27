import Nav from "./components/Nav";
import Home from "./components/pages/Home";
import Testing from "./components/pages/Testing"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/testing" element={<Testing />} />
        </Routes>
    </Router>
  );
}

export default App;
