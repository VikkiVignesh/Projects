import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Button } from "../../components/ui/button"
import { useEffect, useState } from "react"
import { PaperPlaneIcon } from "@radix-ui/react-icons"
import {useDispatch, useSelector} from "react-redux"
import { fetchChatByProject, fetchChatMessages, sendMessage } from "../../redux/chat/Chatactions"
import {useParams} from"react-router-dom"


const ChatBox = () => {
  const messages = [
    "Hey, what’s the progress?",
    "Almost done! Just finishing the layout.",
    "Cool, send me once done.",
    "Sure, in 10 minutes.",
    "Great work!",
  ]

  const[message,setMessage]=useState("");

  const {auth,chat}=useSelector(store=>store)
  const dispatch=useDispatch()
  const {id}=useParams()

  const handleMessageChange=(e)=>
  {
    setMessage(e.target.value)
  }


  const handleSendMessage=()=>
  {
    dispatch(sendMessage({senderId:auth.user?.id,
      projectId:id, content:message
    }))
    console.log("Message:", message)
    setMessage("")
  }


  useEffect(()=>
  {
    dispatch(fetchChatByProject(id))
  },[id])


  useEffect(()=>
  {
    if (chat.chat?.id) {
    dispatch(fetchChatMessages(chat.chat.id))
    }
  },[chat.chat?.id])
  return (
    <div className="w-full max-w-md border rounded-lg bg-[#0b1120]/80 text-white">
      {/* Header */}
      <h1 className="border-b p-4 text-lg font-semibold">Chat Box</h1>

      {/* Scrollable Area */}
      <ScrollArea className="h-[30rem] w-full p-4">
        {chat.messages.map((item, index) => {
          
          const isRight = item.sender.id == auth.user.id; // ✅ alternate side
          
          return (
            <div
              key={index}
              className={`flex items-start gap-3 mb-4 ${
                isRight ? "flex-row-reverse text-right" : "flex-row"
              }`}
            >
              {/* Avatar */}
              <Avatar className="w-9 h-9">
                <AvatarFallback
                  className={`${
                    isRight ? "bg-gray-700" : "bg-gray-700"
                  } text-white`}
                >
                  {isRight ? `${auth.user.name[0].toUpperCase()}` : `${item.sender.name[0].toUpperCase()}`}
                </AvatarFallback>
              </Avatar>

              {/* Message bubble */}
              <div
                className={`p-3 max-w-[75%] border rounded-2xl ${
                  isRight
                    ? "bg-gray-800 border-gray-700 rounded-se-none"
                    : "bg-gray-800 border-gray-700 rounded-ss-none"
                }`}
              >
                <p className="font-semibold text-sm">
                  {isRight ? "you" : `${item.sender.name}`}
                </p>
                <p className="text-gray-200 text-sm">{item.content}</p>
              </div>
            </div>
          )
        })}
      </ScrollArea>

      <div className="relative p-0">
        <Input
        placeHolder="type message...."
        className="py-7 border-t outline-none focus:outline-none focus:ring-0 rounded-none border-b-0 border-x-0"
        value={message} onChange={handleMessageChange}
        onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}/>

         <Button  onClick={handleSendMessage} className="w-8 h-8 absolute right-2
         top-3 justify-center rounded-full" size="item" variant="ghost"
         >
         <PaperPlaneIcon/>
         </Button>
      </div>
    </div>
  )
}

export default ChatBox
