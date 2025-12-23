import React, { useState } from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function Signup() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        password2: "",
    });

    const [passErr, setpassErr] = useState('');
    const [mailErr, setmailErr] = useState('');

    function getData(e) {
        const name = e.target.name;
        const value = e.target.value;
        setForm((prev) => ({ ...prev, [name]: value }));
    }

    async function setData(e) {
        e.preventDefault();

        
        if (!form.email.includes("@gmail.com")) {
            setmailErr("Valid email is required");
            return;
        } else {
            setmailErr("");
        }

        if (form.password.length < 4) {
            setpassErr("Password must be at least 4 characters");
            return;
        }

        if (form.password !== form.password2) {
            setpassErr("Passwords do not match");
            return;
        } else {
            setpassErr("");
        }

        try {
            
            const res = await axios.post("https://medizone.duckdns.org/medicals/auth/register/", {
                username: form.name,      
                email: form.email,
                password: form.password,
                password2: form.password2,
            });

            console.log("REGISTER SUCCESS:", res.data);
            setmailErr("");
            setpassErr("");
            navigate('/login');
        } catch (err) {
            console.log("REGISTER ERROR:", err.response?.data || err.message);

            const data = err.response?.data;

           
            if (data?.email) {
                setmailErr(Array.isArray(data.email) ? data.email.join(" ") : String(data.email));
            }

            if (data?.password || data?.password2 || data?.non_field_errors) {
                setpassErr(
                    (data.password && data.password.join(" ")) ||
                    (data.password2 && data.password2.join(" ")) ||
                    (data.non_field_errors && data.non_field_errors.join(" "))
                );
            }
        }
    }

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4">
            <div className="max-w-md w-full space-y-8">

                <div className="text-center">
                    <div className="mx-auto h-16 w-16 bg-gradient-to-r from-gray-600 to-gray-800 rounded-2xl flex items-center justify-center shadow-2xl border border-gray-700">
                        <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </div>
                    <h2 className="mt-6 text-3xl font-bold text-white">
                        Join Us Today
                    </h2>
                    <p className="mt-2 text-sm text-gray-400">
                        Create your account and start your journey
                    </p>
                </div>

                <div className="bg-gray-900 rounded-3xl shadow-2xl p-8 border border-gray-800">
                    <form onSubmit={setData} className="space-y-6">
                        
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300 block">
                                Username
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    name="name"
                                    onChange={getData}
                                    required
                                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all duration-200 hover:border-gray-600"
                                    placeholder="Enter your full name"
                                />
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                    <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300 block">
                                Email Address
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    name="email"
                                    onChange={getData}
                                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all duration-200 hover:border-gray-600"
                                    placeholder="example@gmail.com"
                                />
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                    <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                    </svg>
                                </div>
                            </div>
                            {mailErr && (
                                <div className="flex items-center space-x-2 text-red-400 text-sm">
                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span>{mailErr}</span>
                                </div>
                            )}
                        </div>

                        
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300 block">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type="password"
                                    name="password"
                                    onChange={getData}
                                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all duration-200 hover:border-gray-600"
                                    placeholder="Create a secure password"
                                />
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                    <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300 block">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <input
                                    type="password"
                                    name="password2"
                                    onChange={getData}
                                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all duration-200 hover:border-gray-600"
                                    placeholder="Re-type your password"
                                />
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                    <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                            </div>
                            {passErr && (
                                <div className="flex items-center space-x-2 text-red-400 text-sm">
                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span>{passErr}</span>
                                </div>
                            )}
                        </div>

                       
                        <button
                            type="submit"
                            className="w-full bg-white hover:bg-gray-100 text-black font-semibold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-900 shadow-lg"
                        >
                            Create Account
                        </button>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-700" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-gray-900 text-gray-400">Already have an account?</span>
                            </div>
                        </div>

                        
                        <button
                            type="button"
                            onClick={() => navigate('/login')}
                            className="w-full bg-gray-800 hover:bg-gray-700 text-white font-medium py-3 px-4 rounded-xl transition-all duration-200 border border-gray-700 hover:border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                        >
                            Sign In Instead
                        </button>
                    </form>
                </div>

                
                <p className="text-center text-xs text-gray-500">
                    By creating an account, you agree to our{' '}
                    <span className="text-gray-300 hover:text-white cursor-pointer transition-colors">Terms of Service</span>
                    {' '}and{' '}
                    <span className="text-gray-300 hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
                </p>
            </div>
        </div>
    );
}

export default Signup;
