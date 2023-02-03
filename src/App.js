import React, { useState, createContext } from 'react';
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Informations from "./scenes/informations";
import Members from "./scenes/members";
import Vehicles from "./scenes/vehicles";
import Chq from "./scenes/chq";
import Calendar from "./scenes/calendar";
import Register from "./scenes/form";
import Login from './scenes/login/Login';

export const LoginContext = createContext({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
});

function App() {
  const [theme, colorMode] = useMode();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {isLoggedIn && <Sidebar />}
          <main className="content">
            {isLoggedIn && <Topbar />}
            {isLoggedIn ? (
              <Routes>
                <Route path="/" element={<Informations />} />
                <Route path="/members" element={<Members />} />
                <Route path="/vehicles" element={<Vehicles />} />
                <Route path="/chq" element={<Chq />} />
                <Route path="/register" element={<Register />} />
                <Route path="/calendar" element={<Calendar />} />
              </Routes>
              ) : (
                <Routes>
                  <Route path="/" element={
                    <LoginContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
                      <Login />
                    </LoginContext.Provider>
                  } />
                </Routes>
              )}
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}

export default App;