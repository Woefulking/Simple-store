import { ReactNode } from 'react';
import cls from './Modal.module.scss';
import clsx from 'clsx';
import { createPortal } from 'react-dom';

interface ModalProps {
    children?: ReactNode;
    onClose: () => void;
}

export const Modal = (props: ModalProps) => {
    const { children, onClose } = props;

    return createPortal(
        <div className={clsx(cls.overlay)} onClick={onClose}>
            <div
                className={clsx(cls.content)}
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>,
        document.body
    );
}