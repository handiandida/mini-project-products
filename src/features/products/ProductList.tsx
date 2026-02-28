import { useEffect, useState } from "react";
import { Button, TextField, Box, CircularProgress, Chip } from "@mui/material";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { getProducts, deleteProduct } from "../../services/productService";
import { useProductStore } from "../../store/productStore";
import ConfirmDialog from "../../components/common/ConfirmationDialog";

const ProductList = () => {
  const navigate = useNavigate();
  const { products, setProducts, deleteProductLocal } = useProductStore();

  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const [openConfirm, setOpenConfirm] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  useEffect(() => {
    if (products.length !== 0) return;

    let isMounted = true;

    const loadData = async () => {
      try {
        setLoading(true);
        const res = await getProducts();
        if (isMounted) {
          setProducts(res.data.products);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, [products.length, setProducts]);

  const handleSearch = async () => {
    try {
      setLoading(true);
      const res = await getProducts(search);
      setProducts(res.data.products);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!selectedId) return;

    try {
      setDeletingId(selectedId);
      await deleteProduct(selectedId);
      deleteProductLocal(selectedId);
    } finally {
      setDeletingId(null);
      setOpenConfirm(false);
      setSelectedId(null);
    }
  };

  const columns: GridColDef[] = [
    { field: "title", headerName: "Title", flex: 1 },
    { field: "price", headerName: "Price", width: 120 },
    {
      field: "action",
      headerName: "Action",
      width: 350,
      sortable: false,
      renderCell: (params) => {
        const id = params.row.id;
        const isServerProduct = id <= 194;
        const canEdit = id === 1;

        return (
          <Box display="flex" gap={1} marginTop={2}>
            <Chip
              label="Detail"
              color="primary"
              size="small"
              clickable
              disabled={!isServerProduct || loading}
              onClick={() => navigate(`/products/${id}`)}
            />

            <Chip
              label="Edit"
              color="warning"
              size="small"
              clickable
              disabled={!canEdit || loading}
              onClick={() => navigate(`/products/edit/${id}`)}
            />

            <Chip
              label={
                deletingId === id ? (
                  <CircularProgress size={14} color="inherit" />
                ) : (
                  "Delete"
                )
              }
              color="error"
              size="small"
              clickable
              disabled={!isServerProduct || deletingId === id}
              onClick={() => {
                setSelectedId(id);
                setOpenConfirm(true);
              }}
            />
          </Box>
        );
      },
    },
  ];

  return (
    <Box>
      <Box display="flex" gap={2} mb={2}>
        <TextField
          label="Search"
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Button
          variant="outlined"
          onClick={handleSearch}
          disabled={loading}
          startIcon={loading ? <CircularProgress size={16} /> : null}
        >
          Search
        </Button>

        <Button
          variant="contained"
          disabled={loading}
          onClick={() => navigate("/products/add")}
        >
          Add Product
        </Button>
      </Box>

      <Box height={500} position="relative">
        <DataGrid
          rows={products}
          columns={columns}
          getRowId={(row) => row.id}
        />

        {loading && (
          <Box
            position="absolute"
            top={0}
            left={0}
            width="100%"
            height="100%"
            display="flex"
            justifyContent="center"
            alignItems="center"
            bgcolor="rgba(255,255,255,0.6)"
            zIndex={10}
          >
            <CircularProgress />
          </Box>
        )}
      </Box>

      <ConfirmDialog
        open={openConfirm}
        onClose={() => {
          setOpenConfirm(false);
          setSelectedId(null);
        }}
        onConfirm={handleConfirmDelete}
        loading={deletingId !== null}
      />
    </Box>
  );
};

export default ProductList;
