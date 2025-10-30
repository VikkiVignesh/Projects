import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useDispatch, useSelector } from "react-redux"
import { store } from "../../redux/Store"
import { assignUserToIssue } from "../../redux/Issue/IssueAction"

const UserList = ({issueDetails}) => {

  const dispatch=useDispatch()
  
  const handleIssueAssign=(userId)=>
  {
    dispatch(assignUserToIssue({ issueId:issueDetails.id, userId }))
  }

  const {project} =useSelector(store=>store)

  return (
    <div className="space-y-2 ">
        <div className="border bg-[#0b1120]/90 border-gray-700 rounded-md">
          <p className="py-2 px-3"> {issueDetails.assignee?.name || "Unassigned"}</p>
        </div>
        {
          project.projectDetails?.team.map((item)=>
          <div key={item} 
          
          onClick={()=>handleIssueAssign(item.id)}
          className="py-2 group hover:bg-slate-800 cursor-pointer flex
        items-center space-x-4 rounded-md border  bg-[#0b1120]/90 border-gray-700 px-4">
            <Avatar className="bg-[#0b1120]/90 text-gray-400 border">
                <AvatarFallback className="bg-[#0b1120]/90">
                    {item.name[0]}
                </AvatarFallback>
            </Avatar>
            <div className="space-y-1">
                <p className="text-sm leading-non">{item.name}</p>
                <p className="text-sm text-muted-foreground">@{item.name.toLowerCase()}</p>
            </div>
        </div>
          )
        }
      
    </div>
  )
}

export default UserList
