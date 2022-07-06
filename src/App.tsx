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

    ])

    const addTask = (title: string) => {
        let newTask = {id: v1(), title: title, isDone: false}
        setTasks([newTask, ...tasks])
    }
    const removeTasks = (id: string) => {
        setTasks(tasks.filter(t => t.id != id))
    }
    const changeCheckBox = (tID:string,value:boolean) => {
setTasks(tasks.map(el=>el.id===tID ? {...el, isDone: value} : el))
    }

    return (
        <div className="App">
            <Todolist
                title="What to learn?"
                tasks={tasks}
                removeTasks={removeTasks}
                addTask={addTask}
                checkBox={changeCheckBox}
            />
        </div>
    );
}


export default App;
