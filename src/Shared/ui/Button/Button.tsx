import type { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  variant?: ButtonVariant;
  padding?: boolean;
}

export const ButtonVariants = {
  ICON: 'icon',
  ICON_TEXT:'icon-text',
  GREY: 'grey',
  LIGHT_GREY: 'lightGrey',
  BLUE: 'blue',
  RED: 'red',
} as const;

export type ButtonVariant = typeof ButtonVariants[keyof typeof ButtonVariants];

const variantClasses: Record<ButtonVariant, string> = {
  icon: 'bg-transparent text-primary [&_svg]:fill-primary [&_svg]:stroke-primary transition-transform duration-200 active:scale-95 md:hover:scale-110 md:hover:opacity-85',
  
  'icon-text': 'flex flex-row items-center justify-center gap-2 transition-transform duration-200 active:scale-95 md:hover:scale-110 md:hover:opacity-85',
  
  grey: 'bg-secondary text-primary transition-all duration-200 md:hover:bg-primary-border md:hover:shadow-soft-hover md:hover:-translate-y-0.5 active:translate-y-0',
  
  lightGrey: 'bg-primary-border text-primary transition-all duration-200 md:hover:bg-secondary md:hover:shadow-soft-hover md:hover:-translate-y-0.5 active:translate-y-0',
  
  blue: 'bg-accent text-primary shadow-soft transition-all duration-200 md:hover:bg-accent-hover md:hover:shadow-soft-hover md:hover:-translate-y-0.5 active:translate-y-0',
  
  red: 'bg-danger text-primary transition-all duration-200 md:hover:bg-danger-hover md:hover:shadow-soft-hover md:hover:-translate-y-0.5 active:translate-y-0',
};

export const Button = (props: ButtonProps) => {
  const { children, className, variant = ButtonVariants.GREY, padding, ...otherProps } = props;

  return (
    <button
      type='button'
      className={`inline-flex items-center justify-center gap-2 border-none m-0 text-sm font-semibold uppercase cursor-pointer select-none rounded-m outline-none disabled:opacity-50 disabled:pointer-events-none ${variantClasses[variant]} ${padding && 'px-5 py-3 text-base md:px-4.5 md:py-2.5 md:text-sm'} ${className}`}
      {...otherProps}
    >
      {children}
    </button>
  );
};
