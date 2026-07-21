import ChatProvider from "@/providers/ChatProvider";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>

        <ChatProvider>

          {children}

        </ChatProvider>

      </body>
    </html>
  );
}