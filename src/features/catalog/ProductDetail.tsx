import { Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material";
import axios, { AxiosResponse } from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Product } from "../../model/product";
import { LoadingButton } from "@mui/lab";
import { useSelector } from "react-redux";
import { BasketItem } from "../../model/basket";
import { store } from "../../store";
import { addBasketItemThunk, removeBasketItemThunk, removeItemReducer, setBasketReducer } from "../basket/basketSlice";
import { fetchProductByIdThunk, productAdapter } from "./catalogSlice";
import LoadingComponent from "../../interceptor/LoadingComponent";


export default function ProductDetail() {
    let params = useParams();
    const product = productAdapter.getSelectors().selectById(store.getState().catalog, + params.productId!);
    const productStatus = useSelector((state : any) => state.catalog.status);
    // const [product, setProduct] = useState<Product | null>(null);
    const [quantity,setQuantity] = useState(0);
    const {basket,status} = useSelector((state : any) => state.basket);
    const basketItem = basket?.basketItems.find((i : BasketItem) => i.productId === product?.id);
    
    // useEffect(() => {
    //     if (basketItem) {
    //         setQuantity(basketItem?.quantity);
    //     }
      
    //     axios.get(`products/${params.productId}`)
    //         .then(response => setProduct(response.data))
    //         .catch(error => console.log(error));
    // }, [basketItem,params.productId]);

      useEffect(() => {
        if (basketItem) {
            setQuantity(basketItem?.quantity);
        }
        if(!product) {
            store.dispatch(fetchProductByIdThunk(+params.productId!));
        }
        
    }, [basketItem,params.productId,product]);

    const handleInputChange = (event : any) => {
        if (event.target.value >= 0) {
            setQuantity(event.target.value);
        }
    }
    const handleUpdateCard = () => {
      
            if(!basketItem || quantity > basketItem?.quantity){
                const updateQuantity = basketItem ? quantity - basketItem.quantity : quantity;
                store.dispatch(addBasketItemThunk({productId : product!.id , quantity:updateQuantity}))
            }
            else{
                const updateQuantity = basketItem.quantity - quantity;
                store.dispatch(removeBasketItemThunk({productId : product!.id , quantity : updateQuantity}))
            }   
    }
       
    if(productStatus.includes('loading'))
        return <LoadingComponent/>
    if (!product)
        return <h3>Product not found</h3>

    return (
        <Grid container spacing={6}>
            <Grid item xs={4}>
                <img 
                    src={`${process.env.REACT_APP_BASE_URL}file/image/${product?.imageUrl}`}
                    alt={`${product?.name}`}
                />
            </Grid>
            <Grid item xs={8}>
                <Typography variant="h3">{product?.name}</Typography>
                <Divider sx={{mb: 2}} />
                <Typography variant="h4" color='secondary' sx={{mb:4}}>${product?.unitPrice.toFixed(2)}</Typography>
                <Divider sx={{mb: 2}} />
                <TableContainer>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>Description</TableCell>
                                <TableCell>{product?.description}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Type</TableCell>
                                <TableCell>{product?.category}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Author</TableCell>
                                <TableCell>{product?.brand}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Quantity in stock</TableCell>
                                <TableCell>{product?.unitsInStock}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>

                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField variant="outlined"
                            type="number"
                            label="Quantity"
                            fullWidth
                            value={quantity}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={6}>
                    <Link to="/basket" style={{ textDecoration: 'none' }}>
                        <LoadingButton
                        disabled={quantity === basketItem?.quantity || (!basketItem && quantity === 0)}
                        loading={status.includes('loading')}
                        variant="contained"
                        onClick={handleUpdateCard}
                        color="primary"
                        size="large"
                        fullWidth
                        sx={{height : ' 55px'}}
                        >Update quantity
                        </LoadingButton>
                    </Link>
                    </Grid>

                </Grid>
            </Grid>
        </Grid>
    );
}