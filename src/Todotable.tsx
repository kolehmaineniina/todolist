import './App.css'
import { TodoTableProps } from './types'; 

const formatDateInput = (inputdate: string) => 
    new Date(inputdate).toLocaleDateString("fi-FI");

function TodoTable(props: TodoTableProps) {
    return (
        <table>
            <thead>
                <tr>
                    <th>Description</th>
                    <th>Date</th>
                    <th>Priority</th>
                </tr>
            </thead>
            <tbody>
                {props.todoList.map((todo, index) => (
                    <tr key={index}>
                        <td>{todo.description}</td>
                        <td>{formatDateInput(todo.date)}</td>
                        <td>{todo.priority}</td>
                        <button className="delete-button" onClick={() => props.handleDeletes(index)}>Delete</button>
                    </tr>
                ))}  
            </tbody>
        </table>
    ); 
}

export default TodoTable;