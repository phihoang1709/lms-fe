import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { motion } from 'framer-motion';
import { PiNotePencilBold } from "react-icons/pi";
import { Button } from '@/components/ui/button';
import { CgProfile } from "react-icons/cg";
import { FaPowerOff } from "react-icons/fa6";
import routes from "@/constants/routes";
import { useLocalStorage } from "react-use";
import History from "./History";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useGetMeQuery } from "@/services/auth";
import { useCreateConversationsMutation } from "@/services/conversations";
import { handleAsync } from "@/utils/handleAsync";
import { ModeToggle } from "@/components/mode-toggle";
const Header = () => {

    const { data } = useGetMeQuery({});
    const [createConversations] = useCreateConversationsMutation();
    const [, , remove] = useLocalStorage("auth-token", "foo");

    const { avatar } = data?.data || {};
    
    const handleLogout = async () => {
        try {
            remove();
            window.location.href = routes.AUTH;
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    const handleNewChat = async () => {
        const [data, error] = await handleAsync(await createConversations({
            snippet: "string"
        }).unwrap());
        if(error){
            console.error("Logout failed:", error);
            return;
        }
        console.log(data);
        
    }

    return (
        <header className="p-5 flex flex-row justify-between items-center">
            <motion.span
                className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 
           bg-clip-text text-transparent text-xl font-semibold"
                animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "linear",
                }}
            >
                AI Agent
            </motion.span>
            <div className='flex flex-row justify-evenly items-center space-x-3'>
                <ModeToggle/>
                <HoverCard openDelay={200} closeDelay={100}>
                    <HoverCardTrigger asChild>
                        <Button onClick={handleNewChat} className="shadow-2xl hover:bg-gray-500 bg-gray-800 text-gray-100 size-10 rounded-full">
                            <PiNotePencilBold />
                        </Button>
                    </HoverCardTrigger>
                    <HoverCardContent className="bg-gray-800 border-gray-700 text-gray-100 py-2 mt-1 px-2 w-fit">
                        <p className="text-xs">New Chat</p>
                    </HoverCardContent>
                </HoverCard>

                <HoverCard openDelay={200} closeDelay={100}>
                    <HoverCardTrigger asChild>
                        <div>
                            <History />
                        </div>
                    </HoverCardTrigger>
                    <HoverCardContent className="bg-gray-800 border-gray-700 text-gray-100 py-2 mt-1 px-2 w-fit">
                        <p className="text-xs">History</p>
                    </HoverCardContent>
                </HoverCard>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Avatar className="cursor-pointer hover:ring-2 hover:ring-gray-400 transition-all">
                            <AvatarImage src={avatar} alt="avatar" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-gray-800 border-gray-700 mt-2 p-2 text-gray-100">
                        <DropdownMenuItem className="flex flex-row justify-start items-center cursor-pointer p-2 hover:bg-gray-700 focus:bg-gray-700">
                            {/* <User className="mr-2 h-4 w-4" /> */}
                            <CgProfile className="mr-2 h-4 w-4 text-gray-100" />
                            <span>Profile</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleLogout} className="flex flex-row justify-start items-center cursor-pointer p-2 hover:bg-gray-700 focus:bg-gray-700 text-red-400 focus:text-red-400">
                            {/* <LogOut className="mr-2 h-4 w-4" /> */}
                            <FaPowerOff className="mr-2 h-4 w-4 text-red-400" />
                            <span>Logout</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    )
}

export default Header