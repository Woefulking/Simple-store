import type { InputHTMLAttributes } from 'react';

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
        <div className={`flex flex-col gap-2 w-full ${className}`}>
            {label && <label className="text-secondary-text text-sm font-medium" htmlFor={name}>{label}</label>}
            <input
                id={name}
                name={name}
                value={value}
                disabled={disabled}
                onChange={onChangeHandler}
                placeholder={placeholder}
                className={`
                    "w-full border rounded-2xl bg-tertiary text-primary text-sm outline-none transition-all duration-200 placeholder:text-muted pl-4 pr-10 py-3 md:py-2.5 ${!error && "border-primary-border enabled:hover:border-accent enabled:focus:border-accent enabled:focus:ring-1 enabled:focus:ring-accent/30"} ${error && "border-danger text-danger focus:ring-1 focus:ring-danger/30 placeholder:text-danger/50"} "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-primary-border disabled:focus:ring-0"`}
                {...otherProps}
            />
            {error && <span className="text-xs text-danger font-medium mt-0.5">{error}</span>}

        </div>
    )
}