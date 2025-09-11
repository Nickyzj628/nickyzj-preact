import Tabs from "@/components/tabs";
import Animes from "./animes";
import Blogs from "./blogs";

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
            <Tabs.Content value={Tab.Blogs}>
                <Blogs />
            </Tabs.Content>
            <Tabs.Content value={Tab.Animes}>
                <Animes />
            </Tabs.Content>
        </Tabs>
    );
};

export default Page;
