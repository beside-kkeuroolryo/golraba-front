import { useEffect, useRef } from 'react';
import useLockBodyScroll from '@/hooks/useLockBodyScroll';

export type ModalProps = {
  children?: React.ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
  className?: string;
};

export default function Modal({ children, isOpen = false, onClose, className }: ModalProps) {
  useLockBodyScroll(isOpen);
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  const handleClickOutside = (e: React.MouseEvent) => {
    const dialogElement = dialogRef.current;

    if (!dialogElement || dialogElement !== e.target) return;
    onClose?.();
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Escape') {
        onClose?.();
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, onClose]);

  useEffect(() => {
    const dialogElement = dialogRef.current;
    if (isOpen && dialogElement) {
      dialogElement.showModal();
    } else if (!isOpen && dialogElement) {
      dialogElement.close();
    }
    if (isOpen) return () => dialogElement?.close();
  }, [isOpen]);

  return (
    <dialog
      aria-modal="true"
      aria-label="댓글달기"
      className={`absolute left-1/2 top-[20%] -translate-x-1/2 rounded-12 bg-white p-0 backdrop:bg-black backdrop:bg-opacity-25`}
      onClick={handleClickOutside}
      ref={dialogRef}
    >
      <div className={`flex flex-col items-center ${className}`}>{children}</div>
    </dialog>
  );
}