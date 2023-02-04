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

export const UserContext = createContext({
  loggedInUsername: '',
  setLoggedInUsername: () => {},
});

function App() {
  const [theme, colorMode] = useMode();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUsername, setLoggedInUsername] = useState('');

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
                <Route path='/informations' element={
                  <UserContext.Provider value={{ loggedInUsername, setLoggedInUsername }}>
                  <Informations />
                </UserContext.Provider>
                } />
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
                      <UserContext.Provider value={{ loggedInUsername, setLoggedInUsername }}>
                        <Login />
                      </UserContext.Provider>
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