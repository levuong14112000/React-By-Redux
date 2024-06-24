import { Grid } from "@mui/material";
import { Product } from "../../model/product";
import ProductCard from "./ProductCard";


interface Props {
    products: Product[];
}

export default function ProductList(props: Props) {
    return (
        <Grid container spacing={4} p={10}>
            {props.products.map((product) => (
                <Grid item key={product.id} lg={3} md={4} sm={6} xs={12}>
                    <ProductCard product={product} />
                </Grid>
            ))}
        </Grid>
    );
}