export const TitleVariants = {
    H1: 'h1',
    H2: 'h2',
    H3: 'h3',
} as const;

export type TitleVariant = typeof TitleVariants[keyof typeof TitleVariants];

interface TitleProps {
    children: React.ReactNode;
    className?: string;
    variant?: TitleVariant;
}

const variantClasses: Record<TitleVariant, string> = {
    h1: 'text-2xl md:text-[28px] mb-6',
    h2: 'text-xl md:text-[22px] mb-4',
    h3: 'text-lg md:text-[18px] mb-3',
};


export const Title = ({
    children,
    variant = TitleVariants.H2,
    className,
}: TitleProps) => {
    const Tag = variant;

    return (
        <Tag
            className={`font-semibold text-primary tracking-[0.2px] ${variantClasses[variant]} ${className}`}
        >
            {children}
        </Tag>
    );
};
