import Table from "@/components/Table";
import Tabs from "@/components/Tabs";
import { toast } from "@/components/Toaster";
import Upload from "@/components/Upload";
import { getAnimes, getBlogs, setBlog, uploadBanner } from "@/utils/network";

const Page = () => {
  return (
    <Tabs names={["文章", "番剧"]} className="flex-1 overflow-x-hidden" tabClassName="w-fit">
      <Table
        key="blogs"
        title="文章管理"
        dataKey="blogs"
        request={getBlogs}
        postData={(blogs) => {
          return blogs.map((blog: Recordable) => {
            blog.updated = new Date(blog.updated).toLocaleString();
            blog.created = new Date(parseInt(blog.id, 36)).toLocaleString();
            return blog;
          });
        }}
        actions={(blog, refetch) => [
          <button
            className="px-2 py-1.5 rounded-xl text-sm whitespace-nowrap"
            onClick={() => {
              setBlog({ ...blog, visibility: +!blog.visibility })
                .then(() => {
                  toast.success("操作成功");
                  refetch();
                })
                .catch((err) => toast.error(err.message));
            }}>
            设置可见性
          </button>,
          <Upload
            name="banner"
            accept="image/png, image/jpeg"
            placeholder="上传封面"
            className="px-2 py-1.5 rounded-xl text-sm whitespace-nowrap"
            onChange={(formData) => {
              uploadBanner(`/blogs/${blog.id}`, formData)
                .then(() => toast.success("上传成功"))
                .catch((err) => toast.error(err.message));
            }}
          />,
        ]}
      />

      <Table
        key="animes"
        title="番剧管理"
        dataKey="animes"
        request={getAnimes}
        postData={(animes) => {
          return animes.map((anime: Recordable) => {
            anime.updated = new Date(anime.updated).toLocaleString();
            anime.created = new Date(parseInt(anime.id, 36)).toLocaleString();
            return anime;
          });
        }}
        actions={(anime) => [
          <Upload
            name="banner"
            accept="image/png, image/jpeg"
            placeholder="上传封面"
            className="px-2 py-1.5 rounded-xl text-sm whitespace-nowrap"
            onChange={(formData) => {
              uploadBanner(`/animes/${anime.id}`, formData)
                .then(() => toast.success("上传成功"))
                .catch((err) => toast.error(err.message));
            }}
          />,
        ]}
      />
    </Tabs>
  )
};

export default Page;