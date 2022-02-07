import { createContext, useState } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";


const AuthContext = createContext()
export default AuthContext


export const AuthProvider = ({ children }) => {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [user, setuser] = useState(() => localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null);

  const [authToken, setAuthToken] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null);

  let loginUser = async (e) => {
    e.preventDefault()
    console.log("Form Submitted")
    let response = await fetch("http://127.0.0.1:8000/api/token/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ "username": e.target.username.value, "password": e.target.password.value })
    })
    let data = await response.json()
    console.log("Data:", data)
    console.log("Response:", response)

    if (response.status === 200) {
      localStorage.setItem('authTokens', JSON.stringify(data))
      setAuthToken(data)
      setuser(jwt_decode(data.access))
      navigate('/')
    } else {
      alert("Something went wrong")
    }
  }

  let logoutUser = () => {
    setAuthToken(null);
    setuser(null);
    localStorage.removeItem('authTokens')
    navigate('/login')
  }

  let updateToken = async () => {
    console.log("Update Token called")
    let response = await fetch("http://127.0.0.1:8000/api/token/refresh/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ "refresh": authToken?.refresh })
    })

    let data = await response.json()

    if (response.status === 200) {
      localStorage.setItem('authTokens', JSON.stringify(data))
      setAuthToken(data)
      setuser(jwt_decode(data.access))
    } else {
      logoutUser()
    }

    if (loading) {
      setLoading(false)
    }
  }

  let ContextData = {
    user: user,
    loginUser: loginUser,
    logoutUser: logoutUser,
    updateToken: updateToken,
    authToken: authToken,
  }

  useEffect(() => {

    if (loading) {
      updateToken()
    }
    let timer = 1000 * 4 * 60 + 50 * 1000; // 4 min and 50 sec
    let interval = setInterval(() => {
      if (authToken) {
        updateToken()
      }
    }, timer)
    return () => clearInterval(interval)
  }, [authToken, loading]);


  return (
    <AuthContext.Provider value={ContextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  )
}