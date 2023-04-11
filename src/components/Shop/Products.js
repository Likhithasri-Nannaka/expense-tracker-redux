import ProductItem from './ProductItem';
import classes from './Products.module.css';

const Products = (props) => {
const dummy=[{
  id:'1',price:100,title:"book 1"
},
{
  id:'2',price:200,title:"book 2"
}
]


  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
      {dummy.map((item)=>(
        <ProductItem
          key={item.id}
          id={item.id}
          title={item.title}
          price={item.price}
          description={item.description}
        />
      ))}
       
      </ul>
    </section>
  );
};

export default Products;
