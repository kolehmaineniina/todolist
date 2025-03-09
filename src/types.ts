export type Todo = {
    description: string;
    date: string;
    priority: number;
}

export type TodoTableProps = {
    todoList: Todo[];
    handleDeletes: (row: number) => void;
}