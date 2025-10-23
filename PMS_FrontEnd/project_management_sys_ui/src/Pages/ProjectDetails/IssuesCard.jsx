import React from "react"
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DotsVerticalIcon, PersonIcon } from "@radix-ui/react-icons"
import UserList from "./UserList"

const IssuesCard = () => {
  return (
    <Card className="w-full max-w-sm bg-[#0b1120]/80 border border-gray-700 text-white shadow-md hover:shadow-lg transition-all rounded-lg p-3">
      {/* Header */}
      <CardHeader className="flex flex-row items-center justify-between p-0">
        <CardTitle className="text-base font-semibold">Create Navbar</CardTitle>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full hover:bg-gray-800"
            >
              <DotsVerticalIcon className="w-4 h-4 text-gray-300" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-[#0b1120]/95 text-white border border-gray-700 rounded-md">
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>In Progress</DropdownMenuItem>
            <DropdownMenuItem>Done</DropdownMenuItem>
            <DropdownMenuItem className="text-red-400 hover:text-red-500">
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>

      {/* Content */}
      <CardContent className="flex items-center justify-between p-0">
        <p className="text-sm text-gray-300 font-medium">FBP - 1</p>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              size="icon"
              variant="ghost"
              className="rounded-full bg-gray-800 hover:bg-gray-700 p-0"
            >
              <Avatar className="w-8 h-8">
                <AvatarFallback className="bg-gray-600 text-gray">
                  <PersonIcon className="w-4 h-4" />
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="bg-[#0b1120]/95 text-white  border-gray-700 rounded-md">
            <UserList/>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardContent>
    </Card>
  )
}

export default IssuesCard
