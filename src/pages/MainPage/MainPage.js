import React, { useState, useEffect } from 'react';
import '../MainPage/MainPage.css' 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretSquareLeft, faCaretSquareRight, faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import Header from '../../components/Header/Header';
import Pagination from '../../components/Pagination/Pagination';
import Footer from '../../components/Footer/Footer';




function MainPage() { 

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
    
    console.log(displayedItems)

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
    // Storing Task in LOcal storage, if does not exists then creating
    const storedTasks = JSON.parse(localStorage.getItem("tasks"))
    if (storedTasks && storedTasks.length>0) {
      setTasks(storedTasks);
    } else {
      fetchAPI();
    }
  }, []);


    // Adding Task
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
        console.log("Successfully Created Task!");
      })
      .catch(err=>{
        console.log("Error Creating Task!")
      })
      setTaskTitle(''); /* clear input after submit */
      
      
  };



  const clearInput = () => {
    const inputField = document.getElementById('task-title-input').value = '';
    
  }



  // Change Task For Update 

  function createButton() {
    let element = document.createElement("button");
    element.appendChild(document.createTextNode("Update task"));
    let page = document.getElementById("update-task-btn");
    page.appendChild(element);

  console.log(element);
}

  const changeTask = (id) => {
    if(id === id) document.getElementById('task-title-input').focus(); 
    createButton();
  }


  // const changeTask = (e) => {
  //   let newEntry = {
  //     id: updateData.id, 
  //     title: e.target.value, 
  //     completed: updateData.completed ? true : false
  //   }
  //   setUpdateData(newEntry);
  // }


  // Update Task 
  // const[updateData, setUpdateData] = useState(''); 

  // const updateTask = (e) => {
  //     updateData = e.target.value;
  //     setUpdateData();
  // }

  // const updateTask = (e) => {
  //   let newEntry = {
  //     id: updateData.id, 
  //     title: e.target.value, 
  //     completed: updateData.completed ? true : false
  //   }
  //   setUpdateData(newEntry);
  //   let filterTasks = tasks.filter(task => task.id !== updateData.id); 
  //   let UpdatedObject = [updateData, ...filterTasks]; 
  //   setTasks(UpdatedObject);
  //   setUpdateData('');

  // }


    // Deleting Task
    const deleteTask = (id) => {
      fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: "DELETE",
      })
      let updatedTask = tasks.filter((task)=>task.id !== id);
      localStorage.setItem("tasks", JSON.stringify(updatedTask));
      setTasks(JSON.parse(localStorage.getItem('tasks')))
    };


  // Editing Task and Updating 
  // const ref = useRef();
  

  // const {
  //   editData,
  //   setEditData,
  //   editBox,
  //   setEditBox,
  // } = props;

  // let editData;

  // const editTask = (id) => {
  //   // let editData;
  //   // e.preventDefault();

  //   fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
  //     method: "PUT",
  //     body: JSON.stringify({
  //       id: 1,
  //       title: editData.title,
  //       completed: editData.completed
  //     }),
  //     headers: {
  //       "Content-type": "application/json; charset=UTF-8",
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then(() => {
  //       let updatedTask = tasks.filter((task)=>task.id === id);
  //       localStorage.setItem("tasks", JSON.stringify(updatedTask));
  //       setTasks(JSON.parse(localStorage.getItem('tasks')))
  //     });
  // };


  return ( 
    
    <div>
        {<Header />}
        <div className="content"> 
          <div className='createTask'>
            <h3>Create New Task</h3>
            <form action="" onSubmit={addTask} className="addTask-form">
                <div className="task-input">
                  {/* <label htmlFor="task-title-input">Task Title:  </label> */}
                  <input 
                      id="task-title-input" 
                      type="text"
                      placeholder="   Your Task Title"
                      value={taskTitle}
                      onChange={(e) => {
                      setTaskTitle(e.target.value);
                      }}
                      required
                  />
                </div>
  
                <div className="box-btn">
                    <button type="submit" className="create-task-btn">
                        Create Task
                    </button>
                    <button  className="clear-input-btn" onClick={clearInput}>
                        Cancel
                    </button>
                    <div id="update-task-btn" 
                    // onClick={editTask}
                    ></div>
                  </div>
            </form>
        </div>


          <div className='toDoList'>
            <div className='task'>
              <ul>
                {displayedItems.map(item => (
                    <li key={item.id}><FontAwesomeIcon
                  className="edit-task"
                  icon={faPenToSquare}
                  onClick={() => {
                    changeTask(item.id)
                  }}
                  /><FontAwesomeIcon
                className="destroy-task"
                icon={faTrashAlt}
                onClick={() => {
                  deleteTask(item.id);
                }}
                />{item.title}</li>
                ))}  
              </ul> 
            </div>
            
      
            <div className='navigation-btn'>
              <FontAwesomeIcon
                  className="prev-btn"
                  icon={faCaretSquareLeft}
                  onClick={() => 
                    setCurrentPage(currentPage - 1)}
                  />
                <FontAwesomeIcon
                  className="next-btn"
                  icon={faCaretSquareRight}
                  onClick={() => 
                    setCurrentPage(currentPage + 1)}
                  />
            </div>
            
            <Pagination  currentPage={currentPage} 
            totalPages={totalPages} 
            onPageChange={setCurrentPage} />
          
          </div> 
  
          <span className='totalPages'>Pages total: {totalPages}</span>
        </div> 
        {<Footer />}
      
    </div>
    

  );
}


export default MainPage; 
