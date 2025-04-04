import { useState, useRef, useEffect } from 'react'
import { Textarea } from "@/components/ui/textarea";
import Header from './components/Header';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Paperclip, Send } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const Home = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (input.trim() === '') return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate AI response (replace with actual API call)
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "This is a simulated AI response. Connect this to your actual AI backend for real responses.",
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col p-2 h-screen bg-[#1d1e20] text-gray-100">
      {/* Header */}
      <Header/>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 px-20 space-y-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            <p className="text-xl">Ask me anything...</p>
          </div>
        ) : (
          messages.map(message => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-3/4 rounded-lg p-3 ${message.sender === 'user'
                    ? 'bg-[#2d2e2f] text-white rounded-br-none'
                    : 'bg-gray-800 text-gray-100 rounded-bl-none'
                  }`}
              >
                <p>{message.content}</p>
                <div className="text-xs opacity-70 text-right mt-1">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          ))
        )}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-800 rounded-lg p-3 rounded-bl-none">
              <div className="flex space-x-2">
                <div className="w-2 h-2 rounded-full bg-gray-500 animate-pulse"></div>
                <div className="w-2 h-2 rounded-full bg-gray-500 animate-pulse delay-75"></div>
                <div className="w-2 h-2 rounded-full bg-gray-500 animate-pulse delay-150"></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className='w-2/3 mx-auto pb-1'>
        <div className="p-5 px-10 border rounded-2xl border-gray-700">
          <div className="flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-gray-400 hover:text-gray-200 hover:bg-gray-700 rounded-full"
              title="Attach files"
            >
              <Paperclip className="h-5 w-5" />
            </Button>
            
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSendMessage())}
              placeholder="Type your message..."
              className="flex-1 min-h-[40px] resize-none bg-gray-600 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 border-none placeholder-gray-400"
            />
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-gray-400 hover:text-gray-200 hover:bg-gray-700 rounded-full"
              title="More options"
            >
              <MoreHorizontal className="h-5 w-5" />
            </Button>

            <Button
              onClick={handleSendMessage}
              disabled={isLoading || input.trim() === ''}
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home