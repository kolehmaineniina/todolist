import { useRef, useState } from "react";
import TodoTable from "./Todotable";
import { Todo } from './types';

function TodoList() {
const [todo, setTodo] = useState<Todo>({description: '', date: ""});
const [todos, setTodos] = useState<Todo[]>([]);

const addTodo = () => {
    !todo.description && inputRef.current ?
    inputRef.current.focus() : (
    setTodos([...todos, todo])
    );
    setTodo({...todo, description: ""});
};

const deleteTodo = (index: number) => setTodos(() => todos.filter((todo, i) => i !== index));

const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodo({...todo, [event.target.name]: event.target.value});
};

const inputRef = useRef<HTMLInputElement>(null);

return (
    <>
        <h1>Simple Todolist</h1>
            <div className="container">
                <label>Description:</label>
                <input
                    
                    ref={inputRef}
                    type="text"
                    name="description"
                    placeholder="Enter description"
                    onChange = {handleChange}
                    value = {todo.description}
                />
                <label>Date:</label>
                <input
                    id="date"
                    type="date"
                    name="date"
                    placeholder="yyyy-mm-dd"
                    onChange = {handleChange}
                    value = {todo.date}
                />
                <button className="add-button" onClick = {addTodo}>Add Todo</button>
            </div>
        <TodoTable todoList={todos} handleDeletes={deleteTodo} />
    </>
)}

export default TodoList;