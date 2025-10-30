import React, { useState, useEffect } from 'react';
import '../MainPage/MainPage.css' 
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'

function MainPage() { 

  const [data, setData] = useState([]);
    useEffect(() => {
        const fetchAPI = async () => {
            const response = await fetch('https://jsonplaceholder.typicode.com/todos/', {
                method: 'GET',
            }).catch((err) => ('Error', console.error(err)));
            const data = await response.json();
            setData(data);
        };
        fetchAPI();
    }, []);


  return ( 
    <div>
        {<Header />}
        <div className="content"> 
            <p>Something to create</p>

            
        </div> 

        <div className='toDoList'>
            <ul>
                {data.map((items) => (
                    <li key={items.id}>{items.title}</li>
                ))}
            </ul>
        </div>
        {<Footer />}
      
    </div>
  );
}

export default MainPage;