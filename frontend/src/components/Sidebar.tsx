import { useState } from 'react';

const Sidebar = () => {
  
  const [activeButton, setActiveButton] = useState('All');
  const [activeChat, setActiveChat] = useState('1');
  const [friends, setFriends] = useState([{id: 1 , name: 'John Doe', message: 'Hello, how are you?'},{id: 2 , name: 'John Doe', message: 'Hello, how are you?'}]);

  const buttons = ['All', 'Unread', 'Archived', 'Blocked'];


    const chatItems = (id:Number , name:string , message: string)=>(
        <a
        href="#"
        key={id.toString()}
        className={`flex p-3 border border-solid border-gray-300 items-center gap-4 px-4 py-3 rounded-lg transition-colors duration-200 ${
          activeChat === id.toString() ? 'bg-gray-200 border-l-8 border-l-orange-500' : 'hover:bg-[#e0e0e0]'
        }`}
        onClick={() => setActiveChat(id.toString())} 
        >
          <div className="w-12 h-12">
          <svg key="1" data-slot="icon" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"></path>
          </svg>
          </div>
          <div className="flex-1 overflow-hidden">
            <div className="flex justify-between  items-center">
              <div className="font-semibold text-lg text-gray-800">{name}</div>
              <div className="text-md text-gray-500">12:34 PM</div>
            </div>
            <div className="text-sm text-gray-600  truncate">
              {message}
            </div>
          </div>
        </a>
      );


      
  return (
    <div className="border-r border-[#ddd] bg-white w-1/3 hidden sm:block h-max">
        <div className="flex flex-col py-4 px-4 border-b">
            <div className="relative flex items-center mb-7 mt-4 border p-2 border-solid border-slate-950 rounded-2xl ">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6 text-gray-500 absolute right-3"
                >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607z"
                />
                </svg>
                <input
                type="text"
                placeholder="Search"
                className="bg-white text-semibold text-xl text-black rounded-lg  w-96 pr-10 focus:outline-none"
                />
                
            </div>
            <div className="flex space-x-4 mt-2">
            {buttons.map((button) => (
              <button
                key={button}
                className={`px-3 py-2 rounded-xl text-sm ${
                  activeButton === button ? 'bg-orange-300' : 'bg-gray-200 hover:bg-orange-300'
                }`}
                onClick={() => setActiveButton(button)}
              >
                {button}
              </button>
            ))}
            </div>
        </div>

        <div className="h-[calc(100vh-167px)] overflow-y-auto hide-scrollbar">
            {friends.map((chat) => chatItems(chat.id , chat.name, chat.message))}
        </div>
      </div>
  );
};

export default Sidebar;
