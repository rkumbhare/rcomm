import Button from "../button/button.component";
import { useContext } from "react";
import {useNavigate} from 'react-router-dom';
import { CartContext } from "../../contexts/cart.context";

import './cart-dropdown.styles.scss';
import CartItem from "../cart-item/cart-item.component";


const CartDropDown = () => {
    const {cartItems, setIsCartOpen} = useContext(CartContext);
    const navigate = useNavigate();

    const goToCheckoutHandler = (event) => {
        navigate('/checkout');
    }

    return (
        <div className="cart-dropdown-container">
            <div className="cart-items">
                {
                    cartItems.map((cartItem) => {
                        return <CartItem item={cartItem} key={cartItem.id} />
                    })
                }
            </div>
            <Button label='Go To Checkout' onClick={goToCheckoutHandler} />
        </div>
    )
}

export default CartDropDown;