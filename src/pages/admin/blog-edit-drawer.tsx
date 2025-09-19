import Button from "@/components/button";
import Drawer from "@/components/drawer";
import ImageUploader from "@/components/image-uploader";
import Input from "@/components/input";
import { to } from "@/helpers/network";
import { useBlogMutation } from "@/hooks/store/use-blog";
import { FormEvent } from "preact/compat";
import { useMemo, useState } from "preact/hooks";
import { toast } from "react-hot-toast/headless";

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

    const { trigger, isMutating } = useBlogMutation(year, title);
    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const [error, response] = await to(trigger({ cover }));
        if (error) {
            toast.error(`修改失败：${error.message}`);
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
                        label="创建年份"
                        value={year}
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

export default BlogEditDrawer;
