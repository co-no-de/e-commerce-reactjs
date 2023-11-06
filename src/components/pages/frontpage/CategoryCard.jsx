import { Link } from 'react-router-dom'
import slugify from '../../../helpers/slugify'
import classes from "./CategoryCard.module.css";


const CategoryCard = ({ image, name }) => {

  const slug = slugify(name)  

  return (
    <div className={`${classes.container}`}>
      <div className={`${classes.imageContainer}`}>
      <Link to={"/products/category/" + slug } state={{name}}>
    <img src={image} alt={name} />
    </Link>
      </div>

      <div className={`${classes.textContainer}`}>
    <Link to={"/products/category/" + slug } state={{name}} className={`${classes.productTitle}`}>{name}</Link>
      </div>
   
   
    </div>
  );
};

export default CategoryCard;