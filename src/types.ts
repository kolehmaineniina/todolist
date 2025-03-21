import { Dayjs } from "dayjs";

export type Todo = {
    description: string;
    date: Dayjs | null;
    priority: string;
}

export type TodoTableProps = {
    todoList: Todo[];
    handleDeletes: (row: number) => void;
}