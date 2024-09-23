import { BrowserRouter, Routes, Route } from "react-router-dom";

import NavBar from "./components/Navbar";
import CustomFooter from "./components/CustomFooter";

import "./App.css";

import HomePage from "./pages/HomePage";
import LocationPage from "./pages/LocationPage";
import ServicesPage from "./pages/ServicesPage";
import ContactPage from "./pages/CustomerContactPage";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/location" element={<LocationPage />} />
        <Route path="/serviceMenu/:type" element={<ServicesPage />}></Route>
        <Route
          path="/contact/:staffId/:serviceId"
          element={<ContactPage />}
        ></Route>
      </Routes>
      <CustomFooter />
    </BrowserRouter>
  );
}

export default App;
