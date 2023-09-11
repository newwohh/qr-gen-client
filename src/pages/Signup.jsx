import React from "react";
import { Box, Button, Link, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigation = useNavigate();
  const [user, setUser] = React.useState({
    email: "",
    username: "",
    password: "",
  });
  const [userError, setUserError] = React.useState(true);

  function validateUser(user) {
    if (
      !user.username ||
      !user.email ||
      !user.password ||
      !user.password.length > 8 ||
      !/^(?=.*[A-Z])(?=.*\d)/.test(user.password) ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)
    ) {
      return false;
    }

    return true;
  }

  const signupHandler = async () => {
    setUserError(validateUser(user));
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
      if (response.message === "User signed up successfully") {
        navigation("/login");
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
          padding: "60px",
          borderRadius: "50px",
          backgroundColor: "white",
          width: "350px",
          textAlign: "center",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h3"
          sx={{ fontWeight: 1000, color: "#6CB4EE", textAlign: "center" }}
        >
          Register
        </Typography>
        {userError || (
          <Box sx={{ width: "250px", textAlign: "center" }}>
            <Typography
              sx={{ fontSize: "13px", color: "red", textAlign: "center" }}
            >
              Please provide a valid username, a valid email, and a password
              that is at least 8 characters long, containing at least one
              uppercase letter and one number.
            </Typography>
          </Box>
        )}
        <TextField
          label="email"
          placeholder="email"
          sx={{ marginTop: "20px", width: "300px" }}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <TextField
          label="username"
          placeholder="username"
          sx={{ marginTop: "10px", width: "300px" }}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
        />
        <TextField
          label="password"
          placeholder="password"
          type="password"
          sx={{ marginTop: "10px", marginBottom: "20px", width: "300px" }}
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
              width: "150px",
              padding: "10px",
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
