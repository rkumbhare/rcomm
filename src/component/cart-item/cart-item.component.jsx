
import './cart-item.styles.scss';

const CartItem = ({item}) => {
    return (
        <div className="cart-item-container" key={item.id}>
            <img alt={item.name} src={item.imageUrl} />
            <div className="item-details">
                <div className="name">{item.name}</div>
                <div className="price">{item.quantity} x ${item.price}</div>
            </div>
        </div>
    );
}

export default CartItem;