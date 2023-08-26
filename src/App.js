import "./App.css";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import MainLanding from "./pages/Main";
import {ThemeProvider} from "@emotion/react";
import {createTheme} from "@mui/material";
import {blue, green, purple, teal} from "@mui/material/colors";

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: blue[900],
      },
      secondary: {
        main: teal[500],
      },
      button: {
        main: "#fff",
      },
    },
  });

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainLanding />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
