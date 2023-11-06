import categories from '../../../data/categories';
import CategoryCard from './CategoryCard';
import classes from './CategoryScroll.module.css'

const CategoryScroll = () => {

  return (


    <section className={`${classes.container}`}>
      <h2 className='heading'>Browse a category</h2>

      <div className={`${classes.innerContainer}`}>

       <div className={`${classes.cardContainer}`}>
       {categories.map(category => (
          <CategoryCard key={category.id} id={category.id}  name={category.name} image={category.image}  />
        ))}
       </div>
      </div>



   



   




    </section>
  )
}

export default CategoryScroll;




// <div className={`${classes.container}`}></div>