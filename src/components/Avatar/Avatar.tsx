import { FaUser } from "react-icons/fa";
import { getInitials } from "helpers/getInitials";
import { CiCamera } from "react-icons/ci";
import cls from './Avatar.module.scss';
import clsx from "clsx";
import { useUserStore } from "entities/User/UserStore";

interface AvatarProps {
    size?: 'm' | 'xl';
    editable?: boolean;
    className?: string;
    onClick?: () => void
}

export const Avatar = (props: AvatarProps) => {
    const { size = 'm', className, editable = false, onClick } = props;

    const user = useUserStore((state) => state.user);

    const hasUser = Boolean(user);
    const hasAvatar = Boolean(user?.avatar);
    const hasInitials = Boolean(user?.name || user?.secondName);

    const showInitials = hasInitials && !hasAvatar;
    const showAvatar = hasAvatar;
    const showDefault = !hasUser || (!hasInitials && !hasAvatar);

    const backgroundColor = user?.avatarColor ?? 'transparent';

    return (
        <div className={clsx(cls.avatar, className, cls[`avatarSize--${size}`])} style={{ backgroundColor }} onClick={onClick}>
            {showDefault && <FaUser />}

            {showAvatar && <img src={user?.avatar} alt="avatar" />}

            {showInitials && (
                <span className={clsx(cls.initials)}>
                    {getInitials(user)}
                </span>
            )}

            {editable && (
                <div className={clsx(cls.overlay)}>
                    <CiCamera />
                </div>
            )}
        </div>
    )
}