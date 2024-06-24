export interface BasketItem {
    productId: number;
    name: string;
    unitPrice: number;
    imageUrl: string;
    brand: string;
    category: string;
    quantity: number;
}

export interface Basket {
    id: number;
    buyerId: number;
    basketItems: BasketItem[];
}