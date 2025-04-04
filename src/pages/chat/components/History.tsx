import { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { LuNotebookText } from "react-icons/lu"
import { useGetConversationsQuery } from "@/services/conversations";
import LoadingComponent from '@/components/loading-component'


// Mock data for chat history - replace with your actual data source
const mockChatHistory = [
  { id: '1', title: 'How to implement Redux', date: '2023-06-15', preview: 'I need help implementing Redux in my React application...' },
  { id: '2', title: 'Debugging async functions', date: '2023-06-14', preview: 'I have an issue with async/await in my code...' },
  { id: '3', title: 'CSS Grid layout help', date: '2023-06-12', preview: 'How do I create a responsive grid layout?' },
  { id: '4', title: 'API integration question', date: '2023-06-10', preview: 'What\'s the best way to handle API errors?' },
  { id: '5', title: 'Performance optimization', date: '2023-06-08', preview: 'My React app is running slow, how can I optimize it?' },
]

const History = () => {
  const [open, setOpen] = useState(false)
  const { 
    // data: conversationsData, 
    isLoading: isConversationsLoading} = useGetConversationsQuery({});

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
      <Button className='shadow-2xl hover:bg-gray-500 bg-gray-800 text-gray-100 size-10 rounded-full'><LuNotebookText /></Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2/3 bg-gray-800 text-gray-100 border-gray-700">
        <DialogHeader>
          <DialogTitle>Chat History</DialogTitle>
          <DialogDescription className="text-gray-400">
            View your previous conversations
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="mt-4 max-h-[60vh]">
          <div className="space-y-4 pr-4">
            {isConversationsLoading ? <LoadingComponent/> : (
                mockChatHistory.map((chat) => (
                    <div 
                      key={chat.id} 
                      className="p-3 rounded-lg bg-gray-700 hover:bg-gray-600 cursor-pointer transition-colors"
                      onClick={() => {
                        // Handle chat selection here
                        console.log(`Selected chat: ${chat.id}`);
                        setOpen(false);
                      }}
                    >
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium text-gray-100 truncate">{chat.title}</h4>
                        <span className="text-xs text-gray-400">{chat.date}</span>
                      </div>
                      <p className="text-sm text-gray-300 mt-1 truncate">{chat.preview}</p>
                    </div>
                  )
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}

export default History