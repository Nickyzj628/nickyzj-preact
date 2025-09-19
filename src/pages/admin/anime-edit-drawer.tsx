import Button from "@/components/button";
import Drawer from "@/components/drawer";
import ImageUploader from "@/components/image-uploader";
import Input from "@/components/input";
import { to } from "@/helpers/network";
import { useAnimeMutation } from "@/hooks/store/use-anime";
import { FormEvent } from "preact/compat";
import { useMemo, useState } from "preact/hooks";
import { toast } from "react-hot-toast/headless";

type Props = {
    data: Anime;
    isOpen: boolean;
    onClose: () => void;
};

const AnimeEditDrawer = ({ data, isOpen, onClose }: Props) => {
    const { title, season, updated } = data ?? {};

    const [cover, setCover] = useState<string>();
    const coverSrc = useMemo(() => {
        if (cover) {
            return cover;
        }
        if (title) {
            return `/Animes/${title}.webp`;
        }
        return `/default.webp`;
    }, [title, cover]);

    const { trigger, isMutating } = useAnimeMutation(season, title);
    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const [error, response] = await to(trigger({ cover }));
        if (error) {
            toast.error(`更新失败：${error.message}`);
            return;
        }
        toast.success("修改成功！");
        onClose();
    };

    return (
        <Drawer
            title="编辑"
            isOpen={isOpen}
            onClose={onClose}
        >
            <form
                className="flex flex-1 flex-col gap-3 overflow-y-hidden"
                onSubmit={onSubmit}
            >
                <div className="flex flex-1 flex-col gap-3 overflow-y-auto">
                    <Input
                        disabled
                        label="标题"
                        value={title}
                    />
                    <ImageUploader
                        label="封面"
                        value={coverSrc}
                        onChange={setCover}
                    />
                    <Input
                        disabled
                        label="季度"
                        value={season}
                    />
                    <Input
                        disabled
                        label="更新时间"
                        value={new Date(updated).toLocaleString()}
                    />
                </div>
                <Button
                    size="lg"
                    rounded="full"
                    disabled={isMutating}
                    className="justify-center w-full"
                >
                    提交
                </Button>
            </form>
        </Drawer>
    );
};

export default AnimeEditDrawer;
