import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
} from "@mui/material";
import { getProductById } from "../../services/productService";
import type { Product } from "../../types/product.types";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product>();

  useEffect(() => {
    if (id) {
      getProductById(Number(id)).then((res) => setProduct(res.data));
    }
  }, [id]);

  if (!product) return <Typography>Loading...</Typography>;

  return (
    <>
      <Button
        variant="contained"
        onClick={() => window.history.back()}
        style={{ marginBottom: "16px" }}
      >
        Back to Products
      </Button>
      <Card>
        <CardMedia component="img" height="300" image={product.thumbnail} />
        <CardContent>
          <Typography variant="h5">{product.title}</Typography>
          <Typography>Price: ${product.price}</Typography>
          <Typography>{product.description}</Typography>
        </CardContent>
      </Card>
    </>
  );
};

export default ProductDetail;
