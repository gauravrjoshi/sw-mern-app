import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { BASE_URL } from '../config.js'




const Signup = () => {
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState({
        email: "",
        password: "",
        username: "",
    });
    const { email, password, username } = inputValue;
    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setInputValue({
            ...inputValue,
            [name]: value,
        });
    };

    const handleError = (err) =>
        toast.error(err, {
            position: "bottom-left",
        });
    const handleSuccess = (msg) =>
        toast.success(msg, {
            position: "bottom-right",
        });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(
                BASE_URL + "/signup",
                {
                    ...inputValue,
                },
                { withCredentials: true }
            );
            const { success, message } = data;
            if (success) {
                handleSuccess(message);
                setTimeout(() => {
                    navigate("/");
                }, 1000);
            } else {
                handleError(message);
            }
        } catch (error) {
            console.log(error);
        }
        setInputValue({
            ...inputValue,
            email: "",
            password: "",
            username: "",
        });
    };

    return (
        <div className="max-w-md mx-auto p-8 bg-white border rounded shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Signup Account</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="email" className="block font-medium mb-1">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={email}
                        placeholder="Enter your email"
                        onChange={handleOnChange}
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="username" className="block font-medium mb-1">Username</label>
                    <input
                        type="text"
                        name="username"
                        value={username}
                        placeholder="Enter your username"
                        onChange={handleOnChange}
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block font-medium mb-1">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={password}
                        placeholder="Enter your password"
                        onChange={handleOnChange}
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
                    />
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:bg-blue-600">Submit</button>
                <span className="block mt-4 text-center">
                    Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
                </span>
            </form>
            <ToastContainer />
        </div>
    );
};

export default Signup;