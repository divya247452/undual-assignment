import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./store";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";

const router = createBrowserRouter(
  createRoutesFromElements(
<Route path="/" element={<App />}>
  <Route index element={<Home />} />
  <Route path="/:pageNumber" element={<Home />} />
  <Route path="/category=:filter" element={<Home />} />
  <Route path="/search=:search" element={<Home />} />
  <Route path="/products/:id" element={<ProductDetail />} />
</Route>

  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
