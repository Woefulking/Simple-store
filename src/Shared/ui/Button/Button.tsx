import { ButtonHTMLAttributes } from 'react';
import cls from './Button.module.scss';
import clsx from 'clsx';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  variant?: ButtonVariants;
  padding?: boolean;
}

export enum ButtonVariants {
  ICON = 'icon',
  ICON_TEXT = 'icon-text',
  GREY = 'grey',
  LIGHT_GREY = 'lightGrey',
  BLUE = 'blue',
  RED = 'red',
}

export const Button = (props: ButtonProps) => {
  const { children, className, variant = ButtonVariants.GREY, padding, ...otherProps } = props;

  return (
    <button
      type='button'
      className={clsx(cls.button, className, { [cls[variant]]: variant, [cls.padding]: padding })}
      {...otherProps}
    >
      {children}
    </button>
  );
};
