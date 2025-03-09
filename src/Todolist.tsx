import { useEffect, useRef, useState } from "react";
import { Todo } from './types';
import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'; 
import { ColDef } from "ag-grid-community"

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

function TodoList() {
    const [columnDefs] = useState<ColDef<Todo>[]>([
        {field: "description", filter: true, floatingFilter: true, sortable: false, flex:2},
        {field: "priority", floatingFilter: true, filter: true, flex:1, 
            cellStyle: (params) =>
            params.value === "High" ? { color: "red" } : { color: "black" },
        },
        {field: "date", filter: true, floatingFilter: true, flex:1},
    ])

    const [todos, setTodos] = useState<Todo[]>([]);
    const [todo, setTodo] = useState<Todo>({description: "", date: "", priority: ""});

    useEffect(() => setTodo(
        {...todo, priority: selectRef.current?.value || "Low"}
        ),[]);

    const addTodo = () => {
        !todo.description && inputRef.current ?
        inputRef.current.focus() : (
        setTodos([...todos, todo])
        );
        setTodo({...todo, description: "", date:"", priority: ""});
    };

    const deleteTodo = () => gridRef.current?.api.getSelectedNodes().length ? setTodos(() => todos.filter((todo, i) => i !== Number(gridRef.current?.api.getSelectedNodes()[0].id))) : alert("Select a row first!");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setTodo({...todo, [event.target.name]: event.target.value});
    };

    const inputRef = useRef<HTMLInputElement>(null);
    const selectRef = useRef<HTMLSelectElement>(null);
    const gridRef = useRef<AgGridReact<Todo>>(null);

    return (
        <>
            <div className="column-container">
            <h1>Simple Todolist</h1>
                <div className="column-container">
                    <div className="row-container">
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
                    <label>Priority:</label>
                    <select
                        ref={selectRef}
                        name="priority"
                        value={todo.priority}
                        onChange={handleChange}
                    >
                        <option value="Low" selected>Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                    </div>
                    <div className="row-container">
                    <button id="add-button" onClick = {addTodo}>Add Todo</button>
                    <button id="delete-button" onClick={deleteTodo}>Delete Todo</button>
                    </div>
                </div>
                </div>
                <div id="grid-container">
                    <AgGridReact
                        className="ag-theme-alpine"
                        ref={gridRef}
                        rowData={todos}
                        columnDefs={columnDefs}
                        rowSelection="single"
                        animateRows={true}
                    />
                </div>
        </>
    )}

export default TodoList;