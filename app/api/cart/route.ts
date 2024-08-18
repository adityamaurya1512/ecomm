// app/api/cart/route.ts
import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db'; // Ensure this is the correct path to your connectToDatabase function

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email');

  if (!email) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 });
  }

  try {
    const conn = await connectToDatabase();
    const db = conn.connection?.db; // Use optional chaining to handle potential undefined

    if (!db) {
      throw new Error('Database connection is not available');
    }

    const cartItems = await db.collection('carts').find({ email }).toArray();
    console.log(cartItems,'ppppppppppppppp')
    return NextResponse.json(cartItems);
  } catch (error) {
    console.error('Error fetching cart items:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
