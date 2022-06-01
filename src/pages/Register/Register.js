import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Register(props) {
    return (
        <div className="bg-grey-lighter min-h-screen flex flex-col">
            <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                    <h1 className="mb-8 text-3xl text-center">Sign up</h1>
                    <input type="text" className="block border border-grey-light w-full p-3 rounded mb-4" name="fullname" placeholder="Full Name" />
                    <input type="text" className="block border border-grey-light w-full p-3 rounded mb-4" name="email" placeholder="Email" />
                    <input type="password" className="block border border-grey-light w-full p-3 rounded mb-4" name="password" placeholder="Password" />
                    <input type="password" className="block border border-grey-light w-full p-3 rounded mb-4" name="confirm_password" placeholder="Confirm Password" />

                    <button type="submit" className="w-full text-center py-3 rounded bg-green-400 text-white hover:bg-gray-600 focus:outline-none my-1">Create Account</button>

                    <div className="text-center text-sm text-grey-dark mt-4">
                        By signing up, you agree to the <span> </span>
                        <a className="no-underline border-b border-black text-gray-600" href="true">
                            Terms of Service
                        </a> and <span> </span>
                        <a className="no-underline border-b border-black text-gray-600" href="true">
                            Privacy Policy
                        </a>
                    </div>
                </div>
                <div className="text-grey-dark mt-6">
                    Already have an account?
                    <NavLink className="no-underline border-b border-sky-500 text-blue" to="/login"> <span> </span>
                        Log in
                    </NavLink>.
                </div>
            </div>
        </div>

    )
}
