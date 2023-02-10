import React, {
  Dispatch,
  PropsWithChildren,
  ReactNode,
  SetStateAction,
  useEffect,
  useRef,
} from "react";
import { useOutsideAlerter } from "../../hooks/click";

type MenuProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
  className: string;
};
export default function Menu({
  open,
  setOpen,
  children,
  className,
}: MenuProps) {
  const { ref, isComponentVisible, setIsComponentVisible } =
    useOutsideAlerter(false);

  return (
    <button
      ref={ref}
      onClick={() => {
        setIsComponentVisible(!isComponentVisible);
      }}
      className={className}
    >
      <img
        src="/images/avatar.png"
        className="w-full h-full rounded-full"
        alt="profile"
      />
      {isComponentVisible && children}
    </button>
  );
}
