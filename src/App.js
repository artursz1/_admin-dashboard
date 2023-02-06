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
import Login from './scenes/login/Login';
import { useNavigate } from 'react-router-dom';

export const LoginContext = createContext({
  isLoggedIn: localStorage.getItem('isLoggedIn'),
  setIsLoggedIn: () => {},
});

export const UserContext = createContext({
  loggedInUsername: '',
  setLoggedInUsername: () => {},
});

export const RankContext = createContext({
  rankName: '',
  setRankName: () => {},
});

export const RankColor = createContext({
  rankColor: '',
  setRankColor: () => {},
});

export const ManagerContext = createContext({
  isManager: '',
  setIsManager: () => {},
});

export const TotalMembersContext = createContext({
  totalMembers: '',
  setTotalMembers: () => {},
});

export const TotalVehiclesContext = createContext({
  totalVehicles: '',
  setTotalVehicles: () => {},
});

function App() {
  const [theme, colorMode] = useMode();
  let [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn'));
  const [loggedInUsername, setLoggedInUsername] = useState(localStorage.getItem('loggedInUsername'));
  const [rankName, setRankName] = useState(localStorage.getItem('rankName'));
  const [rankColor, setRankColor] = useState(localStorage.getItem('rankColor'));
  const [isManager, setIsManager] = useState(localStorage.getItem('isManager'));
  const [totalMembers, setTotalMembers] = useState(localStorage.getItem('totalMembers'));
  const [totalVehicles, setTotalVehicles] = useState(localStorage.getItem('totalVehicles'));
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <RankContext.Provider value={{ rankName, setRankName }}>
        <RankColor.Provider value={{ rankColor, setRankColor }}>
          <ManagerContext.Provider value={{ isManager, setIsManager }}>
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
                        <TotalVehiclesContext.Provider value={{ totalVehicles, setTotalVehicles }}>
                          <TotalMembersContext.Provider value={{ totalMembers, setTotalMembers }}>
                            <UserContext.Provider value={{ loggedInUsername, setLoggedInUsername }}>
                              <Informations />
                            </UserContext.Provider>
                          </TotalMembersContext.Provider>
                        </TotalVehiclesContext.Provider>
                      } />
                      <Route path="/members" element={<Members />} />
                      <Route path="/vehicles" element={<Vehicles />} />
                      <Route path="/chq" element={<Chq />} />
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
          </ManagerContext.Provider>
        </RankColor.Provider>
      </RankContext.Provider>
    </ColorModeContext.Provider>
  )
}

export default App;