import { useSocket } from "@/contexts/socket";
import { sleep } from "@/helpers/time";
import { useRouter, useUser } from "@/hooks/store";
import { $router } from "@/stores/router";
import { FormEvent } from "preact/compat";
import { useEffect, useRef, useState } from "preact/hooks";

type Message = {
    userName: string;
    text: string;
};

const Room = () => {
    const router = useRouter();
    const { roomId } = router.search;

    const { name: userName } = useUser();

    const socket = useSocket();
    const socketId = socket?.id;

    /**
     * 房间进出相关逻辑
     */

    const [isInRoom, setIsInRoom] = useState(false);

    // 创建房间
    const onCreateRoom = () => {
        socket?.emit("createRoom", { userName });
    };

    // 加入房间
    useEffect(() => {
        if (socket && socketId && roomId && !isInRoom) {
            socket.emit("joinRoom", roomId, { userName });
        }
    }, [socket, socketId, roomId, isInRoom]);

    // 房间进出相关事件
    useEffect(() => {
        if (!socket) return;

        socket.on("roomCreated", async (roomId) => {
            const queryString = Object.entries({ ...router.search, roomId })
                .map(([key, value]) => `${key}=${value}`)
                .join("&");
            $router.open(`${router.path}?${queryString}`);
            setIsInRoom(true);
        });

        socket.on("roomJoined", () => {
            setIsInRoom(true);
        });
    }, [socket, roomId]);

    /**
     * 消息收发相关逻辑
     */

    const [messages, setMessages] = useState<Message[]>([]);

    // 发消息
    const onSendMessage = (e: FormEvent) => {
        e.preventDefault();

        if (!socket) return;

        const form = e.target as HTMLFormElement;
        const input = form.elements["text"] as HTMLInputElement;
        const message = { userName, text: input.value };

        socket.emit("roomMessage", roomId, message);
        form.reset();
    };

    // 收消息
    useEffect(() => {
        if (!socket) return;

        socket.on("roomMessage", (message: Message) => {
            setMessages((prev) => [...prev, message]);
        });

        return () => {
            socket.off("roomMessage");
        };
    }, [socket]);

    // 聊天框自动滚动至底部
    const messagesRef = useRef<HTMLUListElement>(null);
    useEffect(() => {
        if (!messagesRef.current) {
            return;
        }
        messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }, [messages]);

    if (!isInRoom) {
        return (
            <button className="w-full justify-center" onClick={onCreateRoom}>
                创建房间
            </button>
        );
    }

    return <>
        <ul ref={messagesRef} className="flex-1 overflow-y-auto">
            {messages.map((message, index) => (
                <li key={index}>
                    <strong>{message.userName}:</strong> {message.text}
                </li>
            ))}
        </ul>
        <form className="mt-3" onSubmit={onSendMessage}>
            <input
                name="text"
                placeholder="点击输入文本"
                className="w-full p-2 border border-neutral-300 rounded-xl transition focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
        </form>
    </>;
};

export default Room;