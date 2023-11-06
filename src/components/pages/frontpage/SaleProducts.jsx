import SaleProductCard from "./SaleProductCard";
import classes from "./SaleProducts.module.css";

const SaleProducts = ({ saleProducts }) => {
  return (
    <section className={`${classes.container}`}>
      <h2 className="heading">Currently on sale</h2>

      <div className={`${classes.innerContainer}`}>
        {saleProducts.map(product => (
          <SaleProductCard key={product.id}  id={product.id} image={product.image} title={product.title} price={product.price} catSlug={product.catSlug} titleSlug={product.titleSlug} />
        ))}
      </div>
    </section>
  );
};

export default SaleProducts;

// <div className={`${classes.container}`}></div>
