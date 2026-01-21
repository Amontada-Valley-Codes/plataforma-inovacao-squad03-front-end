"use client";

import React, { useEffect, useRef } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  showCloseButton?: boolean;
  size?: "default" | "large";
}

export function Modal({
  isOpen,
  onClose,
  children,
  className = "",
  showCloseButton = true,
  size = "default",
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  
  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, [isOpen, onClose]);


  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const modalSize =
    size === "large"
      ? "w-[90vw] h-[85vh]"
      : "w-full max-w-lg";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      
      <div
        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      <div
        ref={modalRef}
        className={`relative z-50 ${modalSize} rounded-2xl bg-white dark:bg-gray-900 ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        
        {showCloseButton && (
          <button
            onClick={onClose}
            className="absolute right-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-800 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            ✕
          </button>
        )}

       
        <div className="h-full scrollbar-hidden">
          {children}
        </div>
      </div>
    </div>
  );
}
