import { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import type { LoginPayload, User } from "../../types/auth.types";
import { useAuthStore } from "../../store/authStore";

const Login = () => {
  const [form, setForm] = useState<LoginPayload>({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const loginStore = useAuthStore((state) => state.login);

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const res = await api.post<User>("/auth/login", form);

      loginStore(res.data);

      navigate("/", { replace: true });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={10}>
        <Typography variant="h5">Login</Typography>

        <TextField
          fullWidth
          label="Username"
          margin="normal"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />

        <TextField
          fullWidth
          label="Password"
          type="password"
          margin="normal"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <Button
          fullWidth
          variant="contained"
          onClick={handleSubmit}
          disabled={loading}
          startIcon={
            loading ? <CircularProgress size={18} color="inherit" /> : null
          }
        >
          Login
        </Button>
      </Box>
    </Container>
  );
};

export default Login;
