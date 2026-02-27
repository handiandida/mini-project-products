import { Box, CircularProgress } from "@mui/material";

interface LoadingProps {
  fullScreen?: boolean;
  height?: number | string;
  size?: number;
}

const Loading = ({
  fullScreen = false,
  height = 200,
  size = 40,
}: LoadingProps) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height={fullScreen ? "100vh" : height}
      width="100%"
    >
      <CircularProgress size={size} />
    </Box>
  );
};

export default Loading;
