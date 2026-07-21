import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import ChatWindow from "@/components/chat/ChatWindow";
import ChatInput from "@/components/chat/ChatInput";

export default function Home() {
  return (
    <div className="h-screen flex bg-gray-950 text-white">
      <Sidebar />

      <div className="flex flex-col flex-1">
        <Header />

        <ChatWindow />

        <ChatInput />
      </div>
    </div>
  );
}