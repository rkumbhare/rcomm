import { Fragment, useContext } from "react";
import {Link, Outlet} from 'react-router-dom';
import {ReactComponent as CRWNLogo} from '../../../assets/crown.svg';
import { signOutUser } from "../../utils/firebase/firebase.utils";
import { UserContext } from "../../../contexts/user.context";
import { CartContext } from "../../../contexts/cart.context";

import CartDropDown from "../../cart-dropdown/cart-dropdown.component";
import CartIcon from "../../cart-icon/cart-icon.component";



import './navigation.styles.scss';

const Navigation = () => {
    const {currentUser} = useContext(UserContext);
    const {isCartOpen} = useContext(CartContext);

    const signOutHandler = async (event) => {
       try {
            await signOutUser();
       } catch (error) {
        
       }
    }

    return (
        <Fragment>
            <div className="navigation">
                <Link className="logo-container" to='/'>
                    <CRWNLogo className="logo"></CRWNLogo>
                </Link>
                <div className="nav-links-container">
                    <Link className="nav-link" to='/shop'>
                        Shop
                    </Link>
                    {
                        currentUser ? 
                        <span className="nav-link" onClick={signOutHandler}>SignOut</span> :
                        <Link className="nav-link" to='/auth'>
                            Sign-In
                        </Link>
                    }
                    <CartIcon />
                </div>
                {isCartOpen && <CartDropDown />}
            </div>
            <Outlet></Outlet>
        </Fragment>
    );
}

export default Navigation;