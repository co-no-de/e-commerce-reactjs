import classes from "./ProductPage.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../redux/CartReducer";
import { Link, useNavigate, useParams } from "react-router-dom";
import { addVisitedProducts } from "../../../redux/ProductsReducer";
import { query, collection, getDocs, limit, where } from "firebase/firestore";
import { auth, db } from "../../../../firebase";
import loadingGif from "../../../assets/images/loading.gif";

const ProductPage = () => {
  const [product, setProduct] = useState();
  const [loading, setLoading] = useState(false);

  const currentUser = localStorage.getItem("user")

  const { titleSlug } = useParams();
  const navigate = useNavigate();

  const visitedProducts = useSelector(state => state.products.visitedProducts);
  const cart = useSelector(state => state.cart.cart);

  const [addedToCart, setAddedToCart] = useState(false);

  const dispatch = useDispatch();

  function addItemToCart(product) {
    setAddedToCart(true);

    const cartItem = {
      ...product,
      price: product.discountPrice ? product.discountPrice : product.price,
    };

    dispatch(addToCart(cartItem));
  }

  useEffect(() => {
    const isInCart = cart.find(item => item.titleSlug === titleSlug);

    if (isInCart) {
      setAddedToCart(true);
    }
  }, [cart]);

  useEffect(() => {
    async function getProduct() {
      let divedProduct;

      visitedProducts.find(product => {
        if (product.titleSlug === titleSlug) {
          divedProduct = product;
        }
      });

      if (divedProduct) {
        setProduct(divedProduct);
      } else {
        setLoading(true);
        const productsRef = collection(db, "products");

        const snapShot = await getDocs(
          query(productsRef, where("titleSlug", "==", titleSlug), limit(1))
        );

        if (snapShot.docs) {
          const pageProduct = snapShot.docs[0].data();
          setProduct(pageProduct);
          dispatch(addVisitedProducts({ id: titleSlug, product: pageProduct }));
          setLoading(false);
        }
      }
    }

    getProduct();
  }, []);

  return (
    <main className={`${classes.container}`}>
      {product && !loading ? (
        <div className={`${classes.innerContainer}`}>
          <h1 className="heading">{product.title}</h1>
          <div className={`${classes.imageContainer}`}>
            <div className={`${classes.innerImageContainer}`}>
              <img src={product.image} alt="" />
            </div>
          </div>
          <Link to={"/products/category/" + product.catSlug}>
            <p className="defaultText">{product.category}</p>
          </Link>
          <p className="defaultText">{product.description}</p>
          {product.sale ? (
            <div className={`${classes.saleContainer}`}>
              <p>Sale!</p>
              <p className={`${classes.sale}`}>${product.price}</p>

              <div>
                <p className={`${classes.price}`}>
                  ${product.discountPrice.toFixed(2)}
                </p>
              </div>
            </div>
          ) : (
            <p className={`${classes.price}`}>${product.price}</p>
          )}
          <div className={`${classes.btnContainer}`}>
            <div>
              {addedToCart ? (
                <p
                  onClick={() => addItemToCart(product)}
                  className={`${classes.addBtn}`}
                >
                  Add more to Cart
                </p>
              ) : (
                <p
                  onClick={() => addItemToCart(product)}
                  className={`${classes.addBtn}`}
                >
                  Add to Cart
                </p>
              )}
            </div>

            {addedToCart && currentUser && (
              <p
                onClick={() => navigate("/cart")}
                className={`${classes.buyBtn}`}
              >
                Buy Now
              </p>
            )}

            {addedToCart && !currentUser && (
              <p
                onClick={() => navigate("/login")}
                className={`${classes.logInBtn}`}
              >
                Log in to your account to buy
              </p>
            )}
          </div>
        </div>
      ) : (
        <main className={`${classes.loadingContainer}`}>
          <img src={loadingGif} alt="Loading gif" />
        </main>
      )}
    </main>
  );
};

export default ProductPage;
