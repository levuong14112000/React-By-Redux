import { useContext, useState } from "react";
import { Box, Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { AddCircle, Delete, RemoveCircle } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import axios, { AxiosResponse } from "axios";
import { StoreContext } from "../context/StoreContext";
import BasketSummary from "./BasketSumary";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { store } from "../../store";
import { addBasketItemThunk, removeBasketItemThunk, removeItemReducer, setBasketReducer } from "./basketSlice";
import { BasketItem } from "../../model/basket";


export default function BasketPage() {
    const {basket,status} = useSelector((state:any) => state.basket)
    // const [status, setStatus] = useState({
    //     loading: false,
    //     name: ''
    // });


    // const handleAddItem = (productId: number, name: string) => {
    //     setStatus({loading: true, name: name});
    //     axios.post(`baskets?productId=${productId}&quantity=1`, {})
    //         .then((response: AxiosResponse) => store.dispatch(setBasketReducer(response.data)))
    //         .catch(err => console.log(err))
    //         .finally(() => setStatus({loading: false, name: name}));
    // }

    // const handleRemoveItem = (productId: number, quantity: number, name: string) => {
    //     setStatus({loading: true, name: name});
    //     axios.delete(`baskets?productId=${productId}&quantity=${quantity}`)
    //         .then(_ => store.dispatch(removeItemReducer({productId:productId,quantity:quantity})))
    //         .catch(err => console.log(err))
    //         .finally(() => setStatus({loading: false, name: name}));
    // }

    if (!basket)
        return <Typography variant="h3">Basket is empty</Typography>

    return (
    <>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }}>
                <TableHead>
                    <TableRow>
                        <TableCell>Product</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell align="center" width={200}>Quantity</TableCell>
                        <TableCell>Subtotal</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {basket?.basketItems.map((item : BasketItem) => (
                        <TableRow key={item.productId}>
                            <TableCell>
                                <Box display='flex' alignItems='center'>
                                    <img 
                                        src={`${process.env.REACT_APP_BASE_URL}file/image/${item.imageUrl}`} 
                                        alt=""
                                        style={{height: 50, marginRight: 20}}/>
                                    <span>{item.name}</span>
                                </Box>
                            </TableCell>
                            <TableCell>${(item.unitPrice).toFixed(2)}</TableCell>
                            <TableCell align="center"  width={200}>
                                <LoadingButton 
                                    color="error"
                                    loading={status  === 'loadingRemoveItem' + item.productId + 'remove'}
                                    onClick={() => store.dispatch(removeBasketItemThunk({productId : item.productId, quantity : 1 , name : 'remove'}))}
                                >
                                    <RemoveCircle />
                                </LoadingButton>
                                {item.quantity}
                                <LoadingButton 
                                    color="secondary"
                                    loading={status === 'loadingAddItem' + item.productId}
                                    onClick={() => store.dispatch(addBasketItemThunk({productId : item.productId , quantity : 1 }))}
                                >
                                    <AddCircle />
                                </LoadingButton>
                            
                            </TableCell>
                            <TableCell>${(item.unitPrice*item.quantity).toFixed(2)}</TableCell>
                            <TableCell>
                                <LoadingButton 
                                    color="error"
                                    loading={status === 'loadingRemoveItem' + item.productId + 'delete'} 
                                    onClick={() => store.dispatch(removeBasketItemThunk({productId:item.productId , quantity : item.quantity , name : 'delete'}))} 
                                >
                                    <Delete />
                                </LoadingButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>

        <Grid container>
            <Grid item xs={6}></Grid>
            <Grid item xs={6}>
                <BasketSummary />  
                <Button
                component={Link}
                to='/checkout'
                variant="outlined"
                size="large"
                fullWidth
                >Checkout</Button>

            </Grid>
        </Grid>
    </>
    );
}