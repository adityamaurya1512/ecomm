import { NextResponse } from 'next/server';

import Cart from '@/models/cart';
import connectToDatabase from '@/lib/db';
export async function POST(request: Request) {
  const { email, productId, name, image, price, stock } = await request.json();
  
   console.log(image, price , stock )
  try {
    await connectToDatabase()
    console.log('here i am ')
    const existingItem = await Cart.findOne({ email, productId });

    if (existingItem) {
      return NextResponse.json({ message: 'Item already in cart' }, { status: 400 });
    }

    const newCartItem = new Cart({ email, productId, name, image, price, stock });
    await newCartItem.save();

    return NextResponse.json({ message: 'Item added to cart' });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: 'Error adding item to cart' }, { status: 500 });
  }
}
