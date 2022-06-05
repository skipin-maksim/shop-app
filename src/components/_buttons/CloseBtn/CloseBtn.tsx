import { FC } from "react";
import { AiFillCloseCircle, AiOutlineCloseCircle } from "react-icons/ai";

interface IProps {
  onClose: () => void;
  styleType: "fill" | "outline";
}

const CloseBtn: FC<IProps> = ({ onClose, styleType = "outline" }) => {
  return (
    <>
      {
        {
          fill: <AiFillCloseCircle onClick={onClose} />,

          outline: <AiOutlineCloseCircle onClick={onClose} />,
        }[styleType]
      }
    </>
  );
};

export default CloseBtn;
