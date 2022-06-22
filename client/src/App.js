import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import About from "./pages/About";
import Home from "./pages/Home";
import Maintenance from "./pages/Maintenance";
import Predict from "./pages/Predict";

const MAINTENANCE = false;

function App() {
  if (MAINTENANCE) {
    return <Maintenance />;
  }
  return (
    <BrowserRouter>
      <div className="flex flex-col h-screen justify-between">
        <Routes>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/predict">
            <Route path=":movieId" element={<Predict />} />
          </Route>
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
