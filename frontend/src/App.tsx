import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Game from "./pages/Game";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import { UserContext } from "./context/UserContext";
import { useContext, useEffect } from "react";
import { fetchUser } from "./services/user";

function App() {

  const { setUserData } = useContext(UserContext)

  useEffect(() => {
    
    fetchUser(setUserData)
    
  }, [setUserData])

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
