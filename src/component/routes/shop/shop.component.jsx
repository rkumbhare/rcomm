import {Routes, Route} from 'react-router-dom';
import Category from './category/category.component';
import ProductCatalogPreview from './product-catalog-preview/product-catalog-preview.component';

import './shop.styles.scss';


const Shop = () => {
    return (
        <Routes>
            <Route index element={<ProductCatalogPreview />} />
            <Route path=":category" element={<Category />} />
        </Routes>
    )
}

export default Shop;