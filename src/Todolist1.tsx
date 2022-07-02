import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import {FilterType} from "./App";
import Button from "./components/Button";

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
                <Button name={' X '} callBack={()=>onClickRemoveHandler(t.id)}/>
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
            <Button name={'+'} callBack={()=>onClickHandler()}/>
        </div>
        <ul>
            {TaskElements}
        </ul>
        <div>
            <Button name = {'all'} callBack={()=>onClickFilterHandler('All')}/>
            <Button name = {'active'} callBack={()=>onClickFilterHandler('Active')}/>
            <Button name = {'completed'} callBack={()=>onClickFilterHandler('Completed')}/>
        </div>
    </div>
}