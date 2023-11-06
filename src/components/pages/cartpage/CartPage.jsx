import classes from "./CartPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "./CartItem";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../../../../firebase";
import { emptyCart } from "../../../redux/CartReducer";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const cart = useSelector(state => state.cart.cart);
  let userID = localStorage.getItem("user")

  const navigate = useNavigate();

  const total = cart
    ?.map(item => item.price * item.quantity)
    .reduce((curr, prev) => curr + prev, 0);
  const dispatch = useDispatch();

  async function placeOrder() {
    try {
      //Get user details

      const userDocRef = doc(db, "user-profiles", userID);
      const docSnap = await getDoc(userDocRef);

      const {
        city,
        country,
        email,
        firstName,
        houseNo,
        lastName,
        street,
        telephone,
        zipCode,
      } = docSnap.data();

      // let { orders } = docSnap.data();
      let { numOfOrders } = docSnap.data();

      const userDetails = {
        firstName,
        lastName,
        telephone,
        email,
      };

      const shippingAddress = {
        street,
        houseNo,
        zipCode,
        city,
        country,
      };

      const orderNumber = new Date().getTime();

      const orderData = {
        OrderedItems: cart,
        totalPrice: total,
        shippingAddress,
        userDetails,
        date: new Date(),
        orderNumber,
        userId: userID
      };

      const newOrderRef = doc(collection(db, "orders"));

      await setDoc(newOrderRef, orderData);

      numOfOrders = numOfOrders + 1;

      await setDoc(userDocRef, { numOfOrders }, { merge: true });

      dispatch(emptyCart());

      alert(
        "Order placed succesfully, you can view your orders in your profile",
        
      );
    } catch (error) {
      console.log("error placing order on CartScreen", error);
    }
  }

  return (
    <main className={`${classes.container}`}>
      <div className={`${classes.innerContainer}`}>
        {total != 0 ? (
          <h1 className="heading">Your cart items</h1>
        ) : (
          <h1 className="heading">Your cart is currently empty</h1>
        )}
        <div>
          <div>
            {cart?.map((product, index) => (
              <CartItem product={product} key={index} />
            ))}
          </div>
        </div>

        {total != 0 && userID && (
          <>
            <div className={`${classes.rowContainer}`}>
              <p className="subHeading">Total : </p>
              <p className="subHeading">${total.toFixed(2)}</p>
            </div>
            <div>
              <div onClick={placeOrder}>
              <span className={`${classes.placeOrderBtn}`}>Place order</span>
              </div>
            </div>
          </>
        )}

        {!userID && total != 0 && (
          <>
            <div className={`${classes.rowContainer}`}>
              <p className="subHeading">Total : </p>
              <p className="subHeading">${total.toFixed(2)}</p>
            </div>
            <div>
              <div onClick={() => navigate("/login")}>
                <span className={`${classes.goToLogInBtn}`}>Log in to place your order</span>
              </div>
            </div>
          </>
        )}

   
      </div>
    </main>
  );
};

export default CartPage;
