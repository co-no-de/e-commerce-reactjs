import products from "../data/products"
import slugify from "../helpers/slugify"
import { collection, doc, setDoc } from "firebase/firestore"
import { db } from "../../firebase"

const Temp = () => {


  const newProducts = products.map(product => {
    
    let newProduct = {
      category: product.category,
      description: product.description,
      id: product.id,
      image: product.image,
      price: product.price,
      sale: product.sale,
      sortDate: Date.now(),
      title: product.title,
      titleSlug: slugify(product.title),
      catSlug: slugify(product.category),
      discountPrice: product.sale ? product.price * 0.73 : 0
    }

    return newProduct;

  })

  //console.log(newProducts)



  async function uploadProducts() {
    newProducts.forEach(product => {

      const productRef = doc(collection(db, "products"));

  
      setDoc(productRef, product)
  })

  console.log('finished')

}
    




uploadProducts()





  return (
    <div>Temp</div>
  )
}

export default Temp