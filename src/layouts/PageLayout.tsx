import Sidebar from "@/components/side-bar"
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link, Outlet } from "react-router-dom"
import { TbLayoutSidebarLeftCollapse } from "react-icons/tb";
import { TbLayoutSidebarRightCollapse } from "react-icons/tb";
import { INavbar } from "@/components/side-bar";
import routes from "@/constants/routes"
import airdrop from "@/assets/icons/airdrop_icon.svg"
import logo from "@/assets/icons/logo.svg"
import { FaAngleDown } from "react-icons/fa6";
import youtube from "@/assets/icons/youtube.svg"
import x from "@/assets/icons/x2.svg"
import instagram from "@/assets/icons/instagram.svg"
import tiktok from "@/assets/icons/tiktok.svg"
import { FaRegBell } from "react-icons/fa";
import Dropdown from "@/components/dropdown";
import UserAvatarDropdownProps from "@/components/avatar";

const {  ROOT } = routes
const PageLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);


  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };


  const navbars: INavbar[] = [
    {
      title: <div className="">Lottery <span className="text-[#F3BE8E]">JuniperFOX</span> Game</div>,
      path: ROOT,
      icon: logo
    },
     {
      title: "Home",
      path: ROOT,
      icon: airdrop
    }
  ];

  const socialLinks = [
    {
      name: "YouTube",
      href: "https://youtube.com/@yourhandle",
      icon: youtube
    },
    {
      name: "X (Twitter)",
      href: "https://x.com/yourhandle",
      icon: x
    },
    {
      name: "Instagram",
      href: "https://instagram.com/yourhandle",
      icon: instagram
    },
    {
      name: "Tiktok",
      href: "https://tiktok.com/yourhandle",
      icon: tiktok
    },
  ];

  return (
    <div className="flex bg-[#040817] w-full h-screen">
      <div className="h-screen p-4">
        <Sidebar isCollapsed={isCollapsed} navbars={navbars} />
      </div>
      <div className="flex flex-col w-full h-auto overflow-scroll">
        <div className="mt-2 sticky top-0 z-50 flex flex-row items-center justify-between bg-[#040817] shadow-md">
          <div className="p-4 flex flex-row items-center">
            <Button
              onClick={toggleCollapse}
              className="size-10 shadow-[0_0_15px_rgba(0,0,0,0.5)] border border-gray-700/50 bg-[#040817] hover:bg-gray-600"
            >
              {isCollapsed ? <TbLayoutSidebarRightCollapse className="text-gray-200 size-5" /> : <TbLayoutSidebarLeftCollapse className="text-gray-200 size-5" />}
            </Button>
            <div className="flex flex-row items-center gap-8 ml-5">
              <Link to={ROOT} className="text-gray-200 font-semibold text-sm">About Us</Link>
              <Link to={ROOT} className="text-gray-200 font-semibold text-sm">Introduction</Link>
              <Dropdown triggers={
                <>
                  <span className="text-gray-200 font-semibold text-sm transition-colors">Follow Us</span>
                  <FaAngleDown className="text-gray-200" />
                </>
              } contents={
                <>
                  {socialLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-row items-center justify-start space-x-2 font-semibold px-4 py-2 mx-2 my-1 text-sm text-gray-200 hover:bg-gray-700/50 rounded-sm transition-colors"
                    >
                      <img src={link.icon} className="size-8 mr-2" alt="" />
                      {link.name}
                    </a>
                  ))}
                </>
              } />
            </div>
          </div>

          <div className="text-gray-200 mr-4 flex flex-row-reverse justify-center items-center">
            <UserAvatarDropdownProps userName="Hoang" fallback="HN" />
            <FaRegBell className="size-5 mx-8" />
          </div>
        </div>


        <div className="flex-1 p-6">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default PageLayout