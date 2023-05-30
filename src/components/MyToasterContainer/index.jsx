import React from 'react'
import { ToastContainer } from 'react-toastify';


const MyToastContainer = () => {
    return (
               <ToastContainer
            autoClose={3000}
            position="top-center"
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored" />
       
    )
}

export default MyToastContainer
