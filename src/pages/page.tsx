import useUserStore from "@/stores/user";
import { getPeriod } from "@/utils";
import Animes from "./_components/Animes";
import Blogs from "./_components/Blogs";
import Shanbay from "./_components/Shanbay";
import styles from "./page.module.css";

const Page = () => {
  const [user] = useUserStore();

  return <>
    <div className="w-full">
      <h4 className="text-zinc-500 dark:text-zinc-500">{getPeriod()}好，欢迎回来：</h4>
      <h1>{user.name}</h1>
    </div>
    <Shanbay className={styles.section} />
    <Blogs className={styles.section} />
    <Animes className={styles.section} />
  </>;
}

export default Page;