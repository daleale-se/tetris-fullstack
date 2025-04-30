import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Game from "./pages/Game";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import { UserContext } from "./context/UserContext";
import { useContext, useEffect } from "react";
import { UserDataType } from "./types";
import { getUserData } from "./services/user";

function App() {

  const { setUserData } = useContext(UserContext)

  useEffect(() => {

    const fetchUser = async () => {
      const token = sessionStorage.getItem("token")
      if (token) {
        const usersData: UserDataType = await getUserData(token)
        setUserData(usersData)
      }
    }

    fetchUser()

  }, [])

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<Game />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
