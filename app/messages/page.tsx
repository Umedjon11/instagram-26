"use client";
import {
  getChats,
  getChatById,
  deleteChatById,
  sendChatMessage,
  deleteMessage,
  clearActiveChat,
  getUsers,
  createChat,
} from "@/reducers/mesage";
import { Switch } from "antd";
import { useRef } from "react";

import {
  Bell,
  Check,
  ChevronDown,
  DeleteIcon,
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
import EmojiPicker from "emoji-picker-react";

const Messages = () => {
  const dispatch = useDispatch() as any;
  const { chats, chatById, data } = useSelector((state: any) => state.getChats);
  const [activeChat, setActiveChat] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const { users } = useSelector((state: any) => state.getChats);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const handleEmojiClick = (emojiObject: any) => {
    setMessage((prev) => prev + emojiObject.emoji);
    setShowEmojiPicker(false);
  };

  const [message, setMessage] = useState("");
  const currentUserId = null;

  console.log("Мой ID:", currentUserId);
  const openChat = (chat: any) => {
    setActiveChat(chat);
    dispatch(getChatById(chat.chatId));
  };

  const handleSendMessage = () => {
    if (!message.trim() || !activeChat) return;

    dispatch(
      sendChatMessage({
        chatId: activeChat.chatId,
        message: message.trim(),
      }),
    ).then(() => {
      dispatch(getChatById(activeChat.chatId));
    });

    setMessage("");
  };

  useEffect(() => {
    dispatch(getChats());
    dispatch(getUsers());
  }, [dispatch]);

  const [openSendMessage, setOpenSendMessage] = useState<any>(false);
  const [openInfoPanel, setOpenInfoPanel] = useState(false);

  const handleDeleteChat = () => {
    if (!activeChat) return;
    dispatch(deleteChatById(activeChat.chatId)).then((res: any) => {
      if (res.payload) {
        setActiveChat(null);
        setMessages([]);
        dispatch(clearActiveChat());
        dispatch(getChats());
      }
    });
  };

  const allState = useSelector((state: any) => state);
  console.log("ВЕСЬ REDUX STATE:", allState);

  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<any>(null);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string>("");
  const [showAudioPlayer, setShowAudioPlayer] = useState(false);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: true, noiseSuppression: true },
      });

      mediaStreamRef.current = stream;
      const recorder = new MediaRecorder(stream);
      const chunks: Blob[] = [];

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) chunks.push(event.data);
      };

      recorder.onstop = () => {
        const audioBlob = new Blob(chunks, { type: "audio/webm" });
        const audioUrl = URL.createObjectURL(audioBlob);

        setAudioBlob(audioBlob);
        setAudioUrl(audioUrl);
        setShowAudioPlayer(true);

        stream.getTracks().forEach((track) => track.stop());
      };

      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);
      setShowAudioPlayer(false);
    } catch (error) {
      console.error("Ошибка микрофона:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state !== "inactive") {
      mediaRecorder.stop();
      setIsRecording(false);
    }

    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }
  };

  const sendVoiceMessage = async () => {
    if (!audioBlob || !activeChat) return;

    try {
      const voiceFile = new File([audioBlob], "voice-message.webm", {
        type: "audio/webm",
      });

      await dispatch(
        sendChatMessage({
          chatId: activeChat.chatId,
          file: voiceFile,
        }),
      );

      setAudioBlob(null);
      setAudioUrl("");
      setShowAudioPlayer(false);
    } catch (error) {
      console.error("Ошибка отправки голосового:", error);
    }
  };

  const cancelRecording = () => {
    if (isRecording) stopRecording();
    setAudioBlob(null);
    setAudioUrl("");
    setShowAudioPlayer(false);
  };

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("image/") && activeChat) {
      dispatch(
        sendChatMessage({
          chatId: activeChat.chatId,
          file: file,
        }),
      ).then(() => {
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      });
    }
  };

  const handleStartChat = (userId: string) => {
    dispatch(createChat(userId))
      .unwrap()
      .then((res) => {
        console.log("Чат создан:", res);
      })
      .catch((err) => {
        console.error("Ошибка при создании чата:", err);
      });
  };

  const [search, setSearch] = useState("");
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  return (
    <>
      <div className="w-[93%] ml-auto flex">
        <section className="w-[33%] p-1 mr-5">
          <section className="flex flex-col gap-5 mt-4">
            <article className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <h1 className="font-bold text-[20px]">
                  {activeChat
                    ? activeChat.sendUserName
                    : activeChat?.sendUserName}
                </h1>

                <ChevronDown size={18} />
              </div>
              <SquarePen onClick={() => setOpenSendMessage(true)} />
            </article>

            <article>
              <div className="p-[6px] bg-[#ebebeb6f] rounded-2xl dark:bg-[#504f4f42]">
                <Search
                  color="grey"
                  width={18}
                  className="absolute left-35 top-22 z-0 -translate-y-1/2"
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
                  className="flex items-start gap-3 p-2 rounded-[7px] cursor-pointer hover:bg-[#e6e4e466] dark:hover:bg-[#5a595935]"
                >
                  <img
                    className="w-12 h-12 rounded-full object-cover"
                    src={
                      e.receiveUserImage
                        ? `https://instagram-api.softclub.tj/images/${e.receiveUserImage}`
                        : "https://th.bing.com/th/id/R.cf617bf1054e50f7321d18574d8192c8?rik=sAwHhwnmQRBgbA&pid=ImgRaw&r=0"
                    }
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
        <section className="w-[80%] border-l h-auto">
          {!activeChat ? (
            <div className="text-center mt-20 h-120 gap-5 justify-center flex flex-col items-center">
              <div className="border border-[2px] border-[black] dark:border-[white] rounded-[100%] w-30 h-30 flex items-center justify-center">
                <Send
                  strokeWidth={0.5}
                  size={60}
                  className="relative top-1 right-1"
                />
              </div>
              <h1 className="text-[black] text-[25px] font-medium dark:text-[white]">
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
                      src={
                        activeChat.receiveUserImage
                          ? `https://instagram-api.softclub.tj/images/${activeChat.receiveUserImage}`
                          : "https://th.bing.com/th/id/R.cf617bf1054e50f7321d18574d8192c8?rik=sAwHhwnmQRBgbA&pid=ImgRaw&r=0"
                      }
                      alt="error"
                    />
                    <div className="flex flex-col">
                      <h1>{activeChat.receiveUserName}</h1>
                      <p className="text-[13px] text-[grey]">
                        {activeChat.receiveUserName}
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

                <div className="flex-1 overflow-x-auto flex flex-col justify-between h-[640px] p-2">
                  <div className="p-4 flex flex-col items-center gap-1">
                    <img
                      className="w-25 h-25 rounded-full"
                      src={
                        activeChat.receiveUserImage
                          ? `https://instagram-api.softclub.tj/images/${activeChat.receiveUserImage}`
                          : "https://th.bing.com/th/id/R.cf617bf1054e50f7321d18574d8192c8?rik=sAwHhwnmQRBgbA&pid=ImgRaw&r=0"
                      }
                      alt="error"
                    />
                    <h1 className="mt-2 font-medium text-lg">
                      {activeChat.receiveUserName}
                    </h1>
                    <p className="text-[grey] text-[13px]">Instagram</p>
                    <Link href={`/profile/info/${activeChat.id}`}>
                      <button className="mt-2 bg-[#d9d9d965] font-medium p-1 rounded-[10px] w-30 hover:bg-[#d9d9d9b4] dark:bg-[#5f5c5c52]">
                        View profile
                      </button>
                    </Link>
                  </div>
                  <div className="flex flex-col gap-1 w-full px-4">
                    {chatById?.map((msg: any) => {
                      console.log("Рендерим сообщение:", msg);

                      const isMine = msg.userId === currentUserId;

                      console.log(
                        `userId: ${msg.userId}, currentUserId: ${currentUserId}, isMine: ${isMine}`,
                      );

                      return (
                        <div
                          key={msg.messageId}
                          className={`group relative flex items-center gap-2 ${
                            isMine ? "justify-end" : "justify-start"
                          }`}
                        >
                          {!isMine && (
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-1">
                              <button
                                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
                                onClick={() =>
                                  dispatch(deleteMessage(msg.messageId))
                                }
                                title="Удалить"
                              >
                                <DeleteIcon
                                  size={14}
                                  className="text-gray-500"
                                />
                              </button>
                              <button
                                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
                                onClick={() =>
                                  navigator.clipboard.writeText(msg.messageText)
                                }
                                title="Копировать"
                              >
                                <SquarePen
                                  size={14}
                                  className="text-gray-500"
                                />
                              </button>
                            </div>
                          )}

                          <div
                            className={`flex flex-col p-1 px-2 rounded-2xl max-w-[300px] break-words whitespace-pre-wrap ${
                              isMine
                                ? "bg-blue-500 text-white"
                                : "bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
                            }`}
                          >
                            {msg.messageText && <div>{msg.messageText}</div>}

                            {msg.fileUrl &&
                              msg.fileType.startsWith("image") && (
                                <img
                                  src={msg.fileUrl}
                                  className="w-40 h-40 object-cover rounded"
                                />
                              )}

                            {msg.fileUrl &&
                              msg.fileType.startsWith("video") && (
                                <video
                                  src={msg.fileUrl}
                                  controls
                                  className="w-40 h-40 rounded"
                                />
                              )}

                            {msg.fileUrl &&
                              msg.fileType.startsWith("audio") && (
                                <audio src={msg.fileUrl} controls />
                              )}
                          </div>

                          {isMine && (
                            <div className="opacity-0  group-hover:opacity-100 transition-opacity duration-200 flex gap-1">
                              <button
                                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
                                onClick={() =>
                                  navigator.clipboard.writeText(msg.messageText)
                                }
                                title="Копировать"
                              >
                                <SquarePen
                                  size={14}
                                  className="text-gray-500"
                                />
                              </button>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {showAudioPlayer && audioUrl && (
                  <div className="mx-4 mb-3 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="flex-1">
                        <audio src={audioUrl} controls className="w-full" />
                      </div>
                      <div className="flex flex-col gap-2">
                        <button
                          onClick={sendVoiceMessage}
                          className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                        >
                          Отправить
                        </button>
                        <button
                          onClick={cancelRecording}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                        >
                          Отмена
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {isRecording && (
                  <div className="mx-4 mb-3 p-3 bg-red-100 dark:bg-red-900 rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                      <span className="font-medium">Идёт запись...</span>
                      <button
                        onClick={stopRecording}
                        className="ml-auto bg-red-500 text-white px-3 py-1 rounded text-sm"
                      >
                        Завершить
                      </button>
                    </div>
                  </div>
                )}
                <div className="p-4">
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleImageSelect}
                    className="hidden"
                  />

                  <div className="flex items-center gap-2 p-2 border rounded-2xl w-full relative">
                    <button
                      type="button"
                      onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                      className="hover:bg-gray-100 p-1 rounded-full"
                    >
                      <Smile />
                    </button>

                    <input
                      type="text"
                      placeholder="Message..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="flex-1 outline-none bg-transparent"
                    />

                    {showEmojiPicker && (
                      <div className="absolute bottom-12 left-0 z-50">
                        <EmojiPicker
                          onEmojiClick={handleEmojiClick}
                          width={300}
                          height={400}
                          theme={
                            document.documentElement.classList.contains("dark")
                              ? "dark"
                              : "light"
                          }
                        />
                      </div>
                    )}

                    {message.trim() ? (
                      <Send
                        onClick={handleSendMessage}
                        className="cursor-pointer text-blue-500"
                      />
                    ) : (
                      <>
                        <button
                          onClick={() => fileInputRef.current?.click()}
                          className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
                          title="Отправить фото"
                        >
                          <Image />
                        </button>

                        {isRecording ? (
                          <button
                            onClick={stopRecording}
                            className="text-red-500 animate-pulse p-1"
                            title="Остановить запись"
                          >
                            <Mic size={20} />
                          </button>
                        ) : (
                          <button
                            onClick={startRecording}
                            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
                            title="Записать голосовое"
                          >
                            <Mic />
                          </button>
                        )}

                        <Sticker />
                      </>
                    )}
                  </div>
                </div>
              </div>

              {openInfoPanel && (
                <div className="w-[350px] border-l flex-shrink-0">
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
                        src={
                          activeChat.receiveUserImage
                            ? `https://instagram-api.softclub.tj/images/${activeChat.receiveUserImage}`
                            : "https://th.bing.com/th/id/R.cf617bf1054e50f7321d18574d8192c8?rik=sAwHhwnmQRBgbA&pid=ImgRaw&r=0"
                        }
                        alt="error"
                      />
                      <div className="flex flex-col items-start">
                        <h1>{activeChat.receiveUserName}</h1>
                        <p className="text-[13px] text-[grey]">
                          {activeChat.receiveUserName}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="border-t mt-65"></div>
                  <div className="p-4 flex flex-col items-start gap-7">
                    <span className="cursor-pointer">Nicknames</span>
                    <span className="cursor-pointer text-red-500">Report</span>
                    <span className="cursor-pointer text-red-500">Block</span>
                    <button onClick={handleDeleteChat}>
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
            className="bg-white rounded-[20px] relative w-11/12 max-w-130 shadow-lg"
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
              <div className="border-t border-gray-300"></div>
              <div className="p-3 flex items-center gap-2">
                <span className="font-medium">To:</span>
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  type="text"
                  placeholder="Search..."
                  className="border-0 outline-none focus:outline-none focus:ring-0"
                />
              </div>
              <div className="border-t border-gray-300"></div>
            </div>
            <div className="mb-10 p-3">
              <h1 className="font-medium">Suggested</h1>
              <div className="flex flex-col  overflow-x-auto h-100 items-start gap-3 mt-2">
                {data
                  ?.filter((item) =>
                    item.userName.toLowerCase().includes(search.toLowerCase()),
                  )
                  ?.map((item: any) => {
                    return (
                      <div
                        key={item.id}
                        className="flex items-start justify-between w-full p-2 gap-2"
                      >
                        <div className="flex gap-2">
                          <img
                            className="w-12 h-12 rounded-full object-cover"
                            src={
                              item.avatar
                                ? `https://instagram-api.softclub.tj/images/${item.avatar}`
                                : "https://th.bing.com/th/id/R.cf617bf1054e50f7321d18574d8192c8?rik=sAwHhwnmQRBgbA&pid=ImgRaw&r=0"
                            }
                            alt={item.userName || "avatar"}
                          />

                          <div className="flex flex-col items-start">
                            <h1>{item.userName}</h1>
                            <p className="text-[13px] text-[grey]">
                              {item.fullName}
                            </p>
                          </div>
                        </div>

                        <div>
                          <input
                            name="send"
                            type="radio"
                            className="w-5 h-5 accent-blue-500"
                            checked={selectedUserId === item.id}
                            onChange={() => setSelectedUserId(item.id)}
                          />
                        </div>
                      </div>
                    );
                  })}
                <button
                  className="bg-blue-500  w-full text-[white] p-3 rounded hover:bg-blue-600"
                  disabled={!selectedUserId}
                  onClick={() => {
                    if (selectedUserId) {
                      handleStartChat(selectedUserId);
                      setOpenSendMessage(false);
                      setSelectedUserId(null);
                    }
                  }}
                >
                  Chat
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Messages;
