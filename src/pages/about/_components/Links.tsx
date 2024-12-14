import Card from "@/components/Card";
import Title from "@/components/Title";
import useScrollX from "@/hooks/useScrollX";
import { useMemo, useRef } from "preact/hooks";

const Links = () => {
  const links = useMemo(() => [
    {
      title: "哔哩哔哩",
      description: "大概每年发一到两部视频的样子",
      image: "/About/Links/bilibili.webp",
      href: "https://space.bilibili.com/1286127",
    },
    {
      title: "优酷",
      description: "本人早期驯服剪辑软件的珍贵影像",
      image: "/About/Links/youku.webp",
      href: "https://www.youku.com/profile/index/?spm=a2hbt.13141534.1_1.d_account&uid=UMTQxMjkwNDc5Ng==",
    },
    {
      title: "osu!",
      description: "只有超越极限，才能攀至顶峰！",
      image: "/About/Links/osu.webp",
      href: "https://osu.ppy.sh/users/4735740",
    },
    {
      title: "Apex",
      description: "17赛季大师举起双手🙋‍",
      image: "/About/Links/apex.webp",
      href: "https://apex.tracker.gg/apex/profile/origin/Nickyzj2021/overview",
    },
    {
      title: "CS:GO",
      description: "都开了是吧？那我也不演了！",
      image: "/About/Links/csgo.webp",
      href: "https://arena.5eplay.com/data/player/tntt/s1/2021/1",
    },
    {
      title: "力扣",
      description: "我们所经历的每个平凡的日常，也许就是……",
      extra: "连续发生的奇迹",
      image: "/About/Links/leetcode.webp",
      href: "https://leetcode.cn/u/nickyzj/",
    },
    {
      title: "GitHub",
      description: "努力、未来、A Beautiful Star",
      image: "/About/Links/github.webp",
      href: "https://github.com/Nickyzj628",
    }
  ], []);

  const friends = useMemo(() => [
    {
      title: "铅笔",
      description: "这是一个圆披萨，简称……",
      extra: "OP！",
      image: "/About/Links/wht.webp",
      href: "https://wpencil.top",
    },
    {
      title: "飞翔",
      description: "奥比岛15年荣誉岛民",
      image: "/About/Links/wjb.webp",
      href: "http://kyzr2000.gitee.io/myblog",
    },
    {
      title: "抹杀",
      description: "居然还在大师",
      image: "/About/Links/fjm.webp",
      href: "https://space.bilibili.com/8268662",
    },
    {
      title: "胖次",
      description: "健身与南桐爱好者",
      image: "/About/Links/yzc.webp",
      href: "https://300report.jumpw.com/#/MyScore?r=537564775&m=0",
    },
  ], []);

  const linksRef = useRef<HTMLDivElement>(null);
  const friendsRef = useRef<HTMLDivElement>(null);
  useScrollX(linksRef);
  useScrollX(friendsRef);

  return (
    <div className="flex flex-col gap-5">
      <div>
        <Title className="text-blue-300">我的战绩</Title>
        <div ref={linksRef} className="mt-1.5 flex flex-nowrap gap-3 overflow-x-auto">
          {links.map((link, i) => (
            <a key={i} href={link.href} target="_blank">
              <Card
                image={link.image}
                title={link.title}
                description={link.description}
                extra={link.extra}
                className="aspect-square w-32 sm:w-36"
                imageClassName="no-zoom"
                descriptionClassName="max-h-32 text-pretty"
              />
            </a>
          ))}
        </div>
      </div>
      <div>
        <Title className="text-red-300">热血战友</Title>
        <div ref={friendsRef} className="mt-1.5 flex gap-3 overflow-x-auto">
          {friends.map((friend, i) => (
            <a key={i} href={friend.href} target="_blank">
              <Card
                image={friend.image}
                title={friend.title}
                description={friend.description}
                extra={friend.extra}
                className="aspect-square w-32 sm:w-36"
                imageClassName="no-zoom"
                descriptionClassName="max-h-32 text-pretty"
              />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Links;