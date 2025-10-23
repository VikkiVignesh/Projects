import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from '../../components/ui/button'
import CreateProjectForm from './CreateProjectForm'
import { PersonIcon } from '@radix-ui/react-icons'
import { useNavigate } from 'react-router-dom'


const Navbar = () => {
  const navigate=useNavigate();
  return (
    <div className="sticky top-0 left-0 w-full z-50 border-b bg-[#0b1120]/90 backdrop-blur-md py-4 px-5 flex items-center justify-between">
      
      <div className='flex items-center gap-3'>
        <p className='cursor-pointer  text-white font-semibold' onClick={()=> navigate("/")}>Project Management</p>

        <Dialog>
            <DialogTrigger>
                <Button variant="ghost" className="text-white cursor-pointer">New Project</Button>
            </DialogTrigger>
                  <DialogContent className=" text-white bg-[#0b1120]/90">
                  <DialogHeader>Create New Project</DialogHeader>
                  <CreateProjectForm/>  
                </DialogContent>
        </Dialog>
        <Button variant="ghost" className="text-white">Upgrade</Button>
      </div>

      <div className="flex gap-3 items-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="p-0 w-12 h-12 rounded-full border-2 border-gray-500 overflow-hidden">
              <Avatar className="w-12 h-12">
                <AvatarFallback className="bg-gray-700 text-white text-lg font-semibold">
                  V
                </AvatarFallback>
                {/* Optional: AvatarImage if user has a profile pic */}
                {/* <AvatarImage src="/path/to/profile.jpg" /> */}
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-[#0b1120]/90 text-white rounded-md">
            <DropdownMenuItem className="hover:bg-gray-800 cursor-pointer">
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <p className="text-white font-medium">Vikki</p>
      </div>

    </div>
  )
}

export default Navbar
