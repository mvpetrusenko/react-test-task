import React from 'react';
import '../ThirdPage/ThirdPage.css' 
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'


function ThirdPage() {
  return ( 
    <div>
        {<Header />}
        <div className="content"> 
            <p>Third Page Content</p>
        </div>
        {<Footer />}
      
    </div>
  );
}

export default ThirdPage;