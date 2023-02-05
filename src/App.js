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
import { useNavigate, useLocation } from 'react-router-dom';

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
  let [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn'));
  const [loggedInUsername, setLoggedInUsername] = useState(localStorage.getItem('loggedInUsername'));
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    if (!isLoggedIn && location.pathname !== '/login') {
      navigate('/login');
    }
  }, [isLoggedIn, location.pathname, navigate]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {isLoggedIn &&
            <UserContext.Provider value={{ loggedInUsername, setLoggedInUsername }}>
              <Sidebar />
            </UserContext.Provider>}
          <main className="content">
            {isLoggedIn &&
            <LoginContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
              <UserContext.Provider value={{ loggedInUsername, setLoggedInUsername }}>
                <Topbar />
              </UserContext.Provider>
            </LoginContext.Provider>}
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
                <Route path="/Register" element={<Register />} />
                <Route path="/calendar" element={<Calendar />} />
              </Routes>
            ) : (
              <Routes>
                <Route path="/login" element={
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