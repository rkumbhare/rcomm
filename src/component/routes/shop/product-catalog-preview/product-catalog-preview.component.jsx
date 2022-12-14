import { ProductContext } from '../../../../contexts/products.context';
import { useContext } from 'react';
import ProductCard from '../../../product-card/product-card.component';
import ProductCatalog from '../product-catalog/product-catalog.component';

import './product-catalog-preview.styles.scss';

const ProductCatalogPreview = () => {
    const {products, categories} = useContext(ProductContext);

    return (
        <div className='products-catalog-container'>
        {
            Object.keys(categories).map((category) => {
                return <ProductCatalog catagoryName={category} products={categories[category]} productDisplayCount="4" keys={category}/>
            })
        }
        </div>
    );
}

export default ProductCatalogPreview;