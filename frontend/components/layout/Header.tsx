import { Bot, Wifi, Moon } from "lucide-react";

export default function Header() {
  return (
    <header className="h-16 border-b border-gray-800 bg-gray-900 px-6 flex items-center justify-between">

      {/* Left */}

      <div className="flex items-center gap-3">

        <div className="p-2 rounded-lg bg-blue-600">

          <Bot size={22} />

        </div>

        <div>

          <h1 className="font-semibold text-lg">
            AI Agent
          </h1>

          <p className="text-sm text-gray-400">
            Powered by Gemini
          </p>

        </div>

      </div>

      {/* Right */}

      <div className="flex items-center gap-6">

        <div className="flex items-center gap-2 text-green-400">

          <Wifi size={18} />

          <span className="text-sm">
            Connected
          </span>

        </div>

        <button className="p-2 rounded-lg hover:bg-gray-800 transition">

          <Moon size={20} />

        </button>

      </div>

    </header>
  );
}