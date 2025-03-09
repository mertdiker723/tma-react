import { Suspense } from "react"
import { Route, BrowserRouter, Routes, Navigate } from "react-router"

// Core
import routers from "./core/router"

// Components
import Navbar from "./components/navbar"
import { LinearProgress } from "@mui/material"


const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<LinearProgress />}>
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