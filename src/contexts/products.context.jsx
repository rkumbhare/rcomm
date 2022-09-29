import { createContext, useEffect, useState } from "react";
import PRODUCTS from '../shop-data.json';
import SHOP_DATA from '../shop-data.js';
import { createCollectionAndDocuments, getCategoriesAndDocuments } from "../component/utils/firebase/firebase.utils";

export const ProductContext = createContext({
    products: [],
    setProducts: () => null,
    categories: {},
    setCategories: () => {},
});

export const ProductProvider = ({children}) => {
    const [products, setProducts] = useState(PRODUCTS);
    const [categories, setCategories] = useState({});
    const value = {products, categories};

    useEffect(() => {
        //console.log(SHOP_DATA);
        //createCollectionAndDocuments('categories', SHOP_DATA);
        const getCategories = async () => {
            const categoryMap = await getCategoriesAndDocuments();
            setCategories(categoryMap);
            console.log(categories);
        }

        getCategories();
    }, []);

    return (<ProductContext.Provider value={value}>{children}</ProductContext.Provider>)
}