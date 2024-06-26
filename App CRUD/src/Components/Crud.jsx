import { useState } from "react";
import uuid from 'react-uuid';

const Crud = () => {
  // Create;
  // Read;
  // Update;
  // Delete;

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [edit, setEdit] = useState(false);

  const addTask = () => {
    const task = {id:uuid(), title, description };
    setTasks([...task, task]);
    clear()
  };


  const updateTask=()=>{

const id=localStorage.getItem("id")
const newTask={id,title,description}
const newTasks=tasks.map(item=>item.id===id?newTask:item)
setTasks(newTasks)
clear();

  }

  const actions = (e) => {
    e.preventDefault();
    edit?updateTask():addTask
    addTask();
  };

  const deleteTask=(id)=>{

const newTasks=tasks.filter(task=>task.id!==id)
setTasks(newTasks)

  }


  const getData=(id)=>{

const task=tasks.find(item=>item.id===id)
localStorage.setItem("id",id)
setTitle(task.title)
setDescription(task.description)
setEdit(true)

  }

  const clear=()=>{

setTitle('');
setDescription('');
setEdit(false);


  }

  return (
    <div className="container">
      <div className="mt-5 justify-content-center d-flex align-items-center">
        <div className="col-6">
          <div className="card">
            <h3 className="card-title text-center">CRUD</h3>
            <div className="card-body">
              <form onSubmit={actions}>
                <div className="mb-3">
                  <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    required
                    autoFocus
                    className="form-control"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    placeholder="Description"
                    value={description}
                    required
                    className="form-control"
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <button className="btn btn-primary font-control" type="submit">
                  Save
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* list task */}

      <ul className="list-group list-group-numbered">
        {tasks.map((task) => (
          <li className="list-group-item d-flex justify-content-between align-items-start" key={task.id}>
            <div className="ms-2 me-auto">
              <div className="fw-bold">{task.title}</div>
              {task.description}
            </div>
            <button className="btn btn-danger me-3"><i className="fa-regular fa-trash-can" onClick={()=>deleteTask(task.id)}></i></button>
            <button className="btn btn-warning" onClick={()=>getData(task.id)}><i className="fa-regular fa-pen-to-square"></i></button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Crud;
