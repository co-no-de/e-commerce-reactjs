import classes from "./ProductsPage.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../../firebase";
import { storeProducts } from "../../../redux/ProductsReducer";
import { Link, useParams } from "react-router-dom";
import loadingGif from '../../../assets/images/loading.gif'

const ProductsPage = () => {
  const [pageProducts, setPageProducts] = useState([]);
  const [shownProducts, setShownProducts] = useState([]);
  const dispatch = useDispatch();

  const products = useSelector(state => state.products.products);

  const { slug } = useParams();

  function makeTitle(slug) {
    var words = slug.split("-");

    for (let i = 0; i < words.length; i++) {
      let word = words[i];
      words[i] = word.charAt(0).toUpperCase() + word.slice(1);
    }

    return words.join(" ");
  }

  let title = makeTitle(slug);

  useEffect(() => {
    async function getFrontPageProducts() {
      if (products.length === 0) {
        const productsRef = collection(db, "products");

        const querySnapshot = await getDocs(
          query(productsRef, where("catSlug", "==", slug))
        );

        let productsArray = [];
        querySnapshot.forEach(doc => {
          let {
            description,
            discountPrice,
            image,
            price,
            sale,
            title,
            id,
            category,
            sortDate,
            titleSlug,
            catSlug,
          } = doc.data();

          if (!discountPrice) {
            discountPrice = 0;
          }

          const product = {
            id,
            description,
            discountPrice,
            image,
            price,
            sale,
            title,
            category,
            sortDate,
            titleSlug,
            catSlug,
          };

          productsArray.push(product);
        });

        dispatch(storeProducts(productsArray));
        setPageProducts(productsArray);
        setShownProducts(productsArray);
      } else {
        let tempArray = products.filter(product => product.catSlug === slug);
        setShownProducts(tempArray);
        setPageProducts(tempArray);
      }
    }

    getFrontPageProducts();
  }, []);

  const options = ["Price low to high", "Price high to low"];
  const onOptionChangeHandler = event => {
    
    let toBeSortedFiltered = [...pageProducts];

    switch (event.target.value) {
      case "Price low to high":
        toBeSortedFiltered.sort((a, b) => {
          const valA = a.sale ? a.discountPrice : a.price;
          const valB = b.sale ? b.discountPrice : b.price;

          if (valA < valB) {
            return -1;
          }

          if (valA > valB) {
            return 1;
          }

          return 0;
        });

        break;
      case "Price high to low":
        toBeSortedFiltered.sort((a, b) => {
          const valA = a.sale ? a.discountPrice : a.price;
          const valB = b.sale ? b.discountPrice : b.price;

          if (valA > valB) {
            return -1;
          }

          if (valA < valB) {
            return 1;
          }

          return 0;
        });

        break;
    }

    setShownProducts(toBeSortedFiltered);
  };

  return (




    <>
      {shownProducts ? (    <main className={`${classes.container}`}>
      <div className={`${classes.innerContainer}`}>
        <h1 className="heading">{title}</h1>
        <div className={`${classes.filterssContainer}`}>
          <select onChange={onOptionChangeHandler}>
            <option>Sorting</option>
            {options.map((option, index) => {
              return <option key={index}>{option}</option>;
            })}
          </select>
        </div>
        <div className={`${classes.productsContainer}`}>
          {shownProducts && (  
            shownProducts.map(product => (
              <Link key={product.id} to={product.titleSlug}>
                <div className={`${classes.productCard}`}>
                  <div className={`${classes.titleContainer}`}>
                    <h2 className="subHeading">{product.title}</h2>
                  </div>
                  <img src={product.image} alt={product.title} />
                  <div className={`${classes.priceContainer}`}>
                    {product.sale ? (
                      <div className={`${classes.saleContainer}`}>
                        <span className="subHeading">${product.price}</span>
                        <span className="subHeading">
                          ${product.discountPrice}
                        </span>
                      </div>
                    ) : (
                      <p className="subHeading">${product.price}</p>
                    )}
                  </div>
                </div>
              </Link>
            ))            
          )}
        </div>
      </div>
    </main>) : (
    <main className={`${classes.loadingContainer}`}>
             <img src={loadingGif} alt="Loading gif" />
           </main>)}





    </>



  );
};

export default ProductsPage;
