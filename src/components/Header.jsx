import classes from "./Header.module.css";
import logo from "../assets/images/logo.jpg";
import { BsFillPersonFill } from "react-icons/bs";
import { HiOutlineShoppingCart, HiShoppingCart } from "react-icons/hi";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCartFromStorage } from "../redux/CartReducer";

const Header = () => {

  const [isMenuOPen, setIsMenuOpen] = useState(false);

  const cart = useSelector(state => state.cart.cart);

const dispatch = useDispatch();


  const totalItems = cart
    ?.map(item => item.quantity)
    .reduce((curr, prev) => curr + prev, 0);




    useEffect(() => {

      const cartInSotrage = localStorage.getItem("cart");

      if(cartInSotrage) {
        const parsedCart = JSON.parse(cartInSotrage);
        dispatch(getCartFromStorage(parsedCart))
      }      
    }, [])

console.log(cart)

  return (
    <header className={`${classes.container}`}>
 
      <div className={`${classes.innerContainer}`}>
        <div className={`${classes.logo}`}>
        <Link to="/"> <img src={logo} alt="E-LECTRONICS logo" /></Link>
        </div>
        <nav className={`${classes.navbar} ${isMenuOPen && classes.open}`}>
          <ul>
            <li>
             <NavLink to="/" className={`${classes.link}`}>
                <span>Home</span>
              </NavLink>
            </li>          
          </ul>
        </nav>

        <div className={`${classes.iconsContainer}`}>
        <div className={`${classes.cartContainer}`}>
         <Link to="/cart" className={`${classes.whiteText}`}>
            {totalItems > 0 ? (
            <HiShoppingCart size={32}  />) : (<HiOutlineShoppingCart size={32} />)}
          </Link>
          {totalItems > 0 && <span className={`${classes.items}`}>{totalItems}</span>}
        </div>

        <div className={`${classes.profileContainer}`}>
         <Link to="/account" className={`${classes.whiteText}`}>
            <BsFillPersonFill size={24} />
          </Link>
        </div>

        <div className={`${classes.hamburgerContainer}`}>
          <GiHamburgerMenu size={24} color="white" onClick={() => setIsMenuOpen(!isMenuOPen)} />
        </div>
        </div>

       
      </div>
    </header>
  );
};

export default Header;