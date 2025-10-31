import React from 'react';
import { Link } from 'react-router-dom';
import '../Header/Header.css'
import todolist from '../../assets/images/todolist.svg'; 



function Header() {
  return (
    <header className="sticky">
        <div> 
          <Link to="/"><img src={todolist} alt="ToDoList" className="todolistImage" /></Link>
          <h1 style={{ fontFamily: 'cursive', textAlign: 'center' }}>
            To Do List
          </h1> 
        </div>
      </header> 

  );
}

export default Header;