
import { Link } from 'react-router-dom';
import ProductCard from '../../../product-card/product-card.component';
import './product-catalog.styles.scss';

const ProductCatalog = ({catagoryName, products, productDisplayCount}) => {
    if(productDisplayCount){
        products = products.filter((_, index) => {
            return index < 4;
        });
    }
    
    return (
        <div className="product-catalog">
            <div className='category'>
                <Link to={`${catagoryName}`}><h2>{catagoryName}</h2></Link> 
            </div>
            <div className='product-container'>
                {products &&
                    products.map((product) => {
                        return <ProductCard product={product} key={product.id} />
                    }) 
                }
            </div>
        </div>
    )
}

export default ProductCatalog;