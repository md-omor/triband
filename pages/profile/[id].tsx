import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import { GoVerified } from "react-icons/go";
import NoResults from "../../components/NoResults";
import VideoCard from "../../components/VideoCard";
import { IUser, Video } from "../../types";
import { BASE_URL } from "../../utils";

interface IProps {
  data: {
    user: IUser;
    userVideos: Video[];
    userLikedVideos: Video[];
  };
}

const Profile = ({ data }: IProps) => {
  const { user, userVideos, userLikedVideos } = data;
  const [showUserVideo, setShowUserVideo] = useState(true);
  const [videosList, setvideosList] = useState<Video[]>([]);

  const videos = showUserVideo
    ? "border-b-2 border-gray-900 "
    : "text-gray-400";
  const liked = !showUserVideo
    ? "border-b-2 border-gray-900 "
    : "text-gray-400";

  useEffect(() => {
    if (showUserVideo) {
      setvideosList(userVideos);
    } else {
      setvideosList(userLikedVideos);
    }
  }, [showUserVideo, userVideos, userLikedVideos]);

  return (
    <>
      <Head>
        <title>Profile - Triband</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="w-full">
        <div className="flex gap-6 md:gap-10 mb-4 bg-white w-full">
          <div className="w-16 h-16 md:w-32 md:h-32">
            <Image
              src={user.image}
              width={120}
              height={120}
              className="rounded-full"
              alt="user Profile"
              layout="responsive"
            />
          </div>

          <div className="flex flex-col justify-center">
            <p className="md:text-2xl tracking-wider justify-center flex gap-1 items-center text-md font-bold text-primary lowercase">
              {user.userName.replace(" ", "")}
              <GoVerified className="text-blue-400" />
            </p>

            <p className="capitalize text-gray-400 md:text-xl text-xs">
              {user.userName}
            </p>
          </div>
        </div>

        <div className="">
          <div className="flex gap-10 mb-10 mt-10 border-b-2 border-gray-200 bg-white w-full">
            <p
              className={`text-xl font-semibold cursor-pointer ${videos} mt-2`}
              onClick={() => setShowUserVideo(true)}
            >
              Videos
            </p>
            <p
              className={`text-xl font-semibold cursor-pointer ${liked} mt-2`}
              onClick={() => setShowUserVideo(false)}
            >
              Liked
            </p>
          </div>
          <div className="flex gap-6 flex-wrap md:justify-start">
            {videosList ? (
              videosList.map((post: Video, idx: number) => (
                <VideoCard key={idx} post={post} />
              ))
            ) : (
              <NoResults
                text={`No ${showUserVideo ? "" : "Liked"} Videos Yet`}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const res = await axios.get(`${BASE_URL}/api/profile/${id}`);

  return {
    props: {
      data: res.data,
    },
  };
};

export default Profile;
