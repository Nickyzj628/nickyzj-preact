import { useBlogMutation } from "@/hooks/store/use-blog";
import { FormEvent } from "preact/compat";
import { useMemo, useState } from "preact/hooks";
import { toast } from "react-hot-toast";
import Drawer from "../drawer";
import ImageUploader from "../image-uploader";
import Input from "../input";

type Props = {
    data: Blog;
    isOpen: boolean;
    onClose: () => void;
};

const BlogEditDrawer = ({ data, isOpen, onClose }: Props) => {
    const { title, year, updated } = data ?? {};

    const [cover, setCover] = useState<string>();
    const coverSrc = useMemo(() => {
        if (cover) {
            return cover;
        }
        if (title) {
            return `/Blogs/${title}.webp`;
        }
        return `/default.webp`;
    }, [title, cover]);

    const { mutate, loading } = useBlogMutation();
    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await mutate({ title, year, cover });
            toast.success("修改成功！");
            onClose();
        } catch (err) {
            toast.error(`更新文章失败：${err.message}`);
        }
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
                        label="创建年份"
                        value={year}
                    />
                    <Input
                        disabled
                        label="更新时间"
                        value={new Date(updated).toLocaleString()}
                    />
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="justify-center w-full"
                >
                    提交
                </button>
            </form>
        </Drawer>
    );
};

export default BlogEditDrawer;