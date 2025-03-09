export type Todo = {
    description: string;
    date: string;
    priority: string;
}

export type TodoTableProps = {
    todoList: Todo[];
    handleDeletes: (row: number) => void;
}