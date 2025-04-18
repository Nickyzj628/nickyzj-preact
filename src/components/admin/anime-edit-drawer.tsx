import { useAnimeMutation } from "@/hooks/store";
import { toast } from "@/stores/toast";
import { FormEvent } from "preact/compat";
import { useEffect, useState } from "preact/hooks";
import Drawer from "../drawer";
import ImageUploader from "../image-uploader";
import Input from "../input";

type Props = {
  data: Anime;
  isOpen: boolean;
  onClose: () => void;
};

const AnimeEditDrawer = ({ data, isOpen, onClose }: Props) => {
  const {
    id,
    title,
    updated,
  } = data ?? {};

  const [banner, setBanner] = useState<string>();

  // 初始值
  useEffect(() => {
    if (!isOpen) return;
    setBanner(`/Animes/${id}.webp`);
  }, [isOpen]);

  const { mutate, loading } = useAnimeMutation();
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const hasChangedBanner = banner !== `/Animes/${id}.webp`;
      await mutate({
        id,
        banner: hasChangedBanner ? banner : undefined,
      });
      toast.success("修改成功！");
      onClose();
    } catch (err) {
      toast.error(`更新番剧失败：${err.message}`);
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
          <Input
            disabled
            label="Updated"
            defaultValue={new Date(updated).toLocaleString()}
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

export default AnimeEditDrawer;