import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import {FilterType} from "./App";
import Button from "./components/Button";
import s from './todolist.module.css'

type propsType = {
    title: string
    tasks: Array<TaskType>
    removeTasks: (id: string) => void
    addTask: (title: string) => void
    checkBox:(id:string,value:boolean)=>void
}
type TaskType = {
    id: string
    title: string
    isDone: boolean

}

export function Todolist(props: propsType) {
    const [error, seterror] = useState<string|null>(null)
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
    

const changeCheckBoxHandler=(tID:string,e:boolean)=>{
    props.checkBox(tID,e)
}

    const TaskElements = Filtered.map(t => {
        return (
            <li key={t.id}>
                <input type="checkbox" checked={t.isDone} onChange={(e)=>changeCheckBoxHandler(t.id,e.currentTarget.checked)}/>
                <span>{t.title}</span>
                <Button name={' X '} callBack={()=>onClickRemoveHandler(t.id)}/>
            </li>
        )
    })
    const [title, setTitle] = useState('')

    const onChangeHelder = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value);
        seterror(null)
    }
    const onClickHandler = () => {
        if (title.trim() !== ''){
            props.addTask(title.trim());
            setTitle('');

        } else{
            seterror('Title is required')
        }

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
            <input value={title} onChange={onChangeHelder} onKeyPress={onKeyPressHelder} className={error ? s.error : ''}/>
            <Button name={'+'} callBack={()=> onClickHandler()}/>
            {error && <div className={s.errorMassage}>{error}</div>}
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
