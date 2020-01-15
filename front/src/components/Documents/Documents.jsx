import React from 'react';
// import {Link}from 'react-router-dom';
import './Documents.css';

function Documents (){
    
    return(
            <div className="Doc">
                <button onClick="pdfRender()">Render PDF</button>
                <script type="text/javascript" src="https://mozilla.github.io/pdf.js/build/pdf.js"></script>
            </div>            
        )}


export default Documents;