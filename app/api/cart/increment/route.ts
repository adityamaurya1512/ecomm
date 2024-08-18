// app/api/cart/increment/route.ts
import { NextResponse } from 'next/server';
import Cart from '@/models/cart';
import connectToDatabase from '@/lib/db';

export async function PATCH(request: Request) {
  const { email, productId } = await request.json();

  try {
    await connectToDatabase();

    const cartItem = await Cart.findOne({ email, productId });

    if (!cartItem) {
      return NextResponse.json({ message: 'Item not found in cart' }, { status: 404 });
    }

    // Check stock before incrementing
    if (cartItem.quantity < cartItem.stock) {
      cartItem.quantity += 1;
      await cartItem.save();
      return NextResponse.json({ message: 'Quantity incremented' });
    } else {
      return NextResponse.json({ message: 'Cannot increment. Item is out of stock' }, { status: 400 });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'Error incrementing quantity' }, { status: 500 });
  }
}
