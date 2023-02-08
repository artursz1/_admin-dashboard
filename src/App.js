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

export const RetrieveMembersContext = createContext({
  memberList: [],
  setMemberList: () => {},
});

function App() {
  const [theme, colorMode] = useMode();
  let [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn'));
  const [loggedInUsername, setLoggedInUsername] = useState(localStorage.getItem('loggedInUsername'));
  const [rankName, setRankName] = useState(localStorage.getItem('rankName'));
  const [rankColor, setRankColor] = useState(localStorage.getItem('rankColor'));
  const [isManager, setIsManager] = useState(localStorage.getItem('isManager'));
  const [memberList, setMemberList] = useState(RetrieveMembersContext.member);
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
                <ManagerContext.Provider value={{ isManager, setIsManager }}>
                  <UserContext.Provider value={{ loggedInUsername, setLoggedInUsername }}>
                    <Sidebar />
                  </UserContext.Provider>
                </ManagerContext.Provider>}
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
                      <Route path='/members' element={
                        <RetrieveMembersContext.Provider value={{ memberList, setMemberList }}>
                          <ManagerContext.Provider value={{ isManager, setIsManager }}>
                            <UserContext.Provider value={{ loggedInUsername, setLoggedInUsername }}>
                              <Members />
                            </UserContext.Provider>
                          </ManagerContext.Provider>
                        </RetrieveMembersContext.Provider>
                      } />
                      <Route path="/vehicles" element={<Vehicles />} />
                      <Route path="/chq" element={<Chq />} />
                      <Route path="/calendar" element={
                        <UserContext.Provider value={{ loggedInUsername, setLoggedInUsername }}>
                          <Calendar />
                        </UserContext.Provider>
                      } />
                    </Routes>
                  ) : (
                    <Routes>
                      <Route path="/login" element={
                        <RetrieveMembersContext.Provider value={{ memberList, setMemberList }}>
                          <ManagerContext.Provider value={{ isManager, setIsManager }}>
                            <LoginContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
                              <UserContext.Provider value={{ loggedInUsername, setLoggedInUsername }}>
                                <Login />
                              </UserContext.Provider>
                            </LoginContext.Provider>
                          </ManagerContext.Provider>
                        </RetrieveMembersContext.Provider>
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