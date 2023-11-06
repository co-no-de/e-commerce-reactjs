import classes from "./Order.module.css";
import { useState } from "react";

const Order = ({ order }) => {
  const date = new Date(order.date.toDate());
  const [orderShown, setOrderShow] = useState(false);

  return (
    <div className={`${classes.container}`}>
      <div className={`${classes.innerContainer}`}>
        <div>
          <p className="defaultText">Order date: {date.toDateString()}</p>
          <p className="defaultText">Ordernumber: {order.orderNumber}</p>
        </div>
        <div
          className={`${classes.toggle}`}
          onClick={() => setOrderShow(!orderShown)}
        >
          {orderShown ? (
            <p className="defaultText" style={{ textDecoration: "underline" }}>
              Hide order items -
            </p>
          ) : (
            <p className="defaultText" style={{ textDecoration: "underline" }}>
              View order items +
            </p>
          )}
        </div>
      </div>
      {orderShown && (
        <div>
          <div>
            <p className="defaultText">Order items:</p>
            {order.OrderedItems.map(product => (
              <div key={product.id} className={`${classes.productContainer}`}>
                <span className="defaultText">{product.quantity}x</span>
                <div>
                  <img src={product.image} />
                </div>
                <div>
                  <p className="defaultText">{product.title}</p>
                  <p className="defaultText">${product.price}</p>
                </div>
              </div>
            ))}
          </div>

          <div>
            <p className="defaultText">Shipping details:</p>

            <div>
              <p className="defaultText">
                {order.userDetails.firstName} {order.userDetails.lastName}
              </p>
            </div>

            <div>
              <p className="defaultText">{order.shippingAddress.street} </p>
              <p className="defaultText">{order.shippingAddress.houseNo}</p>
            </div>

            <div>
              <p className="defaultText">{order.shippingAddress.zipCode} </p>
              <p className="defaultText">{order.shippingAddress.city}</p>
            </div>

            <p className="defaultText">{order.shippingAddress.country}</p>
          </div>
        </div>
      )}

      <div>
        <p className="defaultText">Total order price: </p>
        <p className="defaultText">${order.totalPrice.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default Order;
