import React from "react";
import { Button, Link, TextField, Typography } from "@mui/material";

function Signup() {
  const [user, setUser] = React.useState({
    email: "",
    username: "",
    password: "",
  });

  const signupHandler = async () => {
    try {
      const request = await fetch(
        "https://qrgen-backend.onrender.com/api/v1/users/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: user.username,
            email: user.email,
            password: user.password,
          }),
          credentials: "include",
        }
      );
      const response = await request.json();

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
          Register
        </Typography>
        <TextField
          label="email"
          placeholder="email"
          sx={{ marginTop: "20px" }}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <TextField
          label="username"
          placeholder="username"
          sx={{ marginTop: "10px" }}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
        />
        <TextField
          label="password"
          placeholder="password"
          type="password"
          sx={{ marginTop: "10px", marginBottom: "30px" }}
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
            onClick={() => signupHandler()}
          >
            Submit
          </Button>
          <Link style={{ textDecoration: "none" }} href="/login">
            Already a member? Click to enter
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;
