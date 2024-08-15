import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const MainChat = () => {
  const messages = [
    { id: 1, sender: "John Doe", text: "Hello, how are you?", type: "received" },
    { id: 2, sender: "JD", text: "I'm doing great, thanks for asking!", type: "sent" },
    { id: 3, sender: "John Doe", text: "What have you been up to?", type: "received" },
    { id: 4, sender: "JD", text: "Just working on some projects. How about you?", type: "sent" },
    { id: 5, sender: "John Doe", text: "Same here. Busy with work and studies.", type: "received" },
    { id: 6, sender: "John Doe", text: "Hello, how are you?", type: "received" },
    { id: 7, sender: "JD", text: "I'm doing great, thanks for asking!", type: "sent" },
    { id: 8, sender: "John Doe", text: "What have you been up to?", type: "received" },
    { id: 9, sender: "JD", text: "Just working on some projects. How about you?", type: "sent" },
    { id: 10, sender: "John Doe", text: "Same here. Busy with work and studies.", type: "received" },
    { id: 11, sender: "John Doe", text: "Hello, how are you?", type: "received" },
    { id: 12, sender: "JD", text: "I'm doing great, thanks for asking!", type: "sent" },
    { id: 13, sender: "John Doe", text: "What have you been up to?", type: "received" },
    { id: 14, sender: "JD", text: "Just working on some projects. How about you?", type: "sent" },
    { id: 15, sender: "John Doe", text: "Same here. Busy with work and studies.", type: "received" },
    // Add more messages here
  ];
  return (
    <div className="flex-1 flex flex-col bg-white">
        <div className="border-b border-[#ddd] bg-white flex items-center h-16 px-6 py-12">
          <Avatar className="w-14 h-14 rounded-full mr-3">
            <AvatarImage src="/placeholder-user.jpg" alt="User Avatar" />
            <AvatarFallback className="font-bold text-2xl bg-red-300">JD</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-extrabold text-2xl">John Doe</div>
            <div className="text-m text-[#8d8b8b]">Online</div>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-4 hide-scrollbar">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex items-start gap-3 mb-4 ${message.type === "sent" ? "justify-end" : ""}`}
        >
          {message.type === "received" && (
            <Avatar className="w-10 h-10 rounded-full">
              <AvatarImage src="/pfp.jpeg" alt="User Avatar" />
              <AvatarFallback className="bg-gray-300">{message.sender[0]}</AvatarFallback>
            </Avatar>
          )}
          <div
            className={`bg-[#f0f0f0] rounded-xl p-3 max-w-[70%] ${
              message.type === "sent" ? "bg-[#e36d3e] text-white" : ""
            }`}
          >
            <div className="font-medium">{message.sender}</div>
            <div>{message.text}</div>
          </div>
        </div>
      ))}
    </div>
        <div className="border-t border-[#ddd] bg-white flex items-center gap-4 h-24 px-10 py-3">
          <Input
            type="text"
            placeholder="Type your message"
            className="bg-[#ededed] rounded-xl text-gray-950 px-4 py-4 text-xl h-16 border-none outline-none focus:border-none focus:ring-0"
          />
          <Button variant="ghost" size="icon" className="rounded-xl p-2 bg-orange-300 hover:bg-orange-300">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.112 2.13" />
</svg>

          </Button>
          <Button variant="ghost" size="icon" className="ml-2 rounded-xl p-2 bg-orange-300 hover:bg-orange-300">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-7">
  <path stroke-linecap="round" stroke-linejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
</svg>

          </Button>
        </div>
      </div>
  );
};

export default MainChat;
