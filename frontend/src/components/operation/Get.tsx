import { useState } from "react";

type GetProps = {
    todos: { id: number; task: string }[];
    deleteTodo: (index: number) => void;
    updateTodo: (id: number, editedTodo: string) => void;
};

export default function fetchData({ todos, deleteTodo, updateTodo }: GetProps) {

    const [editingId, setEditingId] = useState<number | null>(null);

    const [editedTodo, setEditedTodo] = useState<string>("");

    return (
        <div className="">
        {todos && todos.length > 0 ? (
            <div className="max-w-xl mx-auto space-y-4 bg-gray-800 rounded-xl px-3 py-5">
                <h2 className="text-2xl font-bold text-center text-white">Fetched Messages</h2>
            
                <ul className="space-y-5">
                    {[...todos]
                    .sort((a, b) => a.id - b.id)
                    .map(todo => (
                        <li
                            key={todo.id}
                            className="flex flex-col sm:flex-row justify-between bg-zinc-800 shadow-sm rounded-xl px-4 py-3 border border-zinc-700 hover:shadow-md transition-all duration-200 sm:gap-0 gap-2"
                        >
                            {todo.id === editingId ? (
                                <input
                                    type="text"
                                    defaultValue={todo.task}
                                    onChange={(e) => {
                                        setEditedTodo(e.target.value)
                                    }}
                                    className="w-full border text-zinc-100 mr-2 p-2 rounded-md text-start"
                                />
                            ) : (
                                <span className="text-zinc-100 break-all flex items-center justify-center">{todo.task}</span>
                            )}
                            <div className="flex flex-col sm:flex-row gap-2">
                                {todo.id === editingId ? (
                                    <button
                                        onClick={() => {
                                            updateTodo(todo.id, editedTodo);
                                            setEditingId(null);
                                            setEditedTodo("");
                                        }}
                                        className="text-sm bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-3 rounded-lg cursor-pointer"
                                    >
                                        Save
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => {
                                            setEditingId(todo.id);
                                            setEditedTodo(todo.task);
                                        }}
                                        className="text-sm bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-3 rounded-lg cursor-pointer"
                                    >
                                        Edit
                                    </button>
                                )}
                                <button
                                    onClick={() => deleteTodo(todo.id)}
                                    className="text-sm bg-red-600 hover:bg-red-700 text-white font-medium py-1 px-3 rounded-lg transition-all duration-150 cursor-pointer"
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>          
        ) : (
            <div className="flex justify-center">
                <p>No todos found.</p>
            </div>
        )}
        </div>
    )
}