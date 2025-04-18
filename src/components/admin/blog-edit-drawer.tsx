import { useBlogMutation } from "@/hooks/store";
import { toast } from "@/stores/toast";
import { FormEvent } from "preact/compat";
import { useEffect, useState } from "preact/hooks";
import Drawer from "../drawer";
import ImageUploader from "../image-uploader";
import Input from "../input";
import Switch from "../switch";

type Props = {
  data: Blog;
  isOpen: boolean;
  onClose: () => void;
};

const BlogEditDrawer = ({ data, isOpen, onClose }: Props) => {
  const {
    id,
    title,
    visibility: defaultVisibility,
    updated,
  } = data ?? {};

  const [visibility, setVisibility] = useState<number>();
  const [banner, setBanner] = useState<string>();

  // 初始值
  useEffect(() => {
    if (!isOpen) return;
    setVisibility(defaultVisibility);
    setBanner(`/Blogs/${id}.webp`);
  }, [isOpen]);

  const { mutate, loading } = useBlogMutation();
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const hasChangedBanner = banner !== `/Blogs/${id}.webp`;
      await mutate({
        id,
        visibility,
        banner: hasChangedBanner ? banner : undefined,
      });
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
            label="Title"
            value={title}
          />
          <ImageUploader
            label="Banner"
            value={banner}
            onChange={setBanner}
          />
          <Switch
            label="Visibility"
            checked={Boolean(visibility)}
            onChange={(checked) => setVisibility(Number(checked))}
          />
          <Input
            disabled
            label="Updated"
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