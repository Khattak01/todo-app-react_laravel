import React, { useState, useEffect } from "react";
import classes from "./Todos.module.css";

import { IconButton } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

import Hr from "../../UI/hr/Hr";
import Loading from "../../UI/loader/Loader";

import Todo from "./todo/Todo";

import useRouter from "../../hooks/useRouter";

import axios from "axios";

// const todos = [
//     { id: 1, name: "init project", type: "project", description: "publishing and graphic design", status: "pending" },
//     { id: 2, name: "complete side bar", type: "project", description: "used as a placeholder before final copy is available.", status: "completed" },
//     { id: 3, name: "init dashboard", type: "freelance", description: "n publishing and graphic design", status: "completed" },
//     { id: 4, name: "start header", type: "personal", description: "used as a placeholder before", status: "pending" },
// ]

const Todos = () => {
    const { history } = useRouter();
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(false);

    const getTodod = async () => {
        try {
            setLoading(true);
            const data = await (await axios.get("http://127.0.0.1:8000/api/todos"))
                .data;
            setTodos(data);
        } catch (e) {
            alert(e.message);
        } finally {
            setLoading(false);
        }
    };

    const updateStatusClickHandler = async (id, st) => {
        const config = {
            headers: { "Content-Type": "application/json" },
        };
        try {
            setLoading(true);
            let res = await axios.put(
                `http://127.0.0.1:8000/api/todos/update-status/${id}`,
                JSON.stringify({ status: st }),
                config
            );
            if (res.status === 200) {
                alert("status updated!");
                getTodod();
                return;
            }
            alert("operation failed-_-");
        } catch (error) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };
    const deleteClickHandler = async (id) => {
        try {
            setLoading(true);
            let res = await axios.put(`http://127.0.0.1:8000/api/todos/${id}`);
            if (res.status === 200) {
                alert("todo deleted!");
                getTodod();
                return;
            }
            alert("operation failed-_-");
        } catch (error) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getTodod();
        return () => {
            setTodos([]);
        };
    }, []);

    if (loading) return <Loading />;

    return (
        <div className={[classes.todos, "container"].join(" ")}>
            <div className={classes.todos__header}>
                <h1 className="heading--tertiary">Totol Todos : {todos?.length}</h1>
                <IconButton
                    onClick={() => history.push("add-todo")}
                    style={{ borderRadius: "0" }}
                >
                    <span
                        style={{
                            color: "#333",
                            fontSize: "1.8rem",
                            marginLeft: ".5rem",
                        }}
                    >
                        Add New Todo
          </span>{" "}
                    <AddIcon
                        fontSize="large"
                        style={{ fontSize: "3.2rem", color: "#333" }}
                    />
                </IconButton>
            </div>
            <Hr />
            {todos?.length &&
                todos.map((t, i) => (
                    <Todo
                        key={i}
                        todo={t}
                        updateStatusClickHandler={updateStatusClickHandler}
                        deleteClickHandler={deleteClickHandler}
                    />
                ))}
        </div>
    );
};

export default Todos;
