import React, { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CreateCommentForm from "./CreateCommentForm";
import CommentCard from "./CommentCard";
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchIssueById, updateIssueStatus } from "../../redux/Issue/IssueAction";
import { store } from "../../redux/Store";
import { fetchComment } from "../../redux/comments/comAction";


const IssueDetails = () => {
  

  const {projectId,issueId}=useParams();

  console.log("Project ID:", projectId, "Issue ID:", issueId);

  const dispatch=useDispatch();

  const navigate=useNavigate();
  const handleUpdateIssueStatus=(status)=>
  {
    console.count(status)
    dispatch(updateIssueStatus({ id:issueId, status }))
  }

  const {issue,comment}=useSelector(store=>store)

  console.log("Issues Details Issues",issue);
                              

 
  useEffect(()=>
  {
    dispatch(fetchIssueById(issueId))
     dispatch(fetchComment(issueId))
  },[issueId])

  return (
    <div className="px-20 py-8 text-gray-400 bg-[#0b1120]/90">
      <div className="flex justify-between border p-10 rounded-lg">
        <ScrollArea className="h-[65vh] w-[60%] text-gray-200">
          <div>
            <h1 className="text-lg font-semibold text-white cursor-pointer" onClick={()=>navigate(`/project/${projectId}`)} >
              {issue.issueDetails?.title}
            </h1>

            <div className="py-5">
              <h2 className="font-semibold text-gray-400">Description:</h2>
              <p className="text-gray-400 text-sm mt-2">
              {issue.issueDetails?.description}  
              </p>
            </div>

            <div className="mt-5">
              <h1 className="pb-3">Activity</h1>

              <Tabs defaultValue="all" className="w-[400px] bg-gray-900 text-white rounded-lg shadow-lg overflow-hidden">
                <TabsList className="bg-gray-800 rounded-t-lg flex border-b border-gray-700">
                  <TabsTrigger value="all" className="flex-1 text-center py-2 font-semibold hover:bg-gray-700 data-[state=active]:bg-gray-600 data-[state=active]:text-white transition-colors duration-200">
                    All
                  </TabsTrigger>
                  <TabsTrigger value="comments" className="flex-1 text-center py-2 font-semibold hover:bg-gray-700 data-[state=active]:bg-gray-600 data-[state=active]:text-white transition-colors duration-200">
                    Comments
                  </TabsTrigger>
                  <TabsTrigger value="history" className="flex-1 text-center py-2 font-semibold hover:bg-gray-700 data-[state=active]:bg-gray-600 data-[state=active]:text-white transition-colors duration-200">
                    History
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="p-4 bg-gray-800 rounded-b-lg text-gray-200">
                  All content goes here.
                </TabsContent>

                <TabsContent value="comments" className="p-4 bg-gray-800 rounded-b-lg text-gray-200">
                  <CreateCommentForm
                    issueId={issueId}
                    
                  />

                  {/* Display comments */}
                  <div className="mt-4 space-y-2 max-h-64 overflow-y-auto">
                    {/* {comments.map((c, idx) => (
                      <div key={idx} className="bg-gray-700 p-2 rounded text-gray-100">
                        {c}
                      </div>
                    ))} */}
                    {
                        comment.comments.map((item)=>
                        <CommentCard key={item.id} comment={item}/>)
                    }
                  </div>
                </TabsContent>

                <TabsContent value="history" className="p-4 bg-gray-800 rounded-b-lg text-gray-200">
                  History content goes here.
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </ScrollArea>

        <div className="w-[35%] space-y-2">
            <Select onValueChange={handleUpdateIssueStatus}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="To Do" />
                </SelectTrigger>
                <SelectContent className="bg-[#0b1120]/90 text-white">
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="pending">To Do</SelectItem>
                    <SelectItem value="done">Done</SelectItem>
                </SelectContent>
            </Select>

            <div className="border rounded-lg">
                <p className="border-b py-3 px-5">Details</p>

                <div className="p-5">
                    <div className="space-y-7">
                        <div className="flex gap-10 items-center">
                            <p className="w-[7rem]">Assignee</p>
                            {
                              issue.issueDetails?.assignee?.name ?
                              <div className="bg-[#0b1120]/90 flex gap-2 items-center">
                                 <Avatar className="h-8 w-8 text-xs">
                                    <AvatarFallback className="bg-gray-600">{issue.issueDetails?.assignee.name[0].toUpperCase()}</AvatarFallback>
                                </Avatar>
                                <p>{issue.issueDetails?.assignee?.name}</p>
                            </div>:
                            <p>Un-Assigned</p>
                            }
                        </div>

                         <div className="flex gap-10 items-center">
                            <p className="w-[7rem]">Labels</p>
                            <p>None</p>
                        </div>

                         <div className="flex gap-10 items-center">
                            <p className="w-[7rem]">Status</p>
                            <Badge className="bg-amber-400 text-black font-semibold" >{issue.issueDetails?.status}</Badge>
                        </div>

                        <div className="flex gap-10 items-center">
                            <p className="w-[7rem]">Realese</p>
                            <p>{issue.issueDetails?.dueDate}</p>
                        </div>

                         <div className="flex gap-10 items-center">
                            <p className="w-[7rem]">Reporter</p>
                            <div className="bg-[#0b1120]/90 flex gap-2 items-center">
                                 <Avatar className="h-8 w-8 text-xs">
                                    <AvatarFallback className="bg-gray-600">V</AvatarFallback>
                                </Avatar>
                                <p>{}</p>
                            </div>
                        </div>

                    </div>

                </div>
            </div>

        </div>
      </div>
    </div>
  );
};

export default IssueDetails;
