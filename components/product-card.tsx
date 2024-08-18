// components/ProductCard.tsx
import { ShoppingCartIcon } from '@heroicons/react/outline';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useCartStore } from '@/store/cartStore';

interface ProductCardProps {
  name: string;
  price: number;
  imgSrc: string;
  productId: number;
  stock: number;
  email: string;
}

const ProductCard = ({ name, price, imgSrc, stock, productId, email }: ProductCardProps) => {
  const { addToCart, isInCart,items } = useCartStore();
  const [inCart, setInCart] = useState(false);
  
 
  useEffect(() => {
    setInCart(isInCart(productId, email));
    
  },[items, productId, email, isInCart]);
  

  const handleAddToCart = () => {
    if (email) {
      const image = imgSrc;
     addToCart({ productId, name, image, price, stock, quantity: 1, email });
    }
   setInCart(true)
  };
  

  return (
    <div className="w-[250px] h-[350px] bg-white shadow-md rounded-lg overflow-hidden flex flex-col justify-between p-4">
      <div className="flex justify-center">
        <Image src={imgSrc} alt={name} height={200} width={200} className="object-cover" />
      </div>
      <div className="text-center">
        <h2 className="text-lg font-semibold text-gray-700">{name}</h2>
        <p className="text-gray-500">${price}</p>
      </div>
      <div className="flex justify-center mt-4">
        <button
          className={`text-white font-semibold py-2 px-4 rounded transition-colors duration-200 flex items-center justify-center ${inCart ? 'bg-gray-500' : 'bg-blue-500 hover:bg-blue-600'}`}
          disabled={inCart}
          onClick={handleAddToCart}
        >
          <ShoppingCartIcon className="h-5 w-5 mr-2" />
          <span>{inCart ? 'In Cart' : 'Add to Cart'}</span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
