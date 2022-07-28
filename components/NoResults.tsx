import { BiCommentX } from "react-icons/bi";
import { MdOutlineVideocamOff } from "react-icons/md";

interface IProps {
  text: string;
}

const NoResults = ({ text }: IProps) => {
  return (
    <div className="flex flex-col justify-center items-center h-full w-full">
      <p className="text-8xl">
        {text === "No comments yet" ? <MdOutlineVideocamOff /> : <BiCommentX />}
      </p>
      <p className="text-2xl text-center">{text}</p>
    </div>
  );
};

export default NoResults;
