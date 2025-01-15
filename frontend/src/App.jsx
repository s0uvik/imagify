import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Result from "./pages/Result";
import Price from "./pages/Price";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/result" element={<Result />} />
        <Route path="/price" element={<Price />} />
      </Routes>
    </div>
  );
};

export default App;
