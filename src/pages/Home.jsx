import React, { useContext } from "react";
import QRCode from "react-qr-code";
import { Button, TextField } from "@mui/material";
import SideDrawer from "../components/SideDrawer";
import { QrContext } from "../context/QrContext";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigation = useNavigate();
  const { text, setText } = useContext(QrContext);
  const [value, setValue] = React.useState("");
  console.log(text.text);

  const user = localStorage.getItem("user");

  React.useEffect(() => {
    if (user === null) {
      navigation("/login");
    }
  }, [user]);

  const createNewQr = async () => {
    try {
      const userId = JSON.parse(localStorage.getItem("user"));
      const request = await fetch(
        `https://qrgen-backend.onrender.com/api/v1/qr/create/${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: value,
          }),
          credentials: "include",
        }
      );
      const response = await request.json();
      console.log(response);
      window.location.reload(false);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(text.text, value);
  console.log(value);

  const updateQr = async () => {
    try {
      const textId = text._id;
      const request = await fetch(
        `https://qrgen-backend.onrender.com/api/v1/qr/${textId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: text.text,
          }),
          credentials: "include",
        }
      );
      const response = await request.json();
      console.log(response);
      window.location.reload(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <SideDrawer />
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
            background: "white",
            padding: "40px",
            height: "450px",
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            borderRadius: "50px",
          }}
        >
          <QRCode
            size={256}
            style={{ height: "450px", maxWidth: "100%", width: "400px" }}
            value={!text.current ? value : text.text}
            viewBox={`0 0 256 256`}
          />
          {!text.current ? (
            <TextField
              sx={{ marginTop: "30px", borderColor: "black" }}
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          ) : (
            <TextField
              sx={{ marginTop: "30px", borderColor: "black" }}
              value={text.text}
              onChange={(e) => setText({ ...text, text: e.target.value })}
              onClick={() => setText({ ...text, current: true })}
            />
          )}
          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              marginTop: "20px",
            }}
          >
            {!text.current ? (
              <Button
                sx={{
                  backgroundColor: "#0BDA51",
                  color: "white",
                  width: "150px",
                  "&:hover": {
                    backgroundColor: "#0BDA51",
                  },
                }}
                onClick={() => createNewQr()}
              >
                New Qr
              </Button>
            ) : (
              <Button
                disabled
                sx={{
                  backgroundColor: "#0BDA51",
                  color: "white",
                  width: "150px",
                  "&:hover": {
                    backgroundColor: "#0BDA51",
                  },
                }}
                onClick={() => createNewQr()}
              >
                New Qr
              </Button>
            )}
            {text.current ? (
              <Button
                sx={{
                  backgroundColor: "#4B9CD3",
                  color: "white",
                  width: "150px",
                  "&:hover": {
                    backgroundColor: "#4B9CD3",
                  },
                }}
                onClick={() => updateQr()}
              >
                Update Qr
              </Button>
            ) : (
              <Button
                disabled
                sx={{
                  backgroundColor: "#4B9CD3",
                  color: "white",
                  width: "150px",
                  "&:hover": {
                    backgroundColor: "#0BDA51",
                  },
                }}
              >
                Update Qr
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
