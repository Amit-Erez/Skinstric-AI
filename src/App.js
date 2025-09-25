import Nav from "./components/Nav";
import Home from "./components/pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
    </Router>
  );
}

export default App;
