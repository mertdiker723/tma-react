import { Suspense } from "react"
import { Route, BrowserRouter, Routes, Navigate } from "react-router"
import { LinearProgress } from "@mui/material"

// Core
import routers from "./core/router"
import ProtectedRoute from "./core/auth/ProtectedRoute"

// Components
import Navbar from "./components/navbar"

// Screen
import NotFound from "./screen/notFound"
import PublicRoute from "./core/auth/PublicRoute"


const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<LinearProgress />}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          {
            routers.map(router => {
              const { authenticated, component, id, path } = router || {};
              if (authenticated) {
                return (
                  <Route key={id} path={path} element={<ProtectedRoute Component={component} />} />
                )
              }
              return (
                <Route key={id} path={path} element={<PublicRoute Component={component}/>} />
              )
            })
          }
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App