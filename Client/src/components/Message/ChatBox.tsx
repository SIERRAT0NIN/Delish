import React, { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { Button, Input, Avatar, Card } from "@nextui-org/react";
import Modal from "../Misc/Modal";
import NavBar from "../Home/NavBar";
import { useAuth } from "../Auth/AuthContext";

interface Message {
  id: number;
  sender: number;
  text: string;
}
interface ServerMessage {
  id: number;
  chat_id: number;
  sender_id: number;
  receiver_id: number;
  content: string;
}

export default function ChatBox() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState<string>("");
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState("");
  const [activeChat, setActiveChat] = useState({});
  const [chats, setChats] = useState([]);
  const { user, getCookie } = useAuth();

  useEffect(() => {
    fetch("/api/chats").then((resp) => {
      if (resp.ok) {
        resp.json().then((data) => setChats(data["all_chats"]));
      } else {
        resp.json().then((e) => alert(e.error));
      }
    });
  }, []);

  useEffect(() => {
    if (activeChat.hasOwnProperty("id")) {
      fetch(`/api/chats/${activeChat.id}`)
        .then((resp) => {
          if (resp.ok) {
            resp.json().then((data) => setMessages(data.messages));
          } else {
            resp.json().then((e) => alert(e.error));
          }
        })
        .catch((e) => console.table(e));

      const newSocket = io("http://10.0.0.200:5050");
      setSocket(newSocket);

      newSocket.on("connect", () => {
        console.log("Connected to server");
        newSocket.emit("join", { room: `chat_${activeChat.id}` });
      });

      newSocket.on("server_message", (message: ServerMessage) => {
        console.log("NEW MESSAGE:");
        console.log(message);
        const newMessage: Message = {
          id: message.id,
          sender: message.sender_id,
          text: message.content,
        };
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      });

      return () => {
        if (newSocket) {
          newSocket.disconnect();
        }
      };
    }
  }, [activeChat]);

  console.log(messages);

  const handleMessageSend = () => {
    if (socket) {
      if (activeChat.id) {
        const newMessage = {
          chat_id: activeChat.id,
          sender_id: user?.id,
          receiver_id:
            activeChat.user1_id === user?.id
              ? activeChat.user2_id
              : activeChat.user1_id,
          content: inputText,
        };
        socket.emit("client_message", newMessage);
        setInputText("");
      } else {
        alert("Please choose a chat first, or create one");
      }
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const startChat = () => {
    if (selectedUser) {
      fetch("/api/chats", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": getCookie("csrf_access_token"),
        },
        body: JSON.stringify({ user1_id: user?.id, user2_name: selectedUser }),
      })
        .then((resp) => {
          if (resp.ok) {
            resp.json().then((chat) => setActiveChat({ id: chat.id }));
          } else {
            resp.json().then((e) => alert(e.error));
          }
        })
        .catch((e) => alert(e));
    } else {
      alert("No user selected");
    }
    closeModal();
  };

  return (
    <>
      <NavBar />
      <Card className="mt-10 p-10">
        <h1 className="flex justify-center text-lg bg-gradient-to-r from-pink-500 to-yellow-500 text-white p-5 rounded m-2">
          Direct Messages
        </h1>
        <div className="grid grid-cols-4 h-screen">
          <div className="flex flex-col bg-gray-100 dark:bg-gray-800 rounded-md">
            <div className="flex items-center gap-3 p-4 border-b border-gray-200 dark:border-gray-800">
              <Avatar
                className="h-9 w-9"
                src="https://www.gyfted.me/_next/image?url=%2Fimg%2Fcharacters%2Fned-flanders.png&w=640&q=75"
              ></Avatar>
              <div className="grid gap-0.5 text-xs">
                <div className="font-medium">{user?.username}</div>
                <div className="text-green-500 dark:text-green-400">Online</div>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto">
              <div className="group flex flex-col gap-4 py-2">
                {chats?.map((chat) => (
                  <nav key={chat.id} className="grid gap-1 px-2">
                    <Button
                      className="justify-start gap-2"
                      size="sm"
                      variant="ghost"
                      onClick={() => setActiveChat(chat)}
                    >
                      <div className="flex items-center gap-2">
                        <Avatar
                          className="h-6 w-6"
                          alt="@shadcn"
                          src="https://www.onthisday.com/images/people/homer-simpson.jpg?w=360"
                        />
                        <div className="grid gap-0.5 text-xs">
                          <div className="font-medium">
                            {chat.user1.username === user?.username
                              ? chat.user2.username
                              : chat.user1.username}
                          </div>
                          <div className="text-gray-500 dark:text-gray-400">
                            {/* Hey, how's it going? */}
                          </div>
                        </div>
                      </div>
                    </Button>
                  </nav>
                ))}
              </div>
            </div>
          </div>
          {/* <div className="flex-1 overflow-y-auto">
            <div className="group flex flex-col gap-4 py-2">
              <nav className="grid gap-1 px-2">
                <Button className="justify-start gap-2" size="sm" variant="ghost">
                  <div className="flex items-center gap-2">
                    <Avatar
                      className="h-6 w-6"
                      alt="@shadcn"
                      src="https://www.onthisday.com/images/people/homer-simpson.jpg?w=360"
                    />
                    <div className="grid gap-0.5 text-xs">
                      <div className="font-medium">Alberto Sierra</div>
                      <div className="text-gray-500 dark:text-gray-400">
                        Hey, how's it going?
                      </div>
                    </div>
                  </div>
                </Button>
              </nav>
            </div>
          </div> */}
          <div className="col-span-3 flex flex-col">
            <div className="flex items-center gap-3 p-4 border-b border-gray-200 dark:border-gray-800">
              <Avatar
                className="h-6 w-6"
                alt="@shadcn"
                src="https://www.onthisday.com/images/people/homer-simpson.jpg?w=360"
              />
              <div className="grid gap-0.5 text-xs">
                <div className="font-medium">Alberto Sierra</div>
                <div className="text-green-500 dark:text-green-400">Online</div>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              {messages.length ? (
                messages.map((message) => {
                  const isMe =
                    message.sender == user?.id ||
                    message.sender?.id == user?.id;
                  return (
                    <div
                      key={message.id}
                      className={`flex items-end gap-2 mb-4`}
                      style={{ flexDirection: isMe ? "row" : "row-reverse" }}
                    >
                      <Avatar
                        className="h-6 w-6"
                        alt={message.sender}
                        src={
                          isMe
                            ? "https://www.onthisday.com/images/people/homer-simpson.jpg?w=360"
                            : "https://www.gyfted.me/_next/image?url=%2Fimg%2Fcharacters%2Fned-flanders.png&w=640&q=75"
                        }
                      />
                      <div
                        className={`bg-gray-100 dark:bg-gray-800 rounded-lg p-2 ${
                          isMe ? "self-end" : "self-start"
                        }`}
                      >
                        <p className="text-sm">
                          {message.content || message.text}
                        </p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p>No messages yet</p>
              )}
            </div>
            <div className="border-t border-gray-200 dark:border-gray-800 p-4">
              <div className="flex items-center gap-2">
                <Input
                  placeholder="Type a message"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                />
                <Button onClick={handleMessageSend}>Send</Button>
                <Button onClick={openModal}>Create Chat</Button>
                <Modal open={isModalOpen} onClose={closeModal}>
                  <h1>Create Chat</h1>
                  <div>
                    <Input
                      placeholder="Type a username"
                      value={selectedUser}
                      onChange={(e) => setSelectedUser(e.target.value)}
                    />
                  </div>
                  <footer>
                    <Button onClick={startChat}>Start Chat</Button>
                    <Button onClick={closeModal}>Cancel</Button>
                  </footer>
                </Modal>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
}
