import clsx from 'clsx';
import cls from './ErrorMessage.module.scss';
import { TfiFaceSad } from "react-icons/tfi";

export const ErrorMessage = () => {
    return (
        <div className={clsx(cls.error)}>
            <TfiFaceSad size={128} />
            <span className={clsx(cls.message)}>Failed to load products. Please refresh the page.</span>
        </div>
    )
}