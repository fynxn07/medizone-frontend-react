import React, { useContext } from 'react'

import ProtectContext, { authContext } from '../Context/ProtectContext';
import { cartContext } from '../Context/cartContext';
import { useNavigate } from 'react-router-dom';

function Logout() {
    const { removeLogout } = useContext(authContext)

    const id = localStorage.getItem('user')

    console.log("Id", id);


    const navigate = useNavigate()

    const handleClick = async () => {
        console.log("Id in handle click",id);
        
        if (id){ 
             console.log('if CONDTION');
         removeLogout();  
         } else{
            console.log('ELSE CONDTION');
            localStorage.clear();
            navigate("/login")
         }    
    };


        return (
            <button
                onClick={handleClick}
                className={`${id?`bg-red-500`:`bg-green-500`} text-white px-4 py-2 rounded-xl shadow-md transition-all duration-200`}>
                {id?`Logout`:"Login"}
            </button>
        )
    }



export default Logout