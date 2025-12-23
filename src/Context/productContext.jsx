import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const productContext=createContext()

function ProductProvider({children}){
    const [product,setProducts]=useState([])

    const fetchProduct=async()=>{
        try{
            const res=await axios.get('https://medizone.duckdns.org/products/products/');
         
            setProducts(res.data)
        }
        catch(e){
            console.log("error on fetching",e)
        }
    }

    useEffect(()=>{
     fetchProduct();   
    },[])
    return(
        <productContext.Provider value={{product}}>
            {children}
        </productContext.Provider>
    )
}
export default ProductProvider