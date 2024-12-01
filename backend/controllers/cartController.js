// import Cart from '../models/cartModel.js';
// import Product from '../models/productModel.js';
// import asyncHandler from '../middlewares/asyncHandler.js';

// // Fetch user's cart
// export const getCart = asyncHandler(async (req, res) => {
//   const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
//   if (!cart) {
//     return res.status(404).json({ message: 'Cart not found' });
//   }
//   res.json(cart);
// });

// // Add item to cart
// export const addItemToCart = asyncHandler(async (req, res) => {
//   const { cartItems } = req.body;  // Expecting updated cart items

//   let cart = await Cart.findOne({ user: req.user._id });
//   if (!cart) {
//     cart = new Cart({ user: req.user._id, items: cartItems });
//   } else {
//     cart.items = cartItems;  // Update the cart with the new items
//   }

//   await cart.save();
//   res.status(200).json(cart);
// });

// // Remove item from cart
// export const removeItemFromCart = asyncHandler(async (req, res) => {
//   const { productId } = req.params;
//   const cart = await Cart.findOne({ user: req.user._id });
//   if (!cart) {
//     return res.status(404).json({ message: 'Cart not found' });
//   }

//   cart.items = cart.items.filter((item) => !item.product.equals(productId));
//   await cart.save();
//   res.status(200).json(cart);
// });

// // Clear cart
// export const clearCart = asyncHandler(async (req, res) => {
//   const cart = await Cart.findOne({ user: req.user._id });
//   if (cart) {
//     cart.items = [];
//     await cart.save();
//   }
//   res.status(200).json({ message: 'Cart cleared' });
// });
