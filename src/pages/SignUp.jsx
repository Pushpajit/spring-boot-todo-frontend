import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query';
import { registerUser } from '../services/service';


function SignUp() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    const navigate = useNavigate();


    const mutation = useMutation({
        mutationFn: registerUser,
        onSuccess: (_, variables) => {
            alert("User Successfully Registered!!");
            variables.id = _.id;
            console.log(_, variables);
            localStorage.setItem('currentUser', JSON.stringify(variables));
            navigate("/");
        },

        onError: (err) => {
            alert("Something Went Wrong: " + err);
        }
    })


    const handleSubmit = async (e) => {
        e.preventDefault();
        if(username === '' || password === ''){
            alert("Username or Password is missing!!!");
        }else{
            mutation.mutate({username: username, password: password});
        }
        // await registerUser(username, password);
    }

    

    return (
        <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Create New Account
                    </h2>
                </div>
                
                <form className="mt-8 space-y-6">
                    <input type="hidden" name="remember" defaultValue="true" />
                    <div className="rounded-md shadow-sm space-y-5">
                        <div>
                            <label htmlFor="email-address" className="sr-only">
                                Username
                            </label>
                            <input
                                id="email-address"
                                name="email"
                                type="text"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => {setUsername(e.target.value)}}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => {setPassword(e.target.value)}}
                            />
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="text-sm">
                            <a
                                className="font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer"
                                onClick={() => { navigate("/signin") }}
                            >
                                Already have an account? Sign in
                            </a>
                        </div>
                        <div>
                            <button
                                className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                disabled = {mutation.isPending}
                                onClick={handleSubmit}
                            >
                                Sign up
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignUp
