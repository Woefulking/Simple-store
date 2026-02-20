import { InputHTMLAttributes } from "react";
import cls from './Input.module.scss';
import clsx from "clsx";

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>

interface InputProps extends HTMLInputProps {
    label?: string;
    value: string;
    className?: string;
    onChange: (value: string) => void;
    error?: string;
}

export const Input = (props: InputProps) => {
    const { label, value = '', name, disabled, className, placeholder, onChange, error, ...otherProps } = props;

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
    };

    return (
        <div className={clsx(cls.wrapper, className)}>
            {label && <label className={clsx(cls.label)} htmlFor={name}>{label}</label>}
            <input
                id={name}
                name={name}
                value={value}
                disabled={disabled}
                onChange={onChangeHandler}
                placeholder={placeholder}
                className={clsx(cls.input, { [cls.inputError]: error, [cls.disabled]: disabled })}
                {...otherProps}
            />
            {error && <span className={clsx(cls.warning)}>{error}</span>}

        </div>
    )
}