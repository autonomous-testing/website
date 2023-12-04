import clsx from "clsx";
import React, { useEffect, useRef, type ComponentPropsWithoutRef } from "react";

export type ModalProps = ComponentPropsWithoutRef<"dialog"> & {
  onClose: () => void;
  chosenImageSrc?: string;
};

export default function Modal(props: ModalProps) {
  const { children, open, onClose, className, chosenImageSrc, ...rest } = props;
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current!;
    if (open) {
      dialog.showModal();
      dialog.dataset.open = "";
    } else {
      delete dialog.dataset.open;
      const handler = () => dialog.close();
      const inner = dialog.children[0] as HTMLElement;
      inner.addEventListener("transitionend", handler);
      return () => inner.removeEventListener("transitionend", handler);
    }
  }, [open]);

  useEffect(() => {
    const dialog = ref.current!;
    const handler = (e: Event) => {
      e.preventDefault();
      onClose();
    };
    dialog.addEventListener("close", handler);
    dialog.addEventListener("cancel", handler);
    return () => {
      dialog.removeEventListener("close", handler);
      dialog.removeEventListener("cancel", handler);
    };
  }, [onClose]);

  return (
    <dialog
      ref={ref}
      className={clsx(
        "group bg-transparent outline-none border-none",
        className
      )}
      {...rest}
    >
      <div
        className="fixed inset-0 px-4 xl:px-0 flex items-center justify-center bg-black/75 opacity-0 transition-all group-data-[open]:opacity-100"
        onClick={onClose}
      >
        <div className="max-w-7xl flex overflow-hidden rounded-xl scale-75 opacity-0 transition-all group-data-[open]:scale-100 group-data-[open]:opacity-100">
          {chosenImageSrc && (
            <img
              src={chosenImageSrc}
              alt="picture"
            />
          )}
          {children}
        </div>
      </div>
    </dialog>
  );
}
