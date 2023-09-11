import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import AppBar from "@mui/material/AppBar";
import { QrContext } from "../context/QrContext";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function SideDrawer() {
  const theme = useTheme();
  const navigation = useNavigate();
  const [open, setOpen] = React.useState(false);
  const { text, setText } = React.useContext(QrContext);
  const [allText, setAllTexts] = React.useState([]);
  const refresh = () => {
    window.location.reload();
  };

  const getQr = async () => {
    try {
      const userId = JSON.parse(localStorage.getItem("user"));
      const request = await fetch(
        `https://qrgen-backend.onrender.com/api/v1/qr/${userId}`
      );
      const response = await request.json();

      console.log(response);
      setAllTexts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(allText);

  const deleteQr = async (id) => {
    try {
      const req = await fetch(
        "https://qrgen-backend.onrender.com/api/v1/qr/" + id,
        {
          method: "DELETE",
        }
      );

      const response = await req.json();
      refresh();
      console.log(response);
    } catch (error) {
      console.log(error.message);
    }
  };

  const logoutHandler = () => {
    localStorage.removeItem("user");
    navigation("/login");
  };

  React.useEffect(() => {
    getQr();
  }, []);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        sx={{ backgroundColor: "white", color: "black", boxShadow: "none" }}
        position="fixed"
        open={open}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            QR Generator App
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <List>
          <Typography>History</Typography>

          {allText.map((el, index) => (
            <ListItem
              key={index}
              disablePadding
              secondaryAction={
                <IconButton
                  edge="end"
                  aria-label="comments"
                  onClick={() => deleteQr(el._id)}
                >
                  <DeleteIcon sx={{ color: "red" }} />
                </IconButton>
              }
            >
              <ListItemButton
                onClick={() =>
                  setText({
                    ...text,
                    text: el.text,
                    _id: el._id,
                    current: true,
                  })
                }
              >
                <ListItemText primary={el.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={() => logoutHandler()}>
              <ListItemText primary={"Logout"} />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
}
