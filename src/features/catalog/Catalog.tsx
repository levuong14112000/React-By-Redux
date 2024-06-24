import { useEffect, useState } from "react";
import { Product } from "../../model/product";
import ProductList from "./ProductList";
import axios, { AxiosResponse } from "axios";
import { fetchProductThunk, productAdapter } from "./catalogSlice";
import { store } from "../../store";
import { useSelector } from "react-redux";
import { stat } from "fs";
import LoadingComponent from "../../interceptor/LoadingComponent";


export default function Catalog() { /// properties
    const products = productAdapter.getSelectors().selectAll(store.getState().catalog);
    const {productLoad ,status} = useSelector((state : any) => state.catalog)
    useEffect(() => {
        if (!productLoad) {
            store.dispatch(fetchProductThunk());
        }
      }, [productLoad]);
      if (status.includes('loading')) {
        return <LoadingComponent/>
      }
    return (
        <ProductList products={products} />
    );
}