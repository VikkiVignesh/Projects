import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const UserList = () => {
  return (
    <div className="space-y-2 ">
        <div className="border bg-[#0b1120]/90 border-gray-700 rounded-md">
          <p className="py-2 px-3"> {"Vikki" || "Unassigned"}</p>
        </div>
        {
          [1,1,1].map((item)=>
          <div key={item} className="py-2 group hover:bg-slate-800 cursor-pointer flex
        items-center space-x-4 rounded-md border  bg-[#0b1120]/90 border-gray-700 px-4">
            <Avatar className="bg-[#0b1120]/90 text-gray-400 border">
                <AvatarFallback className="bg-[#0b1120]/90">
                    V
                </AvatarFallback>
            </Avatar>
            <div className="space-y-1">
                <p className="text-sm leading-non">@Code with Fun</p>
            </div>
        </div>
          )
        }
      
    </div>
  )
}

export default UserList
