import { ShoppingCartIcon } from "@heroicons/react/outline";
import Image from "next/image";
import Link from "next/link";

type Props = {
  name: string;
  price: string;
  imgSrc: string;
  productId:number;
  quantity:number
};

const ProductCard = ({ name, price, imgSrc }: Props) => {
  return (
    <div className="w-[250px] h-[350px] bg-white shadow-md rounded-lg overflow-hidden flex flex-col justify-between p-4">
      <div className="flex justify-center">
        <Image src={imgSrc} alt={name} height={200} width={200} className="object-cover" />
      </div>
      <div className="text-center">
        <h2 className="text-lg font-semibold text-gray-700">{name}</h2>
        <p className="text-gray-500">{price}</p>
      </div>
      <div className="flex justify-center mt-4">
        <Link href="/cart">
          <button
            className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-200 flex items-center justify-center"
          >
            <ShoppingCartIcon className="h-5 w-5 mr-2" />
            <span>Add to Cart</span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
