import clsx from 'clsx';
import cls from './Error.module.scss';
import { TfiFaceSad } from "react-icons/tfi";

export const Error = () => {
    return (
        <div className={clsx(cls.error)}>
            <TfiFaceSad size={128} />
            <span className={clsx(cls.message)}>Произошла ошибка при загрузке списка товаров. Попробуйте обновить страницу</span>
        </div>
    )
}