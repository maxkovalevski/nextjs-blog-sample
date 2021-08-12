import type { NextPage } from "next";
import { RecentPosts, Welcome } from "../components";

const DUMMY_POSTS_LIST = [
  {
    title: "First Post Here",
    image: "first-post-here.png",
    excerpt:
      "Excepteur consequat anim velit eu sint commodo reprehenderit quis.",
    date: "2021-08-08",
    slug: "first-post-here",
  },
];

const Home: NextPage = () => {
  return (
    <>
      <Welcome />
      <RecentPosts posts={DUMMY_POSTS_LIST} />
    </>
  );
};

export default Home;
