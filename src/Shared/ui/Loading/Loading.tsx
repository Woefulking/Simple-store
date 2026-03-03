import clsx from 'clsx';
import cls from './Loading.module.scss';
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export const Loading = () => {
    return (
        <div className={clsx(cls.overlay)}>
            <AiOutlineLoading3Quarters size={86} className={clsx(cls.loading)} />
        </div>
    )
}