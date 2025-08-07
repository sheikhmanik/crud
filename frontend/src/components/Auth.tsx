import { useState } from "react";

type authProps = {
    onRegister: (username: String, password: String) => void;
    onLogin: (username: String, password: String) => void;
}

export default function Auth({ onRegister, onLogin }: authProps) {

    const [isLogin, setIsLogin] = useState<boolean>(true);
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    function handleRegister() {
        onRegister(username, password);
    }

    function handleLogin() {
        onLogin(username, password);
    }

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-4">
                    {isLogin ? "Login" : "Register"}
                </h2>

                <form className="space-y-4">
                    <input
                        type="text"
                        placeholder="Username"
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                        required
                        className="w-full px-4 py-2 border rounded-md bg-gray-100 dark:bg-gray-700 text-black dark:text-white"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        required
                        className="w-full px-4 py-2 border rounded-md bg-gray-100 dark:bg-gray-700 text-black dark:text-white"
                    />
                    {isLogin ? (
                        <button
                            type="button"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition"
                            onClick={() => handleLogin()}
                        >
                            Login
                        </button>
                    ) : (
                        <button
                            type="button"
                            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md transition"
                            onClick={() => handleRegister()}
                        >
                            Register
                        </button>
                    )}
                </form>

                <div className="text-center mt-4 text-sm text-gray-600 dark:text-gray-300">
                    {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                    <button
                        onClick={() => setIsLogin(!isLogin)}
                        className="text-blue-500 hover:underline cursor-pointer"
                    >
                        {isLogin ? "Register here" : "Login here"}
                    </button>
                </div>
            </div>
        </div>
    )
}