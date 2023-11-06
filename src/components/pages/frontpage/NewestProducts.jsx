import NewProductCard from "./NewProductCard";
import classes from "./NewestProducts.module.css";

const NewestProducts = ({ newProducts }) => {
  return (
    <section className={`${classes.container}`}>
      <h2 className="heading">Our newest products</h2>
      <div className={`${classes.innerContainer}`}>
        {newProducts.map(product => (
          <NewProductCard
            key={product.id}           
            price={product.price}
            image={product.image}
            title={product.title}
            titleSlug={product.titleSlug}
            catSlug={product.catSlug}
          />
        ))}
      </div>
    </section>
  );
};

export default NewestProducts;

// <div className={`${classes.container}`}></div>
