import { Link } from "react-router-dom";
import classes from "./NewProductCard.module.css";



const NewProductCard = ({ price, image, title, titleSlug, catSlug }) => {

  return (
    <div className={`${classes.container}`}>
      <div className={`${classes.textContainer}`}>
        <p className="defaultText textAlign">{title}</p>
      </div>
      <Link to={"products/category/" + catSlug + "/" + titleSlug}>
      
        <img src={image} alt={title} />
      </Link>

      <p className="defaultText textAlign">${price}</p>
    </div>
  );
};

export default NewProductCard;

// <div className={`${classes.container}`}></div>
