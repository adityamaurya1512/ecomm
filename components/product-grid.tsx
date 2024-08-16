import ProductCard from "./product-card";
const ProductGrid=()=>{
    const products = [
        { id: 1, name: 'Product 1', price: '$10', image: '/camera.jpeg' },
        { id: 2, name: 'Product 2', price: '$20', image: '/camera.jpeg'  },
        { id: 3, name: 'Product 3', price: '$30', image: '/camera.jpeg'  },
        { id: 4, name: 'Product 4', price: '$40', image: '/camera.jpeg' },
        { id: 5, name: 'Product 5', price: '$50', image: '/camera.jpeg' },
        { id: 6, name: 'Product 6', price: '$60', image: '/camera.jpeg'  },
        { id: 7, name: 'Product 7', price: '$70', image: '/camera.jpeg'  },
        { id: 8, name: 'Product 8', price: '$80', image: '/camera.jpeg'  },
        // { id: 9, name: 'Product 9', price: '$90', image: '/path/to/image9.jpg' },
      ];
    return(
      <div className="min-h-screen flex flex-col items-center">
        
        <section className="flex-grow flex items-center justify-center py-10 mt-[70px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl">
          {products.map((product) => (
            <ProductCard name={product.name} key={product.id} imgSrc={product.image} price={product.price}
            />
          ))}
        </div>
      </section>
      </div>
    )
}

export default ProductGrid