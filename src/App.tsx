import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";
type todolistType = {
    id: string,
    title: string,
    filter: FilterValuesType
}

function App() {
    let todolistID1 = v1()
    let todolistID2 = v1()
    let [todolist, setTodolist] = useState<Array<todolistType>>([
        {id: todolistID1, title: "What to learn:", filter: 'all'},
        {id: todolistID2, title: "What to bye:", filter: 'all'},
    ])
    let [tasks, setTasks] = useState({
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false}
        ],
        [todolistID2]: [
            {id: v1(), title: "book", isDone: true},
            {id: v1(), title: "computer", isDone: true},
            {id: v1(), title: "games", isDone: false},
        ]
    })



    function removeTask(todolistID:string,id: string) {
        setTasks({...tasks,[todolistID]:tasks[todolistID].filter(el => el.id !== id)});
    }

    function addTask(todolistID:string,title: string) {
        let task = {id: v1(), title: title, isDone: false};
        setTasks({...tasks,[todolistID]:[task,...tasks[todolistID]]})
    }

    function changeStatus(todolistID:string,taskId: string, isDone: boolean) {
        setTasks({...tasks,[todolistID]:tasks[todolistID].map(el=>el.id===taskId?{...el,isDone:isDone}:el)})
    }


    function changeFilter(todolistID: string, value: FilterValuesType) {
        setTodolist(todolist.map(tdl => tdl.id === todolistID ? {...tdl, filter: value} : tdl))
    }
const removeTodolist=(todolistID:string)=>{
setTodolist(todolist.filter(el=>el.id!==todolistID))
}

    return (
        <div className="App">
            {todolist.map((el) => {
                let tasksForTodolist = tasks[el.id];

                if (el.filter === "active") {
                    tasksForTodolist = tasks[el.id].filter(t => t.isDone === false);
                }
                if (el.filter === "completed") {
                    tasksForTodolist = tasks[el.id].filter(t => t.isDone === true);
                }
                return (

                    <Todolist key={el.id}
                              todolistID={el.id}
                              title={el.title}
                              tasks={tasksForTodolist}
                              removeTask={removeTask}
                              changeFilter={changeFilter}
                              addTask={addTask}
                              changeTaskStatus={changeStatus}
                              filter={el.filter}
                              removeTodolist={removeTodolist}

                    />
                )
            })}

        </div>
    );
}

export default App;
