import { FaUser } from "react-icons/fa";
import { CiCamera } from "react-icons/ci";  
import { getInitials, useUserStore } from "Entities/User";

interface AvatarProps {
    size?: 'm' | 'xl';
    editable?: boolean;
    className?: string;
    onClick?: () => void
}

const sizeClasses = {
    m: 'size-9 text-sm',
    xl: 'size-20 text-2xl',
};

export const Avatar = (props: AvatarProps) => {
    const { size = 'm', className, editable = false, onClick } = props;

    const user = useUserStore((state) => state.user)!;

    const hasUser = Boolean(user);
    const hasAvatar = Boolean(user?.avatar);
    const hasInitials = Boolean(user?.name || user?.secondName);

    const showInitials = hasInitials && !hasAvatar;
    const showAvatar = hasAvatar;
    const showDefault = !hasUser || (!hasInitials && !hasAvatar);

    return (
        <div className={`group relative rounded-full flex items-center justify-center cursor-pointer z-1 select-none transition-all duration-200 md:hover:scale-110 md:hover:opacity-85 ${sizeClasses[size]} ${className}`} onClick={onClick}>
            {showDefault && <FaUser className="size-1/2 text-muted"/>}

            {showAvatar && <img src={user?.avatar} alt="avatar" className="w-full h-full object-cover rounded-full"  />}

            {showInitials && (
                <span className="font-bold text-primary tracking-wider uppercase">
                    {getInitials(user)}
                </span>
            )}

            {editable && (
                <div className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 bg-black/70 rounded-full flex items-center justify-center transition-opacity duration-200">
                    <CiCamera className={`text-primary-text transition-transform duration-200 group-hover:scale-105 ${size === 'xl' ? 'size-10' : 'size-4'}`} />
                </div>
            )}
        </div>
    )
}