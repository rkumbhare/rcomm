
import ProductCard from '../../../product-card/product-card.component';
import './product-catalog.styles.scss';

const ProductCatalog = ({catagoryName, products}) => {
    products = products.filter((_, index) => {
        return index < 4;
    });
    return (
        <div className="product-catalog">
            <div className='category'>
                <h2>{catagoryName}</h2></div>
            <div className='product-container'>
            {
                products.map((product) => {
                    return <ProductCard product={product} key={product.id} />
                }) 
            }
            </div>
        </div>
    )
}

export default ProductCatalog;