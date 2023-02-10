import { ReactNode, useState } from "react";
import { Dialog } from "@headlessui/react";
import { motion } from "framer-motion";

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

      <div className="fixed inset-0 flex items-center justify-center p-4 h-screen ">
        <motion.div
          initial={{ opacity: 0, x: 0 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className=" w-full  md:w-1/2 rounded bg-white h-fit overflow-y-auto "
        >
          <Dialog.Panel>{children}</Dialog.Panel>
        </motion.div>
      </div>
    </Dialog>
  );
}
