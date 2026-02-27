import { Box } from "@mui/material";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#f4f6f8" }}>
      <Sidebar />

      <Box sx={{ flexGrow: 1 }}>
        <Navbar />
        <Box sx={{ p: 4 }}>{children}</Box>
      </Box>
    </Box>
  );
};

export default MainLayout;
