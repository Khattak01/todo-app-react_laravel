import React, { useState, useEffect } from 'react'
import classes from './AddTodo.module.css'

import Box from '../../UI/box/Box'
import Input from '../../UI/input/Input'
import Hr from '../../UI/hr/Hr'
import Button from '../../UI/button/Button'

import axios from 'axios'
import useRouter from '../../hooks/useRouter'

const intiState = {
    name: "",
    type: "",
    description: "",
}

const config = {
    headers: { "Content-Type": "application/json" },
};

const AddTodo = ({ role }) => {


    const { history, query } = useRouter()

    const { todoId } = query
    console.log("todoId >>> ", todoId)

    const [formData, setFormData] = useState(intiState);

    const formChangeHandler = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const formSubmitHandler = async () => {

        const res = await axios.post('http://127.0.0.1:8000/api/todos', formData, config)
        if (res.status === 200) {
            alert("data saved!")
            history.push('/')
            return;
        }
        alert("operation failed-_-")
    }

    const updateTodoHandler = async () => {
        let res = await axios.put(`http://127.0.0.1:8000/api/todos/${todoId}`, JSON.stringify(formData), config)
        if (res.status === 200) {
            alert("data updated!");
            history.push('/')
            return;
        }
        alert("operation failed-_-");
    }

    useEffect(() => {
        const getTodoUpdateData = async () => {
            if (role === 'update' && !todoId) {
                history.push('/')
            }
            if (todoId) {
                let data = await (await axios.get(`http://127.0.0.1:8000/api/todos/${todoId}`)).data
                console.log(data)
                setFormData({ name: data.name, type: data.type, description: data.description })
            }
        }
        getTodoUpdateData()
        return () => {
            setFormData(intiState)
        }
    }, [])

    return (
        <Box className={[classes.add_todo, 'container'].join(" ")}>
            <h1 className={classes.add_todo__heading}>Add todo</h1>
            <Hr style={{ marginTop: "2.5rem", marginBottom: "2.5rem" }} />
            <div className={classes.add_todo__content}>
                <Input
                    className={classes.add_todo__input}
                    label="Todo Name"
                    name="name"
                    onChange={formChangeHandler}
                    value={formData.name}
                    placeholder="Enter todo name"
                />
                <Input
                    className={classes.add_todo__input}
                    label="Todo Type"
                    name="type"
                    onChange={formChangeHandler}
                    value={formData.type}
                    placeholder="Enter todo type"
                />
                <Input
                    className={classes.add_todo__input}
                    label="Todo description"
                    name="description"
                    onChange={formChangeHandler}
                    value={formData.description}
                    placeholder="Enter todo description"
                />
            </div>
            <Button className={classes.add_todo__btn} onClick={role === "add" ? formSubmitHandler : updateTodoHandler} value={role === "add" ? "Todo todo" : "Update Todo"} />
        </Box >
    )
}

export default AddTodo
