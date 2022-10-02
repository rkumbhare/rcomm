import {useParams} from 'react-router-dom';
import { useContext } from 'react';
import { ProductContext } from '../../../../contexts/products.context';

import './category.styles.scss';
import ProductCatalog from '../product-catalog/product-catalog.component';

const Category = () => {
    const {category} = useParams();
    const {categories} = useContext(ProductContext);
    const products = categories[category] ? categories[category] : [];

    return (
        <div className='categor-container'>
            <ProductCatalog catagoryName={category} products={products} keys={category}/>
        </div>
    )
}

export default Category;