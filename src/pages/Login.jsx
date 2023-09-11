import React from "react";
import { Button, Link, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigation = useNavigate();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });

  const loginHandler = async () => {
    try {
      const request = await fetch(
        "https://qrgen-backend.onrender.com/api/v1/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: user.email,
            password: user.password,
          }),
          credentials: "include",
        }
      );
      const response = await request.json();
      if (response.message === "User logged in successfully") {
        localStorage.setItem("user", JSON.stringify(response.user._id));
        navigation("/");
      }

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        backgroundImage: "linear-gradient(to right, #00b4db, #0083b0)",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "90px",
          borderRadius: "50px",
          backgroundColor: "white",
        }}
      >
        <Typography variant="h3" sx={{ fontWeight: 1000, color: "#6CB4EE" }}>
          Login
        </Typography>
        <TextField
          label="email"
          placeholder="email"
          sx={{ marginTop: "20px" }}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <TextField
          label="password"
          placeholder="password"
          type="password"
          sx={{
            marginTop: "10px",
            marginBottom: "30px",
          }}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <div
          style={{
            padding: "10px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Button
            sx={{
              backgroundColor: "#007791",
              color: "white",
              width: "100px",
              marginBottom: "10px",
              "&:hover": {
                backgroundColor: "#007791",
              },
            }}
            onClick={() => loginHandler()}
          >
            Submit
          </Button>
          <Link style={{ textDecoration: "none" }} href="/signup">
            Not registered? Click to join
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
