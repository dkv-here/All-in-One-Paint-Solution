// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// // Fetch cart from DB
// export const fetchCart = createAsyncThunk('cart/fetchCart', async (_, { rejectWithValue }) => {
//     try {
//         const response = await fetch('/api/cart', {
//             method: 'GET',
//             credentials: 'include', // Include cookies for authentication
//             headers: { 'Content-Type': 'application/json' },
//         });

//         if (!response.ok) {
//             throw new Error('Failed to fetch cart');
//         }

//         const data = await response.json();
//         return data;
//     } catch (error) {
//         return rejectWithValue(error.message);
//     }
// });

// // Add item to cart in DB
// export const addToCart = createAsyncThunk('cart/addToCart', async ({ productId, qty }, { rejectWithValue }) => {
//     try {
//         const response = await fetch('/api/cart', {
//             method: 'POST',
//             credentials: 'include',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ productId, qty }),
//         });

//         if (!response.ok) {
//             throw new Error('Failed to add item to cart');
//         }

//         const data = await response.json();
//         return data;
//     } catch (error) {
//         return rejectWithValue(error.message);
//     }
// });

// const cartSlice = createSlice({
//     name: 'cart',
//     initialState: { items: [], loading: false, error: null },
//     reducers: {},
//     extraReducers: (builder) => {
//         builder
//             .addCase(fetchCart.pending, (state) => {
//                 state.loading = true;
//             })
//             .addCase(fetchCart.fulfilled, (state, action) => {
//                 state.loading = false;
//                 state.items = action.payload.items;
//             })
//             .addCase(fetchCart.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload;
//             })
//             .addCase(addToCart.fulfilled, (state, action) => {
//                 state.items = action.payload.items;
//             });
//     },
// });

// export default cartSlice.reducer;
