import { AppBar, Toolbar, Typography, Box, Avatar } from "@mui/material";
import { useAuthStore } from "../../store/authStore";

const Navbar = () => {
  const user = useAuthStore((state) => state.user);

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        bgcolor: "#fff",
        color: "#000",
        borderBottom: "1px solid #eee",
      }}
    >
      <Toolbar>
        <Typography sx={{ flexGrow: 1 }}>Mini Project</Typography>

        <Box display="flex" alignItems="center" gap={2}>
          <Typography>
            {user?.firstName} {user?.lastName}
          </Typography>
          <Avatar>{user?.firstName?.[0]}</Avatar>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
