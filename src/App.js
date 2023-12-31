import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { QrContext } from "./context/QrContext";

function App() {
  const [text, setText] = React.useState({ _id: "", text: "", current: false });
  const user = localStorage.getItem("user");
  const [isLoggedIn, setIsLoggedIn] = React.useState(true);
  console.log(user);

  React.useEffect(() => {
    if (user !== null) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [user]);

  return (
    <div className="App">
      <QrContext.Provider value={{ text, setText }}>
        <Routes>
          <Route path="/" element={isLoggedIn ? <Home /> : <Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </QrContext.Provider>
    </div>
  );
}

export default App;
