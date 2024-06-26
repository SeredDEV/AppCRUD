import { useState } from "react";
import uuid from 'react-uuid';
import 'bootstrap/dist/css/bootstrap.min.css';

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
    const task = { id: uuid(), title, description };
    setTasks([...tasks, task]);
    clear();
  };

  const updateTask = () => {
    const id = localStorage.getItem("id");
    const newTask = { id, title, description };
    const newTasks = tasks.map(item => item.id === id ? newTask : item);
    setTasks(newTasks);
    clear();
  };

  const actions = (e) => {
    e.preventDefault();
    edit ? updateTask() : addTask();
  };

  const deleteTask = (id) => {
    const newTasks = tasks.filter(task => task.id !== id);
    setTasks(newTasks);
  };

  const getData = (id) => {
    const task = tasks.find(item => item.id === id);
    localStorage.setItem("id", id);
    setTitle(task.title);
    setDescription(task.description);
    setEdit(true);
  };

  const clear = () => {
    setTitle('');
    setDescription('');
    setEdit(false);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header text-center">
              <h3>CRUD</h3>
            </div>
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
                <button className="btn btn-primary w-100" type="submit">
                  {edit ? "Update" : "Save"}
                </button>
              </form>
            </div>
          </div>
          <ul className="list-group list-group-numbered mt-3">
            {tasks.map((task) => (
              <li className="list-group-item d-flex justify-content-between align-items-start" key={task.id}>
                <div className="ms-2 me-auto">
                  <div className="fw-bold">{task.title}</div>
                  {task.description}
                </div>
                <button className="btn btn-danger me-2" onClick={() => deleteTask(task.id)}>
                  <i className="fa-regular fa-trash-can"></i>
                </button>
                <button className="btn btn-warning" onClick={() => getData(task.id)}>
                  <i className="fa-regular fa-pen-to-square"></i>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Crud;
