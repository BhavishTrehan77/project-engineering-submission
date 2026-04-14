import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import  {getUser,postUser,patchUser,deleteUser}  from './services/api'
import { useEffect } from 'react'

function App() {
  const [users, setUsers] = useState([])
  const[name,setName]=useState('')
  const[email,setEmail]=useState('')
  const[password,setPassword]=useState('')

  const gdata=async()=>{
    const value=await getUser()
    setUsers(value)
  }
  useEffect(()=>{
    gdata()
  },[])
  const pdata=async()=>{
    const value=await postUser({name,email,password})
    gdata()
  }
  const updatedata=async(id)=>{
    const newName=prompt("Enter your name")
    const newEmail=prompt("Enter your email")
    const newPassword=prompt("Enter your password")
    const value=await patchUser({name:newName,email:newEmail,password:newPassword},id)
    gdata()
  }
  const deletedata=async(id)=>{
    const value=await deleteUser(id)
    gdata()
  }
  return (
    <>
      <h1>User Management</h1>
      <form>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="button" onClick={pdata}>
          Add User
        </button>
      </form>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {user.name} - {user.email}
            <button onClick={() => updatedata(user._id)}>Update</button>
            <button onClick={() => deletedata(user._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </>
  )
}

export default App
