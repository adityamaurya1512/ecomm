import mongoose from 'mongoose';

const CartSchema = new mongoose.Schema({
  email: { type: String, required: true },
  productId: { type: Number, required: true },
  name: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  quantity: { type: Number, default: 1 }, // Default quantity is 1
});

const Cart = mongoose.models?.Cart || mongoose.model('Cart', CartSchema);

export default Cart;
