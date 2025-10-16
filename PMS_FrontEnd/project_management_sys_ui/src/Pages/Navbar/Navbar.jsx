import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

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


const Navbar = () => {
  return (
    <div className="fixed top-0 left-0 w-full z-50 border-b bg-[#0b1120]/90 backdrop-blur-md py-4 px-5 flex items-center justify-between">
      
      <div className='flex items-center gap-3'>
        <p className='cursor-pointer  text-white font-semibold'>Project Management</p>

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

      <div className='flex gap-3 items-center'>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button className="w-12 h-12">
                <PersonIcon className='w-10 h-10 rounded-full text-4xl text-white border-2 border-gray-500'   />
              </Button>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenuTrigger>
          </DropdownMenu>
          <p className='text-white'>Vikki</p>
        </div>
    </div>
  )
}

export default Navbar
