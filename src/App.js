import AppRouter from './router/routes';
import { ToastContainer } from 'react-toastify';
import React, { useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './assets/css/style.base.css';
import AOS from "aos";
import "aos/dist/aos.css";

function App() {
  useEffect(() => {

    document.title = process.env.REACT_APP_NAME || 'React App';
     // Update existing meta tags
     const metaDescription = document.querySelector('meta[name="description"]');
     if (metaDescription) {
         metaDescription.content = process.env.REACT_APP_META_DESCRIPTION || 'React App Description';
     }

     const metaKeywords = document.querySelector('meta[name="keywords"]');
     if (metaKeywords) {
        metaKeywords.content = process.env.REACT_APP_META_KEYWORDS || 'React App keywords';
     }

     AOS.init({ 
       duration: 1000, 
       once: true,
       offset: 100,
       disable: window.innerWidth < 768 ? false : false // Enable on mobile too
     });

}, []);



  return (
    <div>
      <ToastContainer />
      <AppRouter />
    </div>
  );
}

export default App;
