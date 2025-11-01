import React from "react";

// props: newTask; addTask
const AddTaskForm = (props) => {
    return (
        <>
            <div className='createTask'>
                <h3>Create New Task</h3>
                <form action="" onSubmit={props.addTask} className="addTask-form">
                <div className="task-input">
                    {/* <label htmlFor="task-title-input">Task Title:  </label> */}
                    <input 
                        id="task-title-input" 
                        // ref={ref}
                        type="text"
                        placeholder="   Your Task Title"
                        // value={taskTitle}
                        value={props.newTask}
                        onChange={(e) => {
                        props.setNewTask(e.target.value);
                        }}
                        required
                    />
                </div>
                    <div className="box-btn">
                        <button type="submit" className="create-task-btn" onClick={props.addTask}>
                            Add Task
                        </button>
                        <button  className="clear-input-btn" onClick={props.cancelUpdate}>
                            Cancel
                        </button>
                    </div>
                </form>
        </div>
        </>
    )
}

export default AddTaskForm;