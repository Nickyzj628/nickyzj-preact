import { useSocket } from "@/contexts/socket";
import { copyToClipboard } from "@/helpers/dom";
import { qs } from "@/helpers/string";
import { useRouter, useUser } from "@/hooks/store";
import { $router } from "@/stores/router";
import { FormEvent } from "preact/compat";
import { useEffect, useRef, useState } from "preact/hooks";
import { toast } from "react-hot-toast";
import Badge from "../../components/badge";

const getBadgeInfo = (message: RoomMessage): { type: "default" | "info" | "danger" | "invert", role: string } => {
    if (message.type === "system") {
        return {
            type: "danger",
            role: "系统",
        };
    }
    if (message.type === "host") {
        return {
            type: "info",
            role: "房主",
        };
    }
    return {
        type: "invert",
        role: "观众",
    };
};

const Room = ({
    isHost = true,
    onChangeHost = (isHost: boolean) => void 0,
}) => {
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
        socket.emit("createRoom", { userName });
    };

    // 加入房间
    useEffect(() => {
        if (socket && socketId && roomId && !isInRoom) {
            socket.emit("joinRoom", roomId, { userName });
        }
    }, [socket, socketId, roomId, isInRoom]);

    // 房间进出相关事件
    useEffect(() => {
        if (!socket) {
            return;
        }

        const onRoomCreated = async (roomId) => {
            const queryString = qs.stringify({
                ...qs.parse(location.search),
                roomId
            });
            $router.open(`${router.path}?${queryString}`);
            setIsInRoom(true);
            onChangeHost(true);
            toast.success(<>
                <span>房间创建成功！</span>
                <span className="text-blue-500 cursor-pointer" onClick={() => copyToClipboard(location.href)}>点我复制链接到剪贴板</span>
            </>, { duration: 10000 });
        };

        const onRoomJoined = () => {
            setIsInRoom(true);
            onChangeHost(false);
        };

        const onHostChanged = () => {
            onChangeHost(true);
            toast.success("你成为了房主！");
        };

        socket.on("roomCreated", onRoomCreated);
        socket.on("roomJoined", onRoomJoined);
        socket.on("hostChanged", onHostChanged);

        return () => {
            socket.off("roomCreated", onRoomCreated);
            socket.off("roomJoined", onRoomJoined);
            socket.off("hostChanged", onHostChanged);
        };
    }, [socket, roomId]);

    /**
     * 消息收发相关逻辑
     */

    const [messages, setMessages] = useState<RoomMessage[]>([]);

    // 发消息
    const onSendMessage = (e: FormEvent) => {
        e.preventDefault();

        if (!socket) {
            return;
        }

        const form = e.target as HTMLFormElement;
        const input = form.elements["text"] as HTMLInputElement;
        const message = { userName, isHost, text: input.value };

        socket.emit("roomMessage", message);
        form.reset();
    };

    // 收消息
    useEffect(() => {
        if (!socket) {
            return;
        }

        const onRoomMessage = (message: RoomMessage) => {
            setMessages((prev) => [...prev, message]);
        };

        socket.on("roomMessage", onRoomMessage);

        return () => {
            socket.off("roomMessage", onRoomMessage);
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
        <ul ref={messagesRef} className="flex flex-1 flex-col gap-2 overflow-y-auto">
            {messages.map((message, index) => {
                const badgeInfo = getBadgeInfo(message);
                return (
                    <li key={index} className="flex items-start gap-1">
                        <Badge type={badgeInfo.type}>
                            {badgeInfo.role}
                        </Badge>
                        <div className="flex-1 text-neutral-800 transition dark:text-neutral-200">
                            {message.userName && (
                                <strong>{message.userName}：</strong>
                            )}
                            <span>{message.text}</span>
                        </div>
                    </li>
                );
            })}
        </ul>
        <form className="mt-3" onSubmit={onSendMessage}>
            <input
                name="text"
                placeholder="点击输入文本"
                className="py-2 sm:py-2.5 px-3 block w-full border-gray-200 outline-none rounded-xl sm:text-sm transition focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
            />
        </form>
    </>;
};

export default Room;
