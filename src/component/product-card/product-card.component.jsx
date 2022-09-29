
import Button from '../button/button.component';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';

import './product-card.styles.scss';

const ProductCard = ({product}) => {
    const {name, price, imageUrl} = product;
    const {cartItems, addItem2Cart} = useContext(CartContext);

    const add2Cart = (event) => {
        addItem2Cart(product);
    }

    return (
        <div className='product-card-container'>
            <img alt={name} src={imageUrl} />
            <div className='footer'>
                <div className='name'>{name}</div>
                <div className='price'>{price}</div>
            </div>
            <Button label="Add to Cart" buttonType="inverted" onClick={add2Cart} />
        </div>
    )
}

export default ProductCard;