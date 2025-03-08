import axios from "axios"
import { Suspense, useEffect } from "react"
import { Route, BrowserRouter, Routes, Navigate } from "react-router"

// Core
import routers from "./core/router"

// Components
import Navbar from "./components/navbar"


const App = () => {

  useEffect(() => {
    axios.get('/task')
      .then(res => console.log(res.data))
      .catch(err => console.log(err))
  }, [])

  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          {
            routers.map(router => (
              <Route key={router.id} path={router.path} Component={router.component} />
            ))
          }
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App