import Link from "next/link";
import { useRouter } from "next/router";
import { topics } from "../utils/constants";

const Discover = () => {
  const router = useRouter();
  const { topic } = router.query;
  return (
    <div className="xl:border-b-2 xl:border-gray-200 pb-6">
      <p className="text-gray-500 font-semibold m-3 mt-4 hidden xl:block ">
        Popular Topics
      </p>
      <div className="flex gap-3 flex-wrap">
        {topics?.map((item) => (
          <Link href={`/?topic=${item.name}`} key={item.name}>
            <div
              className={
                topic === item.name ? "activeTopicStyle" : "topicStyle"
              }
            >
              <span className="text-xl xl:text-md ">{item.icon}</span>
              <span
                className={`font-medium font-Jost text-lg hidden xl:block capitalize`}
              >
                {item.name}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Discover;
