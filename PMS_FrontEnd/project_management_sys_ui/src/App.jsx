import { useState } from 'react'
import './index.css'
import { Button } from "@/components/ui/button"
import Home from './Pages/Home/Home'
import Navbar from './Pages/Navbar/Navbar'
import {Routes,Route} from 'react-router-dom'
import ProjectDetails from './Pages/ProjectDetails/ProjectDetails'
import IssueDetails from './Pages/IssuesDetails/IssueDetails'
import Subscription from './Pages/Upgrades/Subscription'
import Auth from './Pages/Auth/Auth'
import Login from './Pages/Auth/Login'
import Register from './Pages/Auth/Register'




function App() {
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <>
      {isAuthenticated ? (
        <div>
          <Navbar />
          <main className="pt-6">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/project/:id" element={<ProjectDetails />} />
              <Route
                path="/project/:proj_id/issue/:issue_id"
                element={<IssueDetails />}
              />
              <Route path="/upgrade_plan" element={<Subscription />} />
            </Routes>
          </main>
        </div>
      ) : (
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      )}
    </>
  );
}

export default App
