export type Todo = {
    description: string;
    date: string;
}

export type TodoTableProps = {
    todoList: Todo[];
    handleDeletes: (row: number) => void;
}