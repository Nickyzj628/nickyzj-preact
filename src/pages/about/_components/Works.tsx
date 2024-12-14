import Card from "@/components/Card";
import Timeline from "@/components/Timeline";
import { useMemo } from "preact/hooks";

const Works = () => {
  const works = useMemo(() => Object.entries(
    Object.groupBy(
      [
        {
          time: "2023年",
          title: "毕业设计",
          description: "React + TDesign + Websocket + SQLite",
          image: "/About/Works/mentalcomm.webp",
          href: "https://www.bilibili.com/video/BV1p94y1H7un",
        },
        {
          time: "2022年",
          title: "动画放映室",
          description: "Vue2 + Vuesax + Socket.IO + MySQL",
          image: "/About/Works/teamdouga.webp",
          href: "https://www.bilibili.com/video/BV1kZ4y1a7AF",
        },
        {
          time: "2022年",
          title: "信息聚合App",
          description: "Expo + React Native + styled-components + Recoil + SQLite",
          image: "/About/Works/peek.webp",
          href: "https://www.bilibili.com/video/BV1rg411i7i2",
        },
        {
          time: "2019年",
          title: "暑假实习",
          description: "Photoshop + ThinkPHP",
          image: "/About/Works/ygd.webp",
          href: "http://nickyzj.ddns.net:2020/Nickyzj/Photos/About/Works/ygd_raw.webp",
        },
        {
          time: "2019年",
          title: "星光计划",
          description: "Photoshop + Wordpress + MySQL",
          image: "/About/Works/xgjh.webp",
          href: "http://nickyzj.ddns.net:2020/Nickyzj/Photos/About/Works/xgjh_raw.webp",
        },
        {
          time: "2018年",
          title: "世界技能大赛",
          description: "Photoshop + Wordpress + MySQL",
          image: "/About/Works/sjjnds.webp",
          href: "http://nickyzj.ddns.net:2020/Nickyzj/Photos/About/Works/sjjnds_raw.webp",
        }
      ],
      (work) => work.time
    )
  ), []);

  return <>
    {works.map(([year, works]) => (
      <Timeline key={year} time={year} childrenContainerClassname="flex-nowrap pb-0 mb-10 overflow-x-auto">
        {works?.map((work, i) => (
          <a key={i} href={work.href} target="_blank">
            <Card
              image={work.image}
              title={work.title}
              description={work.description}
              className="aspect-[3/2] w-64"
              imageClassName="no-zoom"
            />
          </a>
        ))}
      </Timeline>
    ))}
  </>;
};

export default Works;