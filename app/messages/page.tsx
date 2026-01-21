"use client";
import {
  getChats,
  getChatById,
  deleteChatById,
  sendChatMessage,
} from "@/reducers/mesage";
import { Switch } from "antd";

import {
  Bell,
  ChevronDown,
  Image,
  Info,
  Mic,
  Phone,
  Search,
  Send,
  Smile,
  SquarePen,
  Sticker,
  Video,
  X,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Messages = () => {
  const dispatch = useDispatch();
  const { chats, chatById } = useSelector((state: any) => state.getChats);
  const [activeChat, setActiveChat] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);

  const openChat = (chat: any) => {
    setActiveChat(chat);
    dispatch(getChatById(chat.chatId)).then((res: any) => {
      if (res.payload?.messages) {
        setMessages(res.payload.messages);
      }
    });
  };

  const handleSendMessage = () => {
    if (!message.trim() || !activeChat) return;

    dispatch(
      sendChatMessage({
        chatId: activeChat.chatId,
        message: message.trim(),
      }),
    ).then((res: any) => {
      if (res.payload) {
        setMessages((prev: any) => [...prev, { ...res.payload, isMine: true }]);
      }
    });

    setMessage("");
  };

  useEffect(() => {
    dispatch(getChats());
  }, [dispatch]);

  const [message, setMessage] = useState("");

  const [openSendMessage, setOpenSendMessage] = useState<any>(false);
  const [openInfoPanel, setOpenInfoPanel] = useState(false);

  return (
    <>
      <div className="w-[93%] ml-auto flex">
        <section className="w-[33%] p-1 mr-5">
          <section className="flex flex-col gap-5 mt-4">
            <article className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <h1 className="font-bold text-[20px]">ramziya</h1>
                <ChevronDown size={18} />
              </div>
              <SquarePen />
            </article>

            <article>
              <div className="relative p-[6px] bg-[#ebebeb6f] rounded-2xl">
                <Search
                  color="grey"
                  width={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2"
                />
                <input
                  type="text"
                  placeholder="Search"
                  className="outline-none bg-transparent w-full pl-10"
                />
              </div>
            </article>

            <article className="flex items-center justify-between">
              <h1 className="text-[#64748B] text-[16px]">Messages</h1>
              <span className="text-[#3B82F6]">Requests</span>
            </article>

            <article className="flex flex-col gap-1">
              {chats?.data?.map((e: any) => (
                <div
                  key={e.id}
                  onClick={() => openChat(e)}
                  className="flex items-start gap-3 p-2 rounded-[7px] cursor-pointer hover:bg-[#e6e4e466]"
                >
                  <img
                    className="w-12 h-12 rounded-full object-cover"
                    src={`https://instagram-api.softclub.tj/images/${
                      e.receiveUserImage || e.sendUserImage
                    }`}
                    alt=""
                  />
                  <div className="flex flex-col">
                    <h1>{e.receiveUserName}</h1>
                    <p className="text-[13px] text-[grey]">Active 4h ago</p>
                  </div>
                </div>
              ))}
            </article>
          </section>
        </section>
        <section className="w-full border-l h-auto">
          {!activeChat ? (
            <div className="text-gray-400 text-center mt-20 h-120 gap-5 justify-center flex flex-col items-center">
              <div className="border border-[2px] border-[black] rounded-[100%] w-30 h-30 flex items-center justify-center">
                <Send
                  strokeWidth={0.5}
                  color="black"
                  size={60}
                  className="relative top-1 right-1"
                />
              </div>
              <h1 className="text-[black] text-[25px] font-medium">
                Your messages
              </h1>
              <span className="text-center">
                Send private photos and messages to a friend or group
              </span>
              <button
                onClick={() => setOpenSendMessage(true)}
                className="bg-[#3B82F6] text-[white] p-1 rounded-[10px] w-35 hover:bg-[#2174f9]"
              >
                Send message
              </button>
            </div>
          ) : (
            <div className="flex w-full h-full">
              <div className="flex-1">
                <div className="flex justify-between items-center p-4 gap-3">
                  <div className="flex items-center gap-5">
                    <img
                      className="w-12 h-12 rounded-full"
                      src={`https://instagram-api.softclub.tj/images/${
                        activeChat.receiveUserImage || activeChat.sendUserImage
                      }`}
                      alt="error"
                    />
                    <div className="flex flex-col">
                      <h1>{activeChat.receiveUserName}</h1>
                      <p className="text-[13px] text-[grey]">
                        {activeChat.sendUserName}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-5">
                    <Phone />
                    <Video />
                    {openInfoPanel ? (
                      <X
                        className="cursor-pointer"
                        size={24}
                        onClick={() => setOpenInfoPanel(false)}
                      />
                    ) : (
                      <Info
                        className="cursor-pointer"
                        size={24}
                        onClick={() => setOpenInfoPanel(true)}
                      />
                    )}
                  </div>
                </div>
                <div className="border-t w-[100%]"></div>

                <div className="flex-1 overflow-y-auto flex flex-col justify-between h-[570px] p-2">
                  <div className=" p-4 flex flex-col items-center gap-1">
                    <img
                      className="w-25 h-25 rounded-full"
                      src={`https://instagram-api.softclub.tj/images/${
                        activeChat.receiveUserImage || activeChat.sendUserImage
                      }`}
                      alt="error"
                    />
                    <h1 className="mt-2 font-medium text-lg">
                      {activeChat.receiveUserName}
                    </h1>
                    <p className="text-[grey] text-[13px]">Instagram</p>
                    <Link href={`/profile/${activeChat.id}`}>
                      <button className="mt-2 bg-[#d9d9d965] font-medium p-1 rounded-[10px] w-30 hover:bg-[#d9d9d9b4]">
                        View profile
                      </button>
                    </Link>
                  </div>
                  <div className="flex flex-col gap-1">
                    {chatById?.map((msg: any) => (
                      <div
                        key={msg.id}
                        className={`p-2 m-auto  rounded-2xl hover:${<Send/>} ${
                          msg.isMine
                            ? "ml-auto bg-blue-500 text-white"
                            : "bg-gray-200"
                        }`}
                      >
                        {msg.messageText}
                      </div>
                    ))}
                  </div>
                </div>
                
              <div className="p-4">
                <div className="flex items-center gap-2 p-2 border rounded-2xl w-full">
                  <Smile />
                  <input
                    type="text"
                    placeholder="Message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="flex-1 outline-none bg-transparent"
                  />
                  {message.trim() ? (
                    <Send
                      onClick={handleSendMessage}
                      className="cursor-pointer text-blue-500"
                    />
                  ) : (
                    <>
                      <Mic />
                      <Image />
                      <Sticker />
                    </>
                  )}
                </div>
              </div>
              </div>

              {openInfoPanel && (
                <div className="w-[350px] border-l">
                  <h2 className="font-medium text-[20px] flex items-center h-20 p-4">
                    Details
                  </h2>
                  <div className="border-t"></div>
                  <div className="flex justify-between p-4">
                    <div className="flex items-center gap-2">
                      <Bell />
                      <span className="font-medium">Mute messages</span>
                    </div>
                    <Switch />
                  </div>
                  <div className="border-t"></div>
                  <div className="p-4 flex flex-col items-start gap-2">
                    <h1 className="font-medium">Members</h1>
                    <div className="flex items-center gap-2">
                      <img
                        className="w-15 h-15 rounded-full"
                        src={`https://instagram-api.softclub.tj/images/${
                          activeChat.receiveUserImage ||
                          activeChat.sendUserImage
                        }`}
                        alt="error"
                      />
                      <div className="flex flex-col items-start ">
                        <h1>{activeChat.receiveUserName}</h1>
                        <p className="text-[13px] text-[grey]">
                          {activeChat.sendUserName}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="border-t mt-65"></div>
                  <div className="p-4 flex flex-col items-start gap-7">
                    <span className="cursor-pointer">Nicknames</span>
                    <span className="cursor-pointer text-red-500">Report</span>
                    <span className="cursor-pointer text-red-500">Block</span>
                    <button
                      onClick={() => {
                        dispatch(deleteChatById(activeChat.id));
                        setActiveChat(null);
                        dispatch(getChats());
                      }}
                    >
                      <span className="cursor-pointer text-red-500">
                        Delete Chat
                      </span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </section>
      </div>

      {openSendMessage && (
        <div
          className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
          onClick={() => setOpenSendMessage(false)}
        >
          <div
            className="bg-white rounded-[20px]  relative w-11/12 max-w-130 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4">
              <X
                className="absolute top-3 right-3 cursor-pointer hover:text-gray-600"
                size={24}
                onClick={() => setOpenSendMessage(false)}
              />

              <h2 className="text-center relative top-5 font-medium mb-4">
                New message
              </h2>
            </div>
            <div className="relative fixed">
              <div className="border-t  border-gray-300"></div>
              <div className="p-3 flex items-center gap-2">
                <span className="font-medium">To:</span>
                <input
                  type="text"
                  placeholder="Search..."
                  className="border-0 outline-none focus:outline-none focus:ring-0"
                />
              </div>
              <div className="border-t  border-gray-300"></div>
            </div>
            <div className="mb-10 p-3">
              <h1 className="font-medium">Suggested</h1>
              <div className="flex flex-col items-start gap-3 mt-2">
                {chats?.data?.map((item) => {
                  return (
                    <div key={item.id} className="flex items-start gap-2">
                      <div className="flex gap-2">
                        <img
                          className="w-12 h-12 rounded-full object-cover"
                          src={`https://instagram-api.softclub.tj/images/${
                            item.receiveUserImage || item.sendUserImage
                          }`}
                          alt=""
                        />
                        <div className="flex flex-col items-start">
                          <h1>{item.receiveUserName}</h1>
                          <p className="text-[13px] text-[grey]">
                            {item.sendUserName}
                          </p>
                        </div>
                      </div>
                      <div></div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Messages;
