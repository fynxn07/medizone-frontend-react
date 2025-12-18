import CartProvider from "./Context/cartContext"
import ProductProvider from "./Context/productContext"
import { ToastContainer } from "react-toastify";

import Routing from "./Paths/Routing"
import "./Tails.css"
import WishlistProvider from "./Context/wishlistContext";
import ProtectProvider from "./Context/ProtectContext";


function App() {
  

  return (
    <div>
      <ProductProvider>
        <CartProvider >
          <WishlistProvider>
            <ProtectProvider>
            

    <ToastContainer position="top-right" autoClose={500} />
   
    
    <Routing />

</ProtectProvider>
    </WishlistProvider>
    </CartProvider>
    </ProductProvider>
    </div>
   
  )
}

export default App
