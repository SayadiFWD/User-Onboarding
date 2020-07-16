import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Form from "./components/Form"



function App(){
  return(
    <div>
<Form/>
    </div>
  )
}


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

