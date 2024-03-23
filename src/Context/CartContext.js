import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let CartContext = createContext();

let headers = {
  token: localStorage.getItem("userToken"),
};

function addToCart(id) {
  return axios
    .post(
      `https://ecommerce.routemisr.com/api/v1/cart`,
      { productId: id },
      { headers: headers }
    )
    .then((response) => response)
    .catch((error) => error);
}

function getLoggedUserCart() {
  return axios
    .get(`https://ecommerce.routemisr.com/api/v1/cart`, { headers: headers })
    .then((response) => response)
    .catch((error) => error);
}

function removeCartItem(id) {
  return axios
    .delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
      headers: headers,
    })
    .then((response) => response)
    .catch((error) => error);
}

function updateProductQuantity(id, count) {
  return axios
    .put(
      `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
      { count },
      { headers }
    )
    .then((response) => response)
    .catch((error) => error);
}

function clearCart() {
  return axios
    .delete(`https://ecommerce.routemisr.com/api/v1/cart`, { headers })
    .then((response) => response)
    .catch((error) => error);
}

function onlinePayment(cartId, values, url) {
  return axios
    .post(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,

      { shippingAddress: values },

      { headers }
    )
    .then((response) => response)
    .catch((error) => error);
}

export default function CartContextProvider(props) {
  const [cartId, setcartId] = useState(null);
  async function getCart() {
    let { data } = await getLoggedUserCart();
    setcartId(data?.data._id);
  }

  useEffect(() => {
    getCart();
  }, []);
  return (
    <CartContext.Provider
      value={{
        addToCart,
        cartId,
        getLoggedUserCart,
        removeCartItem,
        updateProductQuantity,
        clearCart,
        onlinePayment,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}
