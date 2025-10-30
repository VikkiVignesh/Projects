import { useState,useEffect } from 'react'
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
import { useDispatch, useSelector } from 'react-redux'
import { getUser } from './redux/Auth/Action'
import { store } from './redux/Store'
import { fetchProjects } from './redux/projects/ProjecActions'





function App() {

  const dispatch=useDispatch();

  const {auth}=useSelector(store=>store)


  useEffect(()=>{
    dispatch(getUser())
    dispatch(fetchProjects({}))
  }
  ,[auth.jwt])

  console.log(auth)
  

  return (
    <>
      {
      auth.user ? (
        <div>
          <Navbar />
          <main className="pt-6">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/project/:id" element={<ProjectDetails />} />
              <Route
                path="/project/:projectId/issue/:issueId"
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
