import CategoryScroll from "./CategoryScroll";
import NewestProducts from "./NewestProducts";
import { useEffect, useState } from "react";
import { db } from "../../../../firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { storeProducts } from "../../../redux/ProductsReducer";
import SaleProducts from "./SaleProducts";
import classes from "./FrontPage.module.css";
import loadingGif from '../../../assets/images/loading.gif'

const FrontPage = () => {
  const [newProductsLoaded, setNewProductsLoaded] = useState(false);
  const [saleProductsLoaded, setSaleProductsLoaded] = useState(false);

  const [newProducts, setNewProducts] = useState(false);
  const [saleProducts, setSaleProducts] = useState(false);

  const dispatch = useDispatch();

  const products = useSelector(state => state.products.products);

  useEffect(() => {
    async function getFrontPageProducts() {
      if (products.length === 0) {
        const productsRef = collection(db, "products");

        const q = query(productsRef, orderBy("sortDate", "desc"));

        const querySnapshot = await getDocs(q);

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

        const newProductsArray = productsArray
          .filter(product => !product.sale)
          .slice(0, 6);

        const saleProductsArray = productsArray.filter(product => product.sale);

        setNewProducts(newProductsArray);
        setSaleProducts(saleProductsArray);

        setNewProductsLoaded(true);
        setSaleProductsLoaded(true);
      } else {
        const newProductsArray = products
          .filter(product => !product.sale)
          .slice(0, 6);

        const saleProductsArray = products.filter(product => product.sale);

        setNewProducts(newProductsArray);
        setSaleProducts(saleProductsArray);

        setNewProductsLoaded(true);
        setSaleProductsLoaded(true);
      }
    }

    getFrontPageProducts();
  }, []);

  if (!newProductsLoaded || !saleProductsLoaded) {
    return <main className={`${classes.container}`}>

      <img src={loadingGif} alt="Loading gif" />


    </main>;
  }

  return (
    <main>
      <NewestProducts newProducts={newProducts} />
      <SaleProducts saleProducts={saleProducts} />
      <CategoryScroll />
    </main>
  );
};

export default FrontPage;
