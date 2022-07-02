import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist1";
import {v1} from "uuid";

export type FilterType = 'All' | 'Active' | 'Completed'

function App() {

    const [tasks, setTasks] = useState([
        {id: v1(), title: "HTML and CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "React", isDone: false},
        {id: v1(), title: "React", isDone: true},
        {id: v1(), title: "React", isDone: false},
        {id: v1(), title: "React", isDone: false}

    ])

    const addTask = (title:string) => {
      let newTask={id: v1(), title: title, isDone: false}
        setTasks([newTask,...tasks])
    }
    const removeTasks = (id: string) => {
        setTasks(tasks.filter(t => t.id != id))
    }
    function changeStatus(taskId:string,isDone:boolean) {
let task = tasks.find((t => t.id === taskId))}
    return (
        <div className="App">
            <Todolist
                title="What to learn?"
                tasks={tasks}
                removeTasks={removeTasks}
                addTask={addTask}
            />
        </div>
    );
}


export default App;
