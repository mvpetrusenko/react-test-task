import React, { useState, useEffect } from 'react';
import '../MainPage/MainPage.css' 
import Header from '../../components/Header/Header'
import Pagination from '../../components/Pagination/Pagination'
import Footer from '../../components/Footer/Footer'

function MainPage() { 

  // Get all to do list items
  const [data, setData] = useState([]);
    useEffect(() => {
        const fetchAPI = async () => {
            const response = await fetch('https://jsonplaceholder.typicode.com/todos/', {
                method: 'GET',
            }).catch((err) => ('Error', console.error(err)));
            const result = await response.json();
            setData(result);
        };
        fetchAPI();
    }, []);



    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3; 
    const totalPages = Math.ceil(data.length / itemsPerPage);
    const displayedItems = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);



    // Add item to to do list
    
    const [add, setAdd] = useState([]);
    useEffect(() => {
        const fetchAPI = async () => {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
              method: 'POST',
              body: JSON.stringify({
                title: 'foo',
                body: 'bar',
                userId: 1,
              }),
              headers: {
                'Content-type': 'application/json; charset=UTF-8',
              },
            }).catch((err) => ('Error', console.error(err)));
            const result = await response.json();
            setData(result);
        };
        fetchAPI();
    }, []);
    

  return ( 
    <div>
        {<Header />}
        <div className="content"> 
          <div className='toDoList'>
            <ul>
                {displayedItems.map(item => (
                    <li key={item.id}>{item.title}</li>
                ))} 
            </ul> 
      
            <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={setCurrentPage} />
          </div> 

          
          <span className='totalPages'>Pages total: {totalPages}</span>
         
            
          

      
        </div> 
        {<Footer />}
      
    </div>
  );
}


export default MainPage;