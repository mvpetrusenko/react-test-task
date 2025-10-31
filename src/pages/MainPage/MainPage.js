import React, { useState, useEffect, useRef } from 'react';
import '../MainPage/MainPage.css' 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import Header from '../../components/Header/Header'
import Pagination from '../../components/Pagination/Pagination'
import Footer from '../../components/Footer/Footer'

function MainPage(props) { 

  // Get all to do list items
  const [tasks, setTasks] = useState([]);


  const [taskTitle, setTaskTitle] = useState("");


  // Setting Data to Local Storage
  const setDataToLocalStorage = (data) => {
    localStorage.setItem("tasks", JSON.stringify(data));
  }; 

  // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3; 
    const totalPages = Math.ceil(tasks.length / itemsPerPage);
    const displayedItems = tasks.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);



    useEffect(() => {
        const fetchAPI = async () => {
          try {
            const response = await fetch('https://jsonplaceholder.typicode.com/todos/', {
                method: 'GET',
            }).catch((err) => ('Error', console.error(err)));
            const data = await response.json();
            setTasks(data);
            setDataToLocalStorage(data);
      } catch (error) {
        console.log("Error Fetching Tasks From API!", error);
      }
    };
    // Storing Task in LOcal storage, if Doesnt exists then creating
    const storedTasks = JSON.parse(localStorage.getItem("tasks"))
    if (storedTasks && storedTasks.length>0) {
      setTasks(storedTasks);
    } else {
      fetchAPI();
    }
  }, []);


  

    // Deleting Task
    const deleteTask = (id) => {
      fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: "DELETE",
      })
      let updatedTask = tasks.filter((task)=>task.id !== id);
      localStorage.setItem("tasks", JSON.stringify(updatedTask));
      setTasks(JSON.parse(localStorage.getItem('tasks')))
    };



    const addTask = async (e) => {
    e.preventDefault();
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify({
        title: taskTitle,
        completed:false,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((newTask) => {
        newTask.id = Date.now();
        const updatedTasks = [newTask, ...tasks];
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
        setTasks(updatedTasks);
        console.log("Successfully Created Task!")
      })
      .catch(err=>{
        console.log("Error Creating Task!")
      })
  };


    
  // Editing Task and Updating 
  const[currentEdit, setCurrentEdit] = useState(''); 
  const ref = useRef();

  const editTask = (e) => {
    // e.preventDefault();

    fetch(`https://jsonplaceholder.typicode.com/posts/1`, {
      method: "PUT",
      body: JSON.stringify({
        id: 1,
        //title: editData.title,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        let updatedTasks = tasks.map((task) => {
          // if this task has the same ID as the edited task
          //if (task.id === editData.id) {
            // Copy the task and update its name
            //return editData;
          //}
          // Return the original task if it's not the edited task
          return task;
        });
        // Update localStorage with the updatedTasks array
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
        // Retrieve and parse the data from localStorage
        const updatedTasksFromLocalStorage = JSON.parse(
          localStorage.getItem("tasks")
        );
        // Update the tasks state with the parsed data
        setTasks(updatedTasksFromLocalStorage);
      })
      .catch((err) => {
        console.log("Error Editing Task");
  
      });
  };


  return ( 
    <div>
        {<Header />}
        <div className="content"> 

         <h3>Create New Task</h3>
        <form action="" onSubmit={addTask} className="addTask-form">
          <div className="task-input">
            <label htmlFor="task-title-input">Task Title</label>
            <input 
              id="task-title-input" 
              ref={ref}
              type="text"
              placeholder="Eg. Complete Assignment"
              value={taskTitle}
              onChange={(e) => {
                setTaskTitle(e.target.value);
              }}
              required
            />
          </div> 
          <button type="submit" className="create-task-btn">
              Create Task
          </button>
          <div className="box-btn">
            
            
          </div>

          

          </form>

          <div className='toDoList'>
            <div className='task'>
              <ul>
                {displayedItems.map(item => (
                    <li key={item.id}><FontAwesomeIcon
                  className="edit-task"
                  icon={faPenToSquare}
                  onClick={() => {
                    //editTask(item.id);
                    ref.current.focus()
                  }}
                  /><FontAwesomeIcon
                className="destroy-task"
                icon={faTrashAlt}
                onClick={() => {
                  deleteTask(item.id);
                }}
                />{item.title}</li>
                ))} 
              {/* <div className="edit-del-icons">
                <FontAwesomeIcon
                  className="edit-task"
                  icon={faPenToSquare}
                  // onClick={() => {
                  //   editTaskBox(value.id);
                  // }}
                  />
                <FontAwesomeIcon
                className="destroy-task"
                icon={faTrashAlt}
                // onClick={() => {
                //   deleteTask(task.id);
                // }}
                />
              </div> */}
               
              </ul> 
            </div>
      
            <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={setCurrentPage} />
          </div> 

          
          <span className='totalPages'>Pages total: {totalPages}</span>
         
            
          

      
        </div> 
        {<Footer />}
      
    </div>
  );
}


export default MainPage;