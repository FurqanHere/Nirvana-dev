import React from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { PrimeReactProvider } from 'primereact/api';
// import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <PrimeReactProvider value={{ ripple: false, hideOverlaysOnDocumentScrolling: true }}>
      {/* <GoogleReCaptchaProvider reCaptchaKey="6Ldbt9orAAAAAAKylDUHQHcr8pzW1cpXcPLiTllb"> */}
        <App />
      {/* </GoogleReCaptchaProvider> */}
    </PrimeReactProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
