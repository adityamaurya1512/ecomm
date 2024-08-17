"use client"
import React, { useState , useEffect} from'react';
import ProductCard from './product-card';
interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  quantity: number;
}
const ProductGrid =  () => {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('/data.json');
      const data = await response.json();
      setProducts(data);
    };

    fetchProducts();
  }, []);
  const itemsPerPage = 9;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(products.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center"><section className="flex-grow flex items-center justify-center py-10 mt-[70px]"><div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl">
          {currentProducts.map((currentProduct) => (
            <ProductCard name={currentProduct.name} key={currentProduct.id} imgSrc={currentProduct.image} price={currentProduct.price} productId={currentProduct.id} quantity={currentProduct.quantity}
            />
          ))}
        </div></section><div className="flex justify-center space-x-4 mb-10"><button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        >
          Previous
        </button><button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        >
          Next
        </button></div></div>
  );
};

export default ProductGrid;
