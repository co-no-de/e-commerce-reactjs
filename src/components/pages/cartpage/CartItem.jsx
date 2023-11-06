import {
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from "../../../redux/CartReducer";
import classes from "./CartItem.module.css";
import { useNavigate } from "react-router-dom";
import { AiOutlineMinus, AiOutlinePlus} from 'react-icons/ai'
import { useDispatch } from "react-redux";
import { RiDeleteBin6Line } from 'react-icons/ri'

const CartItem = ({ product }) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const increaseQuantity = item => {
    dispatch(incrementQuantity(item));
  };
  const decreaseQuantity = item => {
    dispatch(decrementQuantity(item));
  };
  const deleteproduct = item => {
    dispatch(removeFromCart(item));
  };

  return (
    <div className={`${classes.container}`}>
      <div className={`${classes.innerLeftContainer}`}>
        
        <div className={`${classes.imageContainer}`} onClick={() => navigate("/products/" + product.titleSlug)}>
          <img src={product.image} alt="" />
        </div>
      
        <div className={`${classes.textContainer}`}>
          <p className="defaultText">{product.title}</p>
          <p className={`${classes.price} `}>${product.price}</p>
        </div>
      </div>

      <div className={`${classes.innerRightContainer}`}>
        {product.quantity > 1 ? (
          <div className={`${classes.minus}`} onClick={() => decreaseQuantity(product)}><AiOutlineMinus /></div>
        ) : (
          <div className={`${classes.minus}`}
            onClick={() => deleteproduct(product)}           
          >
            <RiDeleteBin6Line />
          </div>
        )}

        <div>
          <p className={`${classes.quantity}`}>{product.quantity}</p>
        </div>

        <div className={`${classes.plus}`} onClick={() => increaseQuantity(product)}><AiOutlinePlus /></div>
      
      </div>
    </div>
  );
};

export default CartItem;



// className={`classes.container`}