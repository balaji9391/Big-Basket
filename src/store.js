import { configureStore, createSlice } from "@reduxjs/toolkit";

// ------------------- PRODUCTS SLICE -------------------
const prodSlice = createSlice({
  name: "prod",
  initialState: {
    veg: [
      { id: 1, Name: "Capsicum", price: 30, imageurl: "/images/capsicum1.webp" },
      { id: 2, Name: "Broccoli", price: 40, imageurl: "/images/broccoli1.png" },
      { id: 3, Name: "Tomato", price: 35, imageurl: "/images/tomato1.webp" },
      { id: 4, Name: "Chilly", price: 10, imageurl: "/images/chilly1.webp" },
      { id: 5, Name: "Carrot", price: 20, imageurl: "/images/carrot1.png" },
      { id: 6, Name: "Potato", price: 28, imageurl: "/images/potato1.png" },
      { id: 7, Name: "Cauliflower", price: 45, imageurl: "/images/califlower1.webp" },
      { id: 8, Name: "Radish", price: 15, imageurl: "/images/radish1.png" },
      { id: 9, Name: "Onion", price: 35, imageurl: "/images/onions1.png" },
      { id: 10, Name: "Cucumber", price: 35, imageurl: "/images/cucumber1.webp" }
    ],
    nonveg: [
      { id: 1, Name: "Chicken Biryani", price: 300, imageurl: "/images/cb1.webp" },
      { id: 2, Name: "Mutton Biryani", price: 400, imageurl: "/images/mb2.webp" },
      { id: 3, Name: "Fish", price: 500, imageurl: "/images/fish1.webp" },
      { id: 4, Name: "Prawns", price: 350, imageurl: "/images/prawn1.png" },
      { id: 5, Name: "Crabs", price: 250, imageurl: "/images/crab1.png" },
      { id: 6, Name: "Egg Curry", price: 150, imageurl: "/images/egg1.png" },
      { id: 7, Name: "Chicken 65", price: 220, imageurl: "/images/c651.png" },
      { id: 8, Name: "Mutton Curry", price: 450, imageurl: "/images/mc1.webp" },
      { id: 9, Name: "Grill Chicken", price: 280, imageurl: "/images/gc.webp" },
      { id: 10, Name: "Lobster Fry", price: 320, imageurl: "/images/lobster.png" }
    ],
    chocolates: [
      { id: 1, Name: "Dairy Milk", price: 45, imageurl: "/images/DM1.png" },
      { id: 2, Name: "Hersheys", price: 300, imageurl: "/images/c3.webp" },
      { id: 3, Name: "Snickers", price: 95, imageurl: "/images/snick.png" },
      { id: 4, Name: "Kit-Kat", price: 150, imageurl: "/images/kk.png" },
      { id: 5, Name: "5-Star", price: 250, imageurl: "/images/c5.webp" },
      { id: 6, Name: "Rocher", price: 450, imageurl: "/images/love.png" },
      { id: 7, Name: "Candies", price: 500, imageurl: "/images/candies.webp" },
      { id: 8, Name: "Macaroons", price: 220, imageurl: "/images/macroons.png" },
      { id: 9, Name: "Perk", price: 60, imageurl: "/images/pk.webp" },
      { id: 10, Name: "Munch", price: 50, imageurl: "/images/munch.webp" }
    ],
    drinks: [
      { id: 1, Name: "Orange", price: 110, imageurl: "/images/orange1.png" },
      { id: 2, Name: "Heritage", price: 15, imageurl: "/images/rb.png" },
      { id: 3, Name: "Straberry", price: 30, imageurl: "/images/straw.webp" },
      { id: 4, Name: "Mint", price: 23, imageurl: "/images/mint.png" },
      { id: 5, Name: "Blue Berry", price: 20, imageurl: "/images/bb.png" }
    ]
  },
  reducers: {}
});

// ------------------- CART SLICE -------------------
const cartSlice = createSlice({
  name: "cart",
  initialState: JSON.parse(localStorage.getItem("cart")) || [],
  reducers: {
    addToCart: (state, action) => {
      const item = state.find((i) => i.Name === action.payload.Name);
      if (item) {
        item.quantity += 1;
      } else {
        state.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action) =>
      state.filter((i) => i.Name !== action.payload.Name),
    
    increaseQty: (state, action) => {
      const item = state.find((i) => i.Name === action.payload.Name);
      if (item) item.quantity += 1;
    },
    decreaseQty: (state, action) => {
      const item = state.find((i) => i.Name === action.payload.Name);
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          return state.filter((i) => i.Name !== action.payload.Name);
        }
      }
    },
    clearCart: () => []
  }
});

// ------------------- ORDERS SLICE -------------------
const orderSlice = createSlice({
  name: "orders",
  initialState: JSON.parse(localStorage.getItem("orders")) || [],
  reducers: {
    addOrder: (state, action) => {
      const orderWithDate = {
        ...action.payload,
        date: new Date().toLocaleString() // ✅ automatically add order date
      };
      state.push(orderWithDate);
    }
  }
});

//-------------------- loginSlice --------------

const loginSlice = createSlice({

  name: "userlogin",

  initialState: {

    // Load registered users from localStorage

    users: JSON.parse(
      localStorage.getItem("users")
    ) || [],

    // Load logged in user from localStorage

    loggedInUser: JSON.parse(
      localStorage.getItem("loggedInUser")
    ) || null,

    error: null

  },

  reducers: {

    addUser: (state, action) => {

      state.users.push(action.payload);

      // Save users immediately

      localStorage.setItem(
        "users",
        JSON.stringify(state.users)
      );
    },

    details: (state, action) => {

      const { userName, password } =
        action.payload;

      const isPresent =
        state.users.find(

          (user) =>

            user.userName === userName &&
            user.password === password
        );

      if (isPresent) {

        state.loggedInUser =
          isPresent;

        state.error = null;

        // Save login user

        localStorage.setItem(
          "loggedInUser",
          JSON.stringify(isPresent)
        );

      }

      else {

        state.loggedInUser = null;

        state.error =
          "Invalid username or password";

      }

    },

    logout: (state) => {

      state.loggedInUser = null;

      state.error = null;

      // Remove login user

      localStorage.removeItem(
        "loggedInUser"
      );
    }

  }

});

// ------------------- STORE -------------------
const store = configureStore({
  reducer: {
    prod: prodSlice.reducer,
    cart: cartSlice.reducer,
    orders: orderSlice.reducer,
    userlogin: loginSlice.reducer
  }
});

// ------------------- SYNC LOCALSTORAGE -------------------
store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem("cart", JSON.stringify(state.cart));
  localStorage.setItem("orders", JSON.stringify(state.orders)); // ✅ save orders automatically
});

// ------------------- EXPORT ACTIONS -------------------
export const { addToCart, removeFromCart, increaseQty, decreaseQty, clearCart } = cartSlice.actions;
export const { addOrder } = orderSlice.actions;

export const { addUser,details,logout } = loginSlice.actions;

export default store;
