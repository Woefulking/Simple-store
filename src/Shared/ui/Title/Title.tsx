import clsx from 'clsx';
import cls from './Title.module.scss';

export enum TitleVariants {
    H1 = 'h1',
    H2 = 'h2',
    H3 = 'h3',
}

interface TitleProps {
    children: React.ReactNode;
    className?: string;
    variant?: TitleVariants;
}

export const Title = ({
    children,
    variant = TitleVariants.H2,
    className,
}: TitleProps) => {
    const Tag = variant;

    return (
        <Tag
            className={clsx(
                cls.title,
                cls[`title-${variant}`],
                className
            )}
        >
            {children}
        </Tag>
    );
};
