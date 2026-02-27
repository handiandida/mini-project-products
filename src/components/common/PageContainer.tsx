import { Box, Typography } from "@mui/material";

interface Props {
  title: string;
  children: React.ReactNode;
}

const PageContainer = ({ title, children }: Props) => {
  return (
    <Box>
      <Typography variant="h5" mb={2}>
        {title}
      </Typography>
      {children}
    </Box>
  );
};

export default PageContainer;
