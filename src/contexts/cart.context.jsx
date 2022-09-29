import { Children, createContext, useEffect, useState } from "react";

const addCartItem = (cartItems, newCartItem) => {
    if (!newCartItem) return cartItems;

    //check  if item exist in the list
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === newCartItem.id);

    //if exist then update the quantity
    if(existingCartItem){
       return  cartItems.map((cartItem) => {
            if(cartItem.id === newCartItem.id){
                cartItem.quantity = cartItem.quantity + 1;
            }
            return cartItem;
       });
    }

    // otherwise add item to list & return update cartITems
    newCartItem.quantity = 1;
    cartItems.push(newCartItem);
    return cartItems;
}

const removeCartItem = (cartItems, cartItemToRemove) => {
    if (!cartItemToRemove) return cartItems;

    //check  if item exist in the Cart
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === cartItemToRemove.id);

    // if item exist and its quantity is 1 then clear the item from cart
    // otherwise update cart item with quantity by -1
    if(existingCartItem){
        if(existingCartItem.quantity == 1){
            return clearCartItem(cartItems, cartItemToRemove);
        }else{
            return  cartItems.map((cartItem) => {
                if(cartItem.id === cartItemToRemove.id){
                    cartItem.quantity = cartItem.quantity - 1;
                }
                return cartItem;
           });
        }
    }
}

const clearCartItem = (cartItems, cartItemToClear) => {
    // check if item exist in the cart
    const existingCartItem = cartItems.find((item) => item.id === cartItemToClear.id);

    //clear it from the cart
    if(existingCartItem)
        return cartItems.filter((item) => item.id !== cartItemToClear.id);
    return cartItems;
}

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItem2Cart: () => {},
    clearItem2Cart: () => {},
    removeItem2Cart: () => {},
    cartCount: 0,
    cartTotal:0,
});


export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);

    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
        setCartCount(newCartCount);
    }, [cartItems]);

    useEffect(() => {
        const newCartTotal = cartItems.reduce((total, cartItem) => total + (cartItem.quantity * cartItem.price), 0);
        setCartTotal(newCartTotal);
    }, [cartItems]);

    const addItem2Cart = (newCartItem) => {
        setCartItems(addCartItem(cartItems, newCartItem));
    }

    const clearItem2Cart = (cartItemToClear) => {
        setCartItems(clearCartItem(cartItems, cartItemToClear));
    }

    const removeItem2Cart = (cartItemToRemove) => {
        setCartItems(removeCartItem(cartItems, cartItemToRemove));
    }

    const value = {isCartOpen, setIsCartOpen, cartItems, addItem2Cart, cartCount, cartTotal, clearItem2Cart, removeItem2Cart};
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}