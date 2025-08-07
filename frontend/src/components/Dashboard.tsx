import { useEffect, useState } from "react";

import Post from "./operation/Post";
import Get from "./operation/Get";
import api from "../api/axios";

type dashProps = {
    onLogout: () => void;
};

export default function MessageBoard({ onLogout }: dashProps) {

    type Todo = {
        task: string 
        completed: boolean; 
        id: number; 
        userId: number 
        user: {
            id: number; 
            username: string 
        };
    };

    const [todos, setTodos] = useState<Todo[]>([]);
    const token = `Bearer ${localStorage.getItem("token")}`;

    function fetchTodo() {
        api.get("/todos", { headers: { Authorization: token } })
            .then(response => setTodos(response.data))
            .catch(error => console.error("There was an error fetching the messages:", error)
        )
    }

    function addTodo(newTask: string) {
        api.post("/todos", { task: newTask }, { headers: { Authorization: token } })
            .then(() => fetchTodo())
            .catch(err => console.error("Add error:", err));
    }

    function deleteTodo(id: number) {
        api.delete(`/todos/${id}`, { headers: { Authorization: token } })
            .then(() => fetchTodo())
            .catch(err => console.error("Delete error:", err));
    }

    function updateTodo(id: number, editedTodo: string) {
        api.put(`/todos/${id}`, { task: editedTodo }, { headers: { Authorization: token } })
            .then(() => fetchTodo())
            .catch(err => console.error("Update error:", err));
    }

    useEffect(() => {
        fetchTodo();
    }, []);

    return (
        <div className="space-y-5 sm:space-y-7">
            <div className="bg-gray-800 p-4 shadow-md mb-6">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-white">CRUD</h1>
                    <button
                        onClick={onLogout}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-sm cursor-pointer"
                    >
                        Logout
                    </button>
                </div>
            </div>
            <div className="px-2 space-y-5 sm:space-y-7">
                <Post onNewTask={addTodo} />
                <Get todos={todos} deleteTodo={deleteTodo} updateTodo={updateTodo} />
            </div>
        </div>
    )
}
