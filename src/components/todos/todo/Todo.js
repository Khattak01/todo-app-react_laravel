import React from 'react'
import classes from '../Todos.module.css'

import Box from '../../../UI/box/Box'
import Hr from '../../../UI/hr/Hr'

import { IconButton } from "@material-ui/core";
import CancelOutlinedIcon from "@material-ui/icons/CancelOutlined";
import DoneOutlinedIcon from "@material-ui/icons/DoneOutlined";
import DoneAllIcon from '@material-ui/icons/DoneAll';
import EditIcon from '@material-ui/icons/Edit';

import { date, time, capitalizeString } from '../../../utils/methods'

import useRouter from '../../../hooks/useRouter'
// const dateTime = new Date()

const Todo = ({ todo, updateStatusClickHandler, deleteClickHandler }) => {

    // console.log("todo >>>", todo)

    const {history} = useRouter()

    let statusBackgroundColor = ''
    if (todo.status === 'pending') statusBackgroundColor = '#f1a20f'
    // else if (todo.status === 'rejected') statusBackgroundColor = 'rgb(241, 70, 70)'
    else if (todo.status === 'completed') statusBackgroundColor = '#28a745'

    const completeClick = () => {
        updateStatusClickHandler(todo.id, 'completed')
        // completeClickHandler()
    }
    const deleteClick = () => {
        let res = window.confirm("Want to reject the todo?")
        if (!res) return
        deleteClickHandler(todo.id)

    }
    const pendingClick = () => {
        updateStatusClickHandler(todo.id, 'pending')
    }
    const updateClickHandler = () => {
        history.push(`update-todo/${todo.id}`)
    }

    return (
        <Box className={classes.todo}>
            <div className={classes.todo__header}>
                <h3>{todo.name}</h3>
                <p style={{ background: statusBackgroundColor }} >{capitalizeString(todo.status)}</p>
            </div>
            <div className={classes.todo__content}>
                <div>
                    <p><span>Reporter name :</span> Khattak01</p>
                    <p><span>Reporter Email :</span> khattak@gmail.com</p>
                </div>

                <div>
                    <p><span>Reporting date :</span> {date(todo.created_at)}</p>
                    <p><span>Reporting time :</span> {time(todo.created_at)}</p>
                </div>
            </div>
            <Hr />
            <p style={{ marginTop: "1rem" }} className={[classes.todo__description, "text"].join(" ")} ><span>Description :</span> {todo.description}</p>
            <div className={classes.todo__bottom}>
                {todo.status === 'pending' ? <IconButton style={{ borderRadius: "0" }} onClick={completeClick}>
                    {" "}
                    <DoneAllIcon fontSize="large" style={{ fontSize: "2.8rem", color: "rgb(27, 204, 86)" }} />
                    <span
                        style={{
                            color: "rgb(27, 204, 86)",
                            fontSize: "1.8rem",
                            marginLeft: ".5rem",
                        }}
                    >Complete</span>
                </IconButton> :
                    <IconButton style={{ borderRadius: "0" }} onClick={pendingClick}>
                        {" "}
                        <DoneOutlinedIcon fontSize="large" style={{ fontSize: "2.8rem", color: "#f1a20f" }} />
                        <span
                            style={{
                                color: "#f1a20f",
                                fontSize: "1.8rem",
                                marginLeft: ".5rem",
                            }}
                        >Peding</span>
                    </IconButton>}
                <div>
                    <IconButton style={{ borderRadius: "0" }} onClick={updateClickHandler}>
                        {" "}
                        <EditIcon fontSize="large" style={{ fontSize: "2.8rem" }} />
                        <span
                            style={{
                                fontSize: "1.8rem",
                                marginLeft: ".5rem",
                            }}
                        >Update</span>
                    </IconButton>
                    <IconButton style={{ borderRadius: "0" }} onClick={deleteClick}>
                        {" "}
                        <CancelOutlinedIcon fontSize="large" style={{ fontSize: "2.8rem", color: "rgb(212, 37, 37)" }} />
                        <span
                            style={{
                                color: "rgb(212, 37, 37)",
                                fontSize: "1.8rem",
                                marginLeft: ".5rem",
                            }}
                        >Delete</span>
                    </IconButton>
                </div>
            </div>

        </Box>
    )
}

export default Todo
