import type { ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
    className?: string;
    children?: ReactNode;
    onClose: () => void;
}

export const Modal = (props: ModalProps) => {
    const { className, children, onClose } = props;

    return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 animate-fade-in" onClick={onClose}>
            <div
                className={`z-50 bg-secondary border border-primary-border flex items-center justify-center rounded-2xl shadow-hover w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 md:p-8 ${className}`}
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>,
        document.body
    );
}