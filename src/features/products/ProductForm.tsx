import { useEffect, useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import {
  addProduct,
  updateProduct,
  getProductById,
} from "../../services/productService";
import { useProductStore } from "../../store/productStore";
import type { Product } from "../../types/product.types";

const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addProductLocal, updateProductLocal } = useProductStore();

  const isEdit = Boolean(id);

  const [form, setForm] = useState<Partial<Product>>({
    title: "",
    price: 0,
    description: "",
  });

  useEffect(() => {
    if (isEdit) {
      getProductById(Number(id)).then((res) => setForm(res.data));
    }
  }, [id, isEdit]);

  const handleSubmit = async () => {
    if (!form.title?.trim()) return;

    if (isEdit) {
      await updateProduct(Number(id), form.title);

      updateProductLocal({
        id: Number(id),
        title: form.title,
      } as Product);
    } else {
      const res = await addProduct({
        title: form.title,
        price: form.price,
        description: form.description,
      });

      addProductLocal({
        ...res.data,
        id: Date.now(),
      });
    }

    navigate("/products");
  };

  return (
    <Box maxWidth={500}>
      <TextField
        fullWidth
        label="Title"
        margin="normal"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />

      {!isEdit && (
        <>
          <TextField
            fullWidth
            label="Price"
            type="number"
            margin="normal"
            value={form.price}
            onChange={(e) =>
              setForm({
                ...form,
                price: Number(e.target.value),
              })
            }
          />

          <TextField
            fullWidth
            label="Description"
            margin="normal"
            multiline
            rows={3}
            value={form.description}
            onChange={(e) =>
              setForm({
                ...form,
                description: e.target.value,
              })
            }
          />
        </>
      )}

      <Button variant="contained" onClick={handleSubmit}>
        {isEdit ? "Update Title" : "Add Product"}
      </Button>
    </Box>
  );
};

export default ProductForm;
