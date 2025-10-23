import { useState } from 'react'
import './index.css'
import { Button } from "@/components/ui/button"
import Home from './Pages/Home/Home'
import Navbar from './Pages/Navbar/Navbar'
import {Routes,Route} from 'react-router-dom'
import ProjectDetails from './Pages/ProjectDetails/ProjectDetails'




function App() {
  
  return (
     <>
     <Navbar/>
     <main className="pt-6"> 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/project/:id" element={<ProjectDetails/>} />
        </Routes>
      </main>

     </>
  )
}

export default App
