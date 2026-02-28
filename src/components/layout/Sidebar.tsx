import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
  Box,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";

const drawerWidth = 240;

const Sidebar = () => {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <Toolbar>
        <Typography variant="h6">Dashboard</Typography>
      </Toolbar>

      <Box sx={{ overflow: "auto" }}>
        <List>
          <ListItemButton onClick={() => navigate("/")}>
            <ListItemText primary="Home" />
          </ListItemButton>

          <ListItemButton onClick={() => navigate("/products")}>
            <ListItemText primary="Products" />
          </ListItemButton>

          <ListItemButton
            onClick={() => {
              logout();
              navigate("/login", { replace: true });
            }}
          >
            <ListItemText primary="Logout" />
          </ListItemButton>
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
