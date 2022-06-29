import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import {FilterType} from "./App";

type propsType = {
    title: string
    tasks: Array<TaskType>
    removeTasks: (id: string) => void
    addTask: (title: string) => void
}
type TaskType = {
    id: string
    title: string
    isDone: boolean

}

export function Todolist(props: propsType) {
    const [filter, setFilter] = useState<FilterType>('All')

    let Filtered = props.tasks
    if (filter === "Active") {
        Filtered = props.tasks.filter(f => !f.isDone)
    }
    if (filter === "Completed") {
        Filtered = props.tasks.filter(f => f.isDone)
    }

    const FilteredTasks = (value: FilterType) => {
        setFilter(value)
    }

const onClickRemoveHandler = (id:string)=>{
    props.removeTasks(id)
}
    const TaskElements = Filtered.map(t => {
        return (
            <li key={t.id}>
                <input type="checkbox" checked={t.isDone}/>
                <span>{t.title}</span>
                <button onClick={()=>onClickRemoveHandler(t.id)}> X</button>
            </li>
        )
    })
    const [title, setTitle] = useState('')
    const onChangeHelder = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }
    const onClickHandler = () => {
        props.addTask(title)
        setTitle(' ')
    }

    const onClickFilterHandler = (value:FilterType) => {
        FilteredTasks(value)
    }
    const onKeyPressHelder = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            onClickHandler()
        }
    }
    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={title} onChange={onChangeHelder} onKeyPress={onKeyPressHelder}/>
            <button onClick={onClickHandler}>+</button>
        </div>
        <ul>
            {TaskElements}
        </ul>
        <div>
            <button onClick={()=>onClickFilterHandler('All')}>All</button>
            <button onClick={()=>onClickFilterHandler('Active')}>Active</button>
            <button onClick={()=>onClickFilterHandler('Completed')}>Completed</button>
        </div>
    </div>
}