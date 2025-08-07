import { useRef } from "react";

export default function postData({onNewTask}: {onNewTask: (newMessage: string) => void}) {

    const inputRef = useRef<HTMLInputElement>(null);

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const value = inputRef.current?.value;
        if (value === undefined || value.trim() === "") {
            alert("Please enter some text before submitting.");
            return;
        }
        if (inputRef.current) {
            inputRef.current.value = "";
        }
        onNewTask(value);
    }

    return (
        <div className="flex items-center justify-center w-full">
            <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row items-center justify-center mt-6 gap-2 w-full max-w-xl mx-auto"
            >
                <input
                    ref={inputRef}
                    type="text"
                    name="inputField"
                    placeholder="Enter your task..."
                    className="w-full md:flex-1 px-4 py-2 rounded-lg border border-zinc-600 bg-zinc-800 text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
                <button
                    type="submit"
                    className="px-5 py-[9px] bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-sm transition-all cursor-pointer w-full sm:w-auto"
                >
                    Submit
                </button>
            </form>
        </div>
    )
}