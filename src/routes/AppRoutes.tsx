import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import Login from "../features/auth/Login";
import MainLayout from "../components/layout/MainLayout";
import ProtectedRoute from "./ProtectedRoute";
import ProductList from "../features/products/ProductList";
import ProductDetail from "../features/products/ProductDetail";
import ProductForm from "../features/products/ProductForm";
import { Typography } from "@mui/material";

const Dashboard = () => {
  const user = useAuthStore((state) => state.user);

  return (
    <Typography variant="h5">
      Welcome user : {user?.firstName} {user?.lastName}
    </Typography>
  );
};

const AppRoutes = () => {
  const token = useAuthStore((state) => state.token);

  return (
    <Routes>
      <Route
        path="/login"
        element={token ? <Navigate to="/" replace /> : <Login />}
      />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Dashboard />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/products"
        element={
          <ProtectedRoute>
            <MainLayout>
              <ProductList />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/products/:id"
        element={
          <ProtectedRoute>
            <MainLayout>
              <ProductDetail />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/products/add"
        element={
          <ProtectedRoute>
            <MainLayout>
              <ProductForm />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/products/edit/:id"
        element={
          <ProtectedRoute>
            <MainLayout>
              <ProductForm />
            </MainLayout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
