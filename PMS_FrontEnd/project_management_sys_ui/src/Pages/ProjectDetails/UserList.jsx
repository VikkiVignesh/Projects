import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const UserList = () => {
  return (
    <div className="space-y-2 ">
        <div className="border bg-[#0b1120]/90 border-gray-700 rounded-md">
          <p className="py-2 px-3"> {"Vikki" || "Unassigned"}</p>
        </div>
        <div className="py-2 group hover:bg-slate-800 cursor-pointer flex
        items-center space-x-4 rounded-md border  bg-[#0b1120]/90 border-gray-700 px-4">
            <Avatar className="bg-gray-900 text-white">
                <AvatarFallback>
                    V
                </AvatarFallback>
            </Avatar>
            <div className="space-y-1">
                <p className="text-sm leading-non">@Code with Fun</p>
            </div>
        </div>
      
    </div>
  )
}

export default UserList
