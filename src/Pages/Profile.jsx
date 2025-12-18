// import axios from 'axios';
// import React, { useEffect, useState } from 'react'
// import toast, { Toaster } from 'react-hot-toast';
// import { useNavigate } from 'react-router-dom';
// import Navbar from './Navbar';

// function Profile() {
//   let [name, setName] = useState("")
//   let [email, setEmail] = useState("")
//   let [password, setPassword] = useState("")
//   let [editing, setEditing] = useState(false)
//   let [nameError, setNameError] = useState("");
//   let [emailError, setEmailError] = useState("");
//   // let [passwordError, setPasswordError] = useState("");
//   const navigate = useNavigate()

//   const userId = localStorage.getItem("user");

//   useEffect(() => {

//     const fetchUser = async () => {
//       try {
//         const token = localStorage.getItem("access");
//         if (!token) {
//           toast.error("Please login first");
//           navigate("/login");
//           return;
//         }

//         const res = await axios.get(
//           'http://127.0.0.1:8000/medicals/auth/self/',
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );


//         setName(res.data.username);
//         setEmail(res.data.email);
//         setPassword("");
//       } catch (err) {
//         console.error("Error fetching profile:", err);
//         toast.error("Failed to load profile");
//       }
//     };

//     if (userId) {
//       fetchUser();
//     }
//   }, [userId, navigate]);

//   const Save = async () => {
//     if (!name || !email || nameError || emailError) {
//       toast.error("Please fix all errors before saving!");
//       return;
//     }

// try {
//       const token = localStorage.getItem("access");
//       if (!token) {
//         toast.error("Please login first");
//         navigate("/login");
//         return;
//       }

//       await axios.patch(
//         'http://127.0.0.1:8000/medicals/auth/self/',
//         {
//           // backend expects: username, email
//           username: name,
//           email: email,
//           // password will be handled later, so not sending it now
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );


//       localStorage.setItem("name", name);
//       localStorage.setItem("email", email);


//       toast.success("Profile updated successfully!");
//       setEditing(false);
//     } catch (err) {
//       console.error("Error updating profile:", err);
//       toast.error("Failed to save profile!");
//     }
//   };


//   const logout = () => {

//     localStorage.removeItem("name");
//     localStorage.removeItem("email");
//     localStorage.removeItem("password");
//     localStorage.removeItem("access");
//     navigate("/"); 
//   }

//   return (
//     <div>
//       <Navbar />

//       <div className="p-6 min-h-screen bg-black text-white flex justify-center items-start">
//         <Toaster position="top-right" />


//         <div className="w-full max-w-md bg-gray-800 p-6 rounded border-4 border-gray-700 text-center">

//           {/* Profile emoji circle */}
//           <div className="flex flex-col items-center mb-4">
//             <div className="w-32 h-32 rounded-full border-4 border-gray-600 flex items-center justify-center text-6xl bg-gray-700">
//               👤
//             </div>
//           </div>

//           <h2 className="text-2xl font-bold mb-2">Profile Page</h2>
//           <p className="mb-6 text-lg">Welcome, {name || "user"}</p>


//           <div className='mt-4'>
//             <label className="block mb-1 font-semibold">Name:</label>
//             <input type='text' placeholder='Enter your Name' value={name}
//               className="px-3 py-2 rounded text-white w-full bg-black focus:border-blue-500 focus:outline-none"
//               onChange={(e) => {
//                 setName(e.target.value);
//                 setNameError(e.target.value.trim() === "" ? "Name Cannot Be Empty" : "")
//               }}
//               disabled={!editing}
//             />
//             {nameError && <p className="text-red-500 text-sm mt-1">{nameError}</p>}
//           </div>


//           <div className="mt-4">
//             <label className="block mb-1 font-semibold">Email:</label>
//             <input type="email" value={email} placeholder="Enter your email"
//               className="px-3 py-2 rounded text-white w-full bg-black focus:border-blue-500 focus:outline-none"
//               onChange={(e) => {
//                 setEmail(e.target.value);
//                 setEmailError(e.target.value.trim() === "" ? "Email cannot be empty" :
//                   !e.target.value.includes("@") ? "Email must include @" : "")
//               }}
//               disabled={!editing}
//             />
//             {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
//           </div>


//           <div className="mt-4">
//             <label className="block mb-1 font-semibold">Password:</label>
//             <input type="password" value={password} placeholder="Enter your Password"
//               className="px-3 py-2 rounded text-white w-full bg-black focus:border-blue-500 focus:outline-none"
//               onChange={(e) => {
//                 setPassword(e.target.value);
//                 setPasswordError(e.target.value.trim() === "" ? "Password cannot be empty" :
//                   e.target.value.length < 4 ? "Password must be at least 4 characters" : "")
//               }}
//               disabled={!editing}
//             />
//             {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
//           </div>

//           <div className="mt-6 text-left p-4 rounded bg-gray-700">
//             <h3 className="font-bold text-lg mb-2">Profile Preview</h3>
//             <p className="py-1"><span className="font-semibold">Name:</span> {name || "Not set"}</p>
//             <p className="py-1"><span className="font-semibold">Email:</span> {email || "Not set"}</p>
//             <p className="py-1"><span className="font-semibold">Password:</span> {password ? "********" : "Not set"}</p>
//           </div>


//           <button onClick={logout}
//             className="mt-6 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 w-32">
//             Logout
//           </button>
//           <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 w-32"
//             onClick={editing ? Save : () => setEditing(true)}>
//             {editing ? "Save Profile" : "Edit Profile"}
//           </button>

//         </div>
//       </div>
//     </div>

//   )
// }

// export default Profile


import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

function Profile() {
  let [name, setName] = useState("")
  let [email, setEmail] = useState("")
  let [editing, setEditing] = useState(false)
  let [nameError, setNameError] = useState("");
  let [emailError, setEmailError] = useState("");
  const navigate = useNavigate()

  const userId = localStorage.getItem("user");

  useEffect(() => {

    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("access");
        if (!token) {
          toast.error("Please login first");
          navigate("/login");
          return;
        }

        const res = await axios.get(
          'http://127.0.0.1:8000/medicals/auth/self/',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setName(res.data.username);
        setEmail(res.data.email);
      } catch (err) {
        console.error("Error fetching profile:", err);
        toast.error("Failed to load profile");
      }
    };

    if (userId) {
      fetchUser();
    }
  }, [userId, navigate]);

  const Save = async () => {
    if (!name || !email || nameError || emailError) {
      toast.error("Please fix all errors before saving!");
      return;
    }

    try {
      const token = localStorage.getItem("access");
      if (!token) {
        toast.error("Please login first");
        navigate("/login");
        return;
      }

      await axios.patch(
        'http://127.0.0.1:8000/medicals/auth/self/',
        {
          username: name,
          email: email,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      localStorage.setItem("name", name);
      localStorage.setItem("email", email);

      toast.success("Profile updated successfully!");
      setEditing(false);
    } catch (err) {
      console.error("Error updating profile:", err);
      toast.error("Failed to save profile!");
    }
  };

  const logout = () => {
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    localStorage.removeItem("password");
    localStorage.removeItem("access");
    navigate("/");
  }

  return (
    <div>
      <Navbar />

      <div className="p-6 min-h-screen bg-black text-white flex justify-center items-start">
        <Toaster position="top-right" />

        <div className="w-full max-w-md bg-gray-800 p-6 rounded border-4 border-gray-700 text-center">

          {/* Profile emoji circle */}
          <div className="flex flex-col items-center mb-4">
            <div className="w-32 h-32 rounded-full border-4 border-gray-600 flex items-center justify-center text-6xl bg-gray-700">
              👤
            </div>
          </div>

          <h2 className="text-2xl font-bold mb-2">Profile Page</h2>
          <p className="mb-6 text-lg">Welcome, {name || "user"}</p>

          {/* Name */}
          <div className='mt-4'>
            <label className="block mb-1 font-semibold">Name:</label>
            <input
              type='text'
              placeholder='Enter your Name'
              value={name}
              className="px-3 py-2 rounded text-white w-full bg-black focus:border-blue-500 focus:outline-none"
              onChange={(e) => {
                setName(e.target.value);
                setNameError(e.target.value.trim() === "" ? "Name Cannot Be Empty" : "")
              }}
              disabled={!editing}
            />
            {nameError && <p className="text-red-500 text-sm mt-1">{nameError}</p>}
          </div>

          {/* Email */}
          <div className="mt-4">
            <label className="block mb-1 font-semibold">Email:</label>
            <input
              type="email"
              value={email}
              placeholder="Enter your email"
              className="px-3 py-2 rounded text-white w-full bg-black focus:border-blue-500 focus:outline-none"
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError(
                  e.target.value.trim() === ""
                    ? "Email cannot be empty"
                    : !e.target.value.includes("@")
                      ? "Email must include @"
                      : ""
                )
              }}
              disabled={!editing}
            />
            {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
          </div>

          {/* Preview */}
          <div className="mt-6 text-left p-4 rounded bg-gray-700">
            <h3 className="font-bold text-lg mb-2">Profile Preview</h3>
            <p className="py-1"><span className="font-semibold">Name:</span> {name || "Not set"}</p>
            <p className="py-1"><span className="font-semibold">Email:</span> {email || "Not set"}</p>
          </div>

          <button
            onClick={logout}
            className="mt-6 mr-5 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 w-32"
          >
            Logout
          </button>
          <button
            className="mt-6  mb-4 px-4 py-2 bg-blue-600 text-white  rounded hover:bg-blue-700 w-32"
            onClick={editing ? Save : () => setEditing(true)}
          >
            {editing ? "Save Profile" : "Edit Profile"}
          </button>
        
          <button
            className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 w-full"
            onClick={() => navigate("/orders")}
          >
            My Orders
          </button>


        </div>
      </div>
    </div>
  )
}

export default Profile;
