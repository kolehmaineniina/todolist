import { Todo } from './types'
import { useRef, useState } from "react"

import { AgGridReact } from "ag-grid-react"
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'
import { ColDef } from "ag-grid-community"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import MenuItem from "@mui/material/MenuItem"
import Stack from "@mui/material/Stack"
import Box from "@mui/material/Box"

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import 'dayjs/locale/de'
import { DatePicker } from '@mui/x-date-pickers'

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

function TodoList() {
    const [columnDefs] = useState<ColDef<Todo>[]>([
        {field: "description", filter: true, floatingFilter: true, sortable: false, flex:2},
        {field: "priority", floatingFilter: true, filter: true, flex:1, 
            cellStyle: (params) =>
            params.value === "High" ? { color: "red" } : { color: "black" },
        },
        {field: "date", filter: true, floatingFilter: true, flex:1,
            valueFormatter: (params) => params.value? params.value.format("DD.MM.YYYY") : ""
        },
    ]);

    const [todos, setTodos] = useState<Todo[]>([]);
    const [todo, setTodo] = useState<Todo>({description: "", date: null, priority: "Low"});

    const addTodo = () => {
        !todo.description && inputRef.current ?
        inputRef.current.focus() : (
        setTodos([...todos, todo])
        );
        setTodo({...todo, description: "", date: null, priority: selectRef.current?.value || "Low"});
    };

    const deleteTodo = () => gridRef.current?.api.getSelectedNodes().length ? setTodos(() => todos.filter((_todo, i) => i !== Number(gridRef.current?.api.getSelectedNodes()[0].id))) : alert("Select a row first!");

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>) => {
        setTodo({...todo, [event.target.name]: event.target.value});
    };

    const inputRef = useRef<HTMLInputElement>(null);
    const selectRef = useRef<HTMLInputElement>(null);
    const gridRef = useRef<AgGridReact<Todo>>(null);

    return (
        <>
        <Box sx={{ maxWidth: 1000, mx: "auto", width: "100%"}}>
            <Stack spacing={3} sx={{ py: 3, px: 3, height: "90vh" }}>
                <Stack direction="row" spacing={2}>
                        <TextField sx={{flex: 2}}
                            type="text"
                            name="description"
                            label="Description"
                            variant="standard"
                            ref={inputRef}
                            onChange={handleChange}
                            value = {todo.description}
                        />
                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
                            <DatePicker
                                label="Date"
                                value={todo.date}
                                onChange={(dayjsDate) => {setTodo({...todo, date:dayjsDate})}}
                            /> 
                        </LocalizationProvider> 
                        <TextField
                            select
                            label="Priority"
                            name="priority"
                            variant="standard"
                            ref={selectRef}
                            value={todo.priority}
                            onChange={handleChange}
                        >
                            <MenuItem value="Low">Low</MenuItem>
                            <MenuItem value="Medium">Medium</MenuItem>
                            <MenuItem value="High">High</MenuItem>
                        </TextField>
                    </Stack>
                    <Stack direction="row" spacing={2}>
                        <Button 
                            variant="outlined"
                            color="success"
                            size="medium"
                            onClick = {addTodo}>Add</Button>
                        <Button variant="outlined" color="error" size="small" onClick={deleteTodo}>Delete</Button>
                    </Stack>
                    <Box sx={{height: "100%", width: "100%"}}>
                    <AgGridReact 
                        className="ag-theme-alpine"
                        ref={gridRef}
                        rowData={todos}
                        columnDefs={columnDefs}
                        rowSelection="single"
                        animateRows={true}
                    />
                    </Box>
            </Stack>
        </Box>
        </>
    )}

export default TodoList;