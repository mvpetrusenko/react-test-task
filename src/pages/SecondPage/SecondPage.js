import React from 'react';
import '../SecondPage/SecondPage.css' 
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'

function SecondPage() {
  return ( 
    <div>
        {<Header />}
        <div className="content"> 
            <p>Second Page Content</p>
        </div> 
        
        {<Footer />}
      
    </div>
  );
}

export default SecondPage;