import { ReactNode, useState } from "react";
import { Dialog } from "@headlessui/react";

type Modal = {
  isOpen: boolean;
  setIsOpen: Function;
  children: ReactNode;
};
export default function Modal({ isOpen, setIsOpen, children }: Modal) {
  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4 h-screen">
        <Dialog.Panel className=" w-full  md:w-1/2 rounded bg-white h-[fit-content] overflow-auto ">
          {children}
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
