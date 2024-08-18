// app/api/cart/decrement/route.ts
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

    if (cartItem.quantity > 1) {
      cartItem.quantity -= 1;
      await cartItem.save();
      return NextResponse.json({ message: 'Quantity decremented' });
    } else {
      return NextResponse.json({ message: 'Cannot decrement. Quantity is already 1' }, { status: 400 });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'Error decrementing quantity' }, { status: 500 });
  }
}
