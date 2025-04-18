import Animes from "@/components/admin/animes";
import Blogs from "@/components/admin/blogs";
import Tabs from "@/components/tabs";

enum Tab {
  Blogs,
  Animes,
};

const Page = () => {
  return (
    <Tabs
      defaultValue={Tab.Blogs}
      className="w-full min-h-full"
    >
      <Tabs.List className="w-fit">
        <Tabs.Trigger value={Tab.Blogs}>
          文章
        </Tabs.Trigger>
        <Tabs.Trigger value={Tab.Animes}>
          番剧
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content
        value={Tab.Blogs}
        as={<Blogs />}
      />
      <Tabs.Content
        value={Tab.Animes}
        as={<Animes />}
      />
    </Tabs>
  );
};

export default Page;