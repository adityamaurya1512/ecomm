// app/api/cart/remove/route.ts
import { NextResponse } from 'next/server';
import Cart from '@/models/cart';
import connectToDatabase from '@/lib/db';

export async function DELETE(request: Request) {
  const { email, productId } = await request.json();

  try {
    await connectToDatabase();

    const result = await Cart.deleteOne({ email, productId });

    if (result.deletedCount === 0) {
      return NextResponse.json({ message: 'Item not found in cart' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Item removed from cart' });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'Error removing item from cart' }, { status: 500 });
  }
}
