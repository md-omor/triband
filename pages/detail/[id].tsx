import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { HiVolumeOff, HiVolumeUp } from "react-icons/hi";
import { MdOutlineCancel } from "react-icons/md";

import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { BsFillPlayFill } from "react-icons/bs";
import { GoVerified } from "react-icons/go";
import Comment from "../../components/Comment";
import LikeButton from "../../components/LikeButton";
import useAuthStore from "../../store/authStore";
import { Video } from "../../types";
import { BASE_URL } from "../../utils";

interface IProps {
  postDetails: Video;
}

const Detail = ({ postDetails }: IProps) => {
  const [post, setPost] = useState(postDetails);
  const [playing, setplaying] = useState(false);
  const [isVideoMuted, setisVideoMuted] = useState(false);
  const [comment, setComment] = useState<string>("");
  const [isPostingComment, setisPostingComment] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const router = useRouter();
  const { userProfile }: any = useAuthStore();

  const onVideoClick = () => {
    if (playing) {
      videoRef?.current?.pause();
      setplaying(false);
    } else {
      videoRef?.current?.play();
      setplaying(true);
    }
  };

  useEffect(() => {
    if (post && videoRef?.current) {
      videoRef.current.muted = isVideoMuted;
    }
  }, [post, isVideoMuted]);

  const handleDislike = () => {};

  const handleLike = async (like: boolean) => {
    if (userProfile) {
      const { data } = await axios.put(`${BASE_URL}/api/like`, {
        userId: userProfile._id,
        postId: post._id,
        like,
      });
      setPost({ ...post, likes: data.likes });
    }
  };

  const addComment = async (e: any) => {
    e.preventDefault();
    if (userProfile && comment) {
      setisPostingComment(true);

      const { data } = await axios.put(`${BASE_URL}/api/post/${post._id}`, {
        userId: userProfile._id,
        comment,
      });

      setPost({ ...post, comments: data.comments });
      setComment("");
      setisPostingComment(false);
    }
  };

  if (!post) return null;

  return (
    <>
      {post && (
        <div className="flex w-full absolute left-0 top-0 bg-white flex-wrap lg:flex-nowrap">
          <div className="relative flex-2 w-[1000px] lg:w-9/12 flex justify-center items-center bg-blurred-img bg-no-repeat bg-cover bg-center bg-gray-900">
            <div className="opacity-90 absolute top-6 left-2 lg:left-6 flex gap-6 z-50">
              <p className="cursor-pointer " onClick={() => router.back()}>
                <MdOutlineCancel className="text-white text-[35px] hover:opacity-90" />
              </p>
            </div>
            <div className="relative">
              <div className="lg:h-[100vh] h-[60vh]">
                <video
                  ref={videoRef}
                  onClick={onVideoClick}
                  loop
                  src={post?.video?.asset.url}
                  className=" h-full cursor-pointer"
                ></video>
              </div>
              <div className="absolute top-[45%] left-[40%]  cursor-pointer">
                {!playing && (
                  <button onClick={onVideoClick}>
                    <BsFillPlayFill className="text-white text-6xl lg:text-8xl" />
                  </button>
                )}
              </div>
            </div>

            <div className="absolute bottom-5 lg:bottom-10 right-5 lg:right-10 cursor-pointer">
              {isVideoMuted ? (
                <button onClick={() => setisVideoMuted(false)}>
                  <HiVolumeOff className="text-white text-2xl lg:text-4xl" />
                </button>
              ) : (
                <button onClick={() => setisVideoMuted(true)}>
                  <HiVolumeUp className="text-white text-2xl lg:text-4xl" />
                </button>
              )}
            </div>
          </div>

          <div className="relative w-[1000px] md:w-[900px] lg:w-[700px]">
            <div className="lg:mt-20 mt-10">
              <div className="flex gap-3 p-2 cursor-pointer font-semibold rounded">
                <div className="ml-4 md:w-20 md:h-20 w-16 h-16">
                  <Link href="/">
                    <>
                      <Image
                        width={62}
                        height={62}
                        className=" rounded-full"
                        src={post.postedBy?.image}
                        alt="user-profile"
                        layout="responsive"
                      />
                    </>
                  </Link>
                </div>
                <div className="">
                  <Link href="/">
                    <div className="flex flex-col my-3 gap-2">
                      <p className="flex items-center gap-2 md:text-md font-bold text-slate-800">
                        {post.postedBy?.userName} {"  "}
                        <GoVerified className="text-blue-400 text-md" />
                      </p>
                      <p className="capitalize text-xs font-medium text-slate-500 hidden md:block">
                        {post.postedBy?.userName}
                      </p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            <div className="px-10">
              <p className=" text-md text-gray-600">{post.caption}</p>
            </div>

            <div className="mt-10 px-10">
              {userProfile && (
                <LikeButton
                  handleLike={() => handleLike(true)}
                  handleDislike={() => handleLike(false)}
                  likes={post.likes}
                />
              )}
            </div>

            <Comment
              comment={comment}
              setComment={setComment}
              addComment={addComment}
              comments={post.comments}
              isPostingComment={isPostingComment}
            />
          </div>
        </div>
      )}
    </>
  );
};

export const getServerSideProps = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const res = await axios.get(`${BASE_URL}/api/post/${id}`);

  return {
    props: { postDetails: res.data },
  };
};

export default Detail;
