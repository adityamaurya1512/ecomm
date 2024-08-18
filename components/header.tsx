import Image from "next/image";
import { useUser } from "@/context/userContext";
import Link from "next/link";
import { ShoppingCartIcon } from '@heroicons/react/outline';

const Header = () => {
    const { email } = useUser();

    return (
        <div className="w-full bg-blue-100 h-[70px] shadow-md flex justify-between items-center px-6 fixed top-0 left-0">
            <div className="flex items-center gap-6">
                <Image src="/shopping-cart.png" alt="Cart" width={70} height={65} />
                <h1 className="text-2xl text-blue-800 font-bold">EpicBuy</h1>
            </div>
            <div className="flex items-center gap-6">
                { !email ? (
                    <Link href="/login" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                        Login
                    </Link>
                ) : (
                    <>
                        <Link href="/cart" className="text-blue-500 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                            <ShoppingCartIcon className="h-6 w-6" />
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
};

export default Header;
