import React from 'react';
import {FilterType} from "../App";
type ButtonProps={
    name: string
    callBack: ()=>void
}
const Button = (props:ButtonProps) => {
    const onClickHendler =()=>{
props.callBack()
    }
    return (
        <button onClick={onClickHendler}> {props.name} </button>
    );
};


export default Button;