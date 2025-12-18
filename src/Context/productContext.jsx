import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const productContext=createContext()

function ProductProvider({children}){
    const [product,setProducts]=useState([])

    const fetchProduct=async()=>{
        try{
            const res=await axios.get('http://127.0.0.1:8000/products/products/');
            // console.log(res.data);
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