// import axios from 'axios'
// import React, { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { toast } from 'react-toastify'

// function Login() {
//   const navigate = useNavigate()
//   const [login, setLogin] = useState([])
//   const [user, setUser] = useState('')
//   const [pass, setPass] = useState('')
//   const [error, setError] = useState('')
//   const [success, setSuccess] = useState(false)


//   function username(e) {
//     setUser(e.target.value)
//   }

//   function passsword(e) {
//     setPass(e.target.value)
//   }


//   const fetchData = async () => {
//     try {
//       const res = await axios.get("http://127.0.0.1:8000/medicals/auth/login/")
//       setLogin(res.data)
//     }
//     catch (e) {
//       console.log("error on fetching", e)
//     }
//   }


//   useEffect(() => {
//     fetchData();
//   }, [])

//   function Check(e) {
//     e.preventDefault()
//     const users = login.find(a => {
//       return a.name === user && a.password === pass
//     })

//     console.log(users)
//     if (users) {
//       if (users.isBlock) toast.error("You are blocked")
//       else {
//         console.log("in", users.id)

//         localStorage.setItem("userId", users.id);
//         localStorage.setItem("isLoggedIn", true);
//         localStorage.setItem("name", users.name);
//         localStorage.setItem("email", users.email);
//         localStorage.setItem("password", users.password);

//         console.log(localStorage.getItem("userId"))
//         setError("")
//         setSuccess(true)
//       users.role ==="user"? navigate("/") : navigate("/admin")
//       }
//     } else {
//       setError("Invalid username or password")
//     }
//   }



//   return (
//     <div className="min-h-screen bg-black flex items-center justify-center p-4">
//       <div className="max-w-md w-full space-y-8">
//         {/* Header */}
//         <div className="text-center">
//           <h2 className="mt-6 text-3xl font-bold text-white">Welcome Back</h2>
//           <p className="mt-2 text-sm text-gray-400">Login to continue your journey</p>
//         </div>


//         <div className="bg-gray-900 rounded-3xl shadow-2xl p-8 border border-gray-800">
//           <form onSubmit={Check} className="space-y-6">

//             {/* Username */}
//             <div className="space-y-2">
//               <label className="text-sm font-medium text-gray-300 block">
//                 Username
//               </label>
//               <div className="relative">
//                 <input
//                   type="text"
//                   onChange={username}
//                   required
//                   className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all duration-200 hover:border-gray-600"
//                   placeholder="Enter your username"
//                 />
//                 <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
//                   <svg
//                     className="h-5 w-5 text-gray-500"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
//                     />
//                   </svg>
//                 </div>
//               </div>
//             </div>

//             {/* Password */}
//             <div className="space-y-2">
//               <label className="text-sm font-medium text-gray-300 block">
//                 Password
//               </label>
//               <div className="relative">
//                 <input
//                   type="password"
//                   onChange={passsword}
//                   required
//                   className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all duration-200 hover:border-gray-600"
//                   placeholder="Enter your password"
//                 />
//                 <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
//                   <svg
//                     className="h-5 w-5 text-gray-500"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
//                     />
//                   </svg>
//                 </div>
//               </div>
//             </div>

//             {/* Error Message */}
//             {error && (
//               <div className="flex items-center space-x-2 text-red-400 text-sm">
//                 <svg
//                   className="h-4 w-4"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                   />
//                 </svg>
//                 <span>{error}</span>
//               </div>
//             )}

//             {/* Login Button */}
//             <button
//               type="submit"
//               className="w-full bg-white hover:bg-gray-100 text-black font-semibold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-900 shadow-lg"
//             >
//               Sign In
//             </button>


//             <div className="relative">
//               <div className="absolute inset-0 flex items-center">
//                 <div className="w-full border-t border-gray-700" />
//               </div>
//               <div className="relative flex justify-center text-sm">
//                 <span className="px-2 bg-gray-900 text-gray-400">
//                   Don't have an account?
//                 </span>
//               </div>
//             </div>

//             {/* Sign Up Redirect */}
//             <button
//               type="button"
//               onClick={() => navigate('/signup')}
//               className="w-full bg-gray-800 hover:bg-gray-700 text-white font-medium py-3 px-4 rounded-xl transition-all duration-200 border border-gray-700 hover:border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-900"
//             >
//               Create an Account
//             </button>
//           </form>
//         </div>

//         {/* Footer */}
//         <p className="text-center text-xs text-gray-500">
//           By signing in, you agree to our{" "}
//           <span className="text-gray-300 hover:text-white cursor-pointer transition-colors">
//             Terms of Service
//           </span>{" "}
//           and{" "}
//           <span className="text-gray-300 hover:text-white cursor-pointer transition-colors">
//             Privacy Policy
//           </span>
//         </p>
//       </div>
//     </div>


//   )
// }

// export default Login


import axios from 'axios'
import React, { useState,useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import {cartContext} from '../Context/cartContext'


function Login() {
  const navigate = useNavigate()
  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')
  const [error, setError] = useState('')
  const { reloadCart } = useContext(cartContext);

  function username(e) {
    setUser(e.target.value)
  }

  function passsword(e) {
    setPass(e.target.value)
  }

  // ✅ use backend login API instead of fetching all users
  const Check = async (e) => {
    e.preventDefault()

    if (!user || !pass) {
      setError("Username and password are required")
      return
    }

    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/medicals/auth/login/",
        {
          username: user,
          password: pass,
        },
        {
          withCredentials: true, // so refresh_token cookie is set
        }
      )

      // res.data = { access, user }
      const loggedUser = res.data.user
      const accessToken = res.data.access

      console.log("Logged user",loggedUser);
      

      // Optional: show toast if you want
      // toast.success("Login successful")

      // store in localStorage (adjust as you like)
      localStorage.setItem("access", accessToken)
      localStorage.setItem('admin',loggedUser.is_staff)
      localStorage.setItem("user", JSON.stringify(loggedUser))
      localStorage.setItem("isLoggedIn", "true")

      setError("")

      // If you have role in user object, you can route by it
      // Otherwise, just navigate to home

      await reloadCart();
      console.log('statussssss'+loggedUser.is_staff)

      if (loggedUser.is_staff) {
        navigate("/admin")
      } else {
        navigate("/")
      }
    } catch (err) {
      console.log("LOGIN ERROR:", err.response?.data || err.message)

      if (err.response) {
        if (err.response.status === 401) {
          setError("Invalid username or password")
        } else if (err.response.status === 403) {
          setError("You are blocked")
          toast.error("You are blocked")
        } else {
          setError("Something went wrong. Please try again.")
        }
      } else {
        setError("Network error. Check your server.")
      }
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-white">Welcome Back</h2>
          <p className="mt-2 text-sm text-gray-400">Login to continue your journey</p>
        </div>

        <div className="bg-gray-900 rounded-3xl shadow-2xl p-8 border border-gray-800">
          <form onSubmit={Check} className="space-y-6">

            {/* Username */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 block">
                Username
              </label>
              <div className="relative">
                <input
                  type="text"
                  onChange={username}
                  required
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all duration-200 hover:border-gray-600"
                  placeholder="Enter your username"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <svg
                    className="h-5 w-5 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 block">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  onChange={passsword}
                  required
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all duration-200 hover:border-gray-600"
                  placeholder="Enter your password"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <svg
                    className="h-5 w-5 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="flex items-center space-x-2 text-red-400 text-sm">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>{error}</span>
              </div>
            )}

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-white hover:bg-gray-100 text-black font-semibold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-900 shadow-lg"
            >
              Sign In
            </button>

            <p
              className="mt-3 text-sm text-green-400 cursor-pointer hover:underline"
              onClick={() => navigate("/forgotpassword")}
            >
              Forgot password?
            </p>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-900 text-gray-400">
                  Don't have an account?
                </span>
              </div>
            </div>

            {/* Sign Up Redirect */}
            <button
              type="button"
              onClick={() => navigate('/signup')}
              className="w-full bg-gray-800 hover:bg-gray-700 text-white font-medium py-3 px-4 rounded-xl transition-all duration-200 border border-gray-700 hover:border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-900"
            >
              Create an Account
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-gray-500">
          By signing in, you agree to our{" "}
          <span className="text-gray-300 hover:text-white cursor-pointer transition-colors">
            Terms of Service
          </span>{" "}
          and{" "}
          <span className="text-gray-300 hover:text-white cursor-pointer transition-colors">
            Privacy Policy
          </span>
        </p>
      </div>
    </div>
  )
}

export default Login
