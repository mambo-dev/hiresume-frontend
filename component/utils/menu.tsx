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
        src="https://images.unsplash.com/photo-1672888560227-aaf9b90d480a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyMHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
        className="w-full h-full rounded-full"
        alt="profile"
      />
      {isComponentVisible && children}
    </button>
  );
}
