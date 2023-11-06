import { Link } from 'react-router-dom'
import classes from './SaleProductCard.module.css'

const SaleProductCard = ({ image, title, price, catSlug, titleSlug }) => {

  return (
    <div className={`${classes.container}`}>
      <div className={`${classes.imageContainer}`}>
      <Link to={"products/category/" + catSlug + "/" + titleSlug}>
      <img src={image} alt={title} />
      </Link>
 
      </div>


<h3 className={`${classes.textContainer} defaultText textAlign`}>
    {title}
</h3>

<div className={`${classes.priceContainer} defaultText textAlign`}>
   <span> ${price}</span>
</div>


    </div>
  )
}

export default SaleProductCard