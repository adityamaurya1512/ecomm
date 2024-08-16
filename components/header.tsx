import Image from "next/image"
const Header=()=>{
    return(
        <div className="w-full bg-blue-100 h-[70px] shadow-md flex justify-between fixed ">
            <div className="flex items-center gap-6">
            <Image src="/shopping-cart.png" alt="Cart" width={70} height={65}/>
            <h1 className="text-2xl text-blue-800 font-bold">EpicBuy</h1>
            </div>
            <div className="gap-6 items-cente my-6">
             <button className="bg-gray-100 mx-3">Login</button>
             <button>SignUp</button>
             

            </div>
        </div>
    )
}

export default Header