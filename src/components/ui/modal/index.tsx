"use client";
import React, { useRef, useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
  children: React.ReactNode;
  showCloseButton?: boolean; // New prop to control close button visibility
  isFullscreen?: boolean; // Default to false for backwards compatibility
  size?: "default" | "large"; 
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  className,
  isFullscreen = false,
   size = "default", 
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const contentClasses = isFullscreen
  ? "w-full h-full " : size === "large"
  ? "relative w-[90vw] h-[85vh] rounded-2xl bg-white dark:bg-gray-900 overflow-y-auto"
  : "relative w-full max-w-lg rounded-3xl bg-white dark:bg-gray-900";

  return (
    <div className="fixed inset-0 flex items-center justify-center overflow-y-auto modal z-50">
      {!isFullscreen && (
        <div
          className="fixed inset-0 h-full w-full bg-gray-500/40 backdrop-blur-[4px]"
          onClick={onClose}
        ></div>
      )}
      <div
        ref={modalRef}
        className={`${contentClasses}  ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
      
        <div>{children}</div>
      </div>
    </div>
  );
};
