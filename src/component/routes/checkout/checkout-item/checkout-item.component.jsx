import { useContext } from 'react';
import { CartContext } from '../../../../contexts/cart.context';

import './checkout-item.styles.scss';



const CheckoutItem = ({cartItem}) => {
    const {clearItem2Cart , addItem2Cart, removeItem2Cart} = useContext(CartContext);

    const clearItemFromCart = () => {
        clearItem2Cart(cartItem);
    }

    const addItemToCart = () => {
        addItem2Cart(cartItem);
    }

    const removeItemToCart = () => {
        removeItem2Cart(cartItem);
    }

    return (
        <div className='checkout-item-container'>
            <div className='image-container'>
                <img alt={cartItem.name} src={cartItem.imageUrl} />
            </div>
            <div className='name'>{cartItem.name}</div>
            <div className='quantity'>
                <span className='arrow' onClick={removeItemToCart}>&#10094;</span>
                <span className='value'>{cartItem.quantity}</span>
                <span className='arrow' onClick={addItemToCart}>&#10095;</span>
            </div>
            <div className='price'>{cartItem.price}</div>
            <div className="remove-button" onClick={clearItemFromCart}>&#10005;</div>
        </div>
    );
}

export default CheckoutItem;