import React, { useState, useEffect } from "react";
const API_URL = "https://playground.4geeks.com/apis/fake/todos/user/tania";

const Home = () => {
    const [task, setTask] = useState({
        "label": "",
        "done": false
    });

    const [taskList, setTaskList] = useState([]);

    const handleChange = (event) => {
        setTask({
            ...task,
            "label": event.target.value
        });
    };

    const handleDelete = (label) => {
        const newTaskList = taskList.filter((item) => item.label !== label);
        updateTaskList(newTaskList);
    };

    const updateTaskList = async (newList) => {
        try {
            let response = await fetch(API_URL, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(newList)
            });
            if (response.ok) {
                setTaskList(newList);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const saveTask = async (event) => {
        if (event.key === "Enter") {
            try {
                let response = await fetch(API_URL, {
                    method: "PUT",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify([...taskList, task])
                });
                if (response.ok) {
                    getTask();
                    setTask({
                        "label": "",
                        "done": false
                    });
                }
            } catch (error) {
                console.log(error);
            }
        }
    };

    const getTask = async () => {
        try {
            let response = await fetch(API_URL);
            if (response.ok) {
                let data = await response.json();
                setTaskList(data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getTask();
    }, []);

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-12 col-md-6">
                    <h1>Todo List</h1>
                    <input
                        type="text"
                        placeholder="Agrega la tarea"
                        className="form-control"
                        name="label"
                        value={task.label}
                        onChange={handleChange}
                        onKeyDown={saveTask}
                    />
                    <ul className="mt-4">
                        {taskList.map((item, index) => {
                            return (
                                <li className="d-flex justify-content-between"key={index}>{item.label}  
                                <button
                                    className="btn btn-outline-danger "
                                    onClick={() => handleDelete(item.label)}
                                >
                             x                                </button>
                            </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </div>
    );
   }
export default Home;