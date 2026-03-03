import { ReactNode } from 'react';
import cls from './Modal.module.scss';
import clsx from 'clsx';

interface ModalProps {
    children?: ReactNode;
    isOpen: boolean;
    onClose: () => void;
}

export const Modal = (props: ModalProps) => {
    const { children, isOpen, onClose } = props;

    if (!isOpen) return null;

    return (
        <div className={clsx(cls.overlay)} onClick={onClose}>
            <div className={clsx(cls.content)}>
                {children}
            </div>
        </div>
    )
}