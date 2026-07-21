import { MessageSquarePlus, History, Trash2, Settings } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-900 border-r border-gray-800 flex flex-col">

      {/* Logo */}

      <div className="p-6 border-b border-gray-800">

        <h1 className="text-2xl font-bold">
          🤖 AI Agent
        </h1>

      </div>

      {/* Navigation */}

      <nav className="flex-1 p-4 space-y-3">

        <button className="flex items-center gap-3 w-full rounded-lg p-3 hover:bg-gray-800 transition">

          <MessageSquarePlus size={20} />

          New Chat

        </button>

        <button className="flex items-center gap-3 w-full rounded-lg p-3 hover:bg-gray-800 transition">

          <History size={20} />

          History

        </button>

        <button className="flex items-center gap-3 w-full rounded-lg p-3 hover:bg-gray-800 transition">

          <Trash2 size={20} />

          Clear Chat

        </button>

      </nav>

      {/* Bottom */}

      <div className="p-4 border-t border-gray-800">

        <button className="flex items-center gap-3 w-full rounded-lg p-3 hover:bg-gray-800 transition">

          <Settings size={20} />

          Settings

        </button>

      </div>

    </aside>
  );
}