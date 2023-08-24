import "./App.css";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import MainLanding from "./pages/Main";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLanding />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
