// app/page.tsx
"use client"

import Header from "@/components/header"
import ProductGrid from "@/components/product-grid"
import { useCartStore } from "@/store/cartStore"
import { useEffect } from "react"
import { useUser } from "@/context/userContext";
const Home = () => {
  const {email} = useUser()
  const { initializeCart } = useCartStore();

  useEffect(() => {
    if (email) {
      initializeCart(email);
    }
  }, [email, initializeCart]);

  return (
    <>
      <Header />
      <ProductGrid />
    </>
  )
}

export default Home;
