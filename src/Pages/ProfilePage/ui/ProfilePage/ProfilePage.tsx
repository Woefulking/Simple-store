import { Avatar } from "entities/User/ui/Avatar/Avatar";
import { Button, ButtonVariants } from "Shared/ui/Button/Button";
import { Input } from "Shared/ui/Input/Input";
import { useRef, useState } from "react";
import { CiEdit } from "react-icons/ci";
import z from "zod";
import { useClickOutside } from "Shared/hooks/useClickOutside";
import { deleteUserFromLocalStorage, updateUser } from "app/storage/userStorage";
import { removeCurrentUser } from "app/storage/currentUserStore";
import { Title, TitleVariants } from "Shared/ui/Title/Title";
import cls from './ProfilePage.module.scss';
import clsx from "clsx";
import { ensureAvatarColor, User, userFields, useUserStore } from "entities/User";
import { useCartStore } from "entities/Cart";
import { useFavoritesStore } from "entities/Favorites";
import { EmailErrors, emailSchema } from "Pages/ProfilePage";
import { ChangePasswordModal } from "Features/ChangePasswordModal";
import { OrderPreview } from "entities/Order";
import { useNavigate } from "react-router";

export const ProfilePage = () => {
    const navigate = useNavigate();
    const user = useUserStore((state) => state.user)!;
    const userDispatch = useUserStore((state) => state.dispatch);
    const cartDispatch = useCartStore((state) => state.dispatch);
    const favoriteDispatch = useFavoritesStore((state) => state.dispatch);

    const orders = useUserStore((state) => state.user?.orders);

    const sortedOrders = orders
        ? [...orders].sort((a, b) => b.createAt - a.createAt)
        : [];

    const [draftUser, setDraftUser] = useState<User>(user);
    const [editableField, setEditableField] = useState<keyof User | null>(null);

    const [isPasswordFormOpen, setPasswordFormOpen] = useState<boolean>(false);

    const [emailErrors, setEmailErrors] = useState<EmailErrors>({});

    const fileInputRef = useRef<HTMLInputElement>(null)

    const validateEmail = () => {
        const result = emailSchema.safeParse({ email: draftUser.email });

        if (result.success) {
            setEmailErrors({});
            return true;
        }

        const flattened = z.flattenError(result.error);

        const nextErrors: EmailErrors = {};
        nextErrors.email = flattened.fieldErrors.email?.[0];

        setEmailErrors(nextErrors);
        return false;
    };

    const onEdithandler = (field: keyof User) => {
        setEditableField(field);
        setDraftUser(user);
    };

    const onChangehandler = (field: keyof User, value: string) => {
        setDraftUser((prev) => ({
            ...prev, [field]: value
        }));

        if (field === 'email') {
            setEmailErrors((prev) => ({
                ...prev, [field]: undefined
            }))
        }
    }

    const onCancelhandler = () => {
        setDraftUser(user);
        setEditableField(null);
    }

    const onSaveHandler = () => {
        if (editableField === 'email' && !validateEmail()) return;

        let nextUser = { ...draftUser };

        nextUser = ensureAvatarColor(nextUser);

        updateUser(nextUser);
        userDispatch({ type: 'update', payload: nextUser });

        setEditableField(null);
    };

    const handleAvatarClick = () => {
        fileInputRef.current?.click();
    }

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        const url = URL.createObjectURL(file)

        userDispatch({
            type: 'update',
            payload: { avatar: url },
        })

        if (user) {
            updateUser({ ...user, avatar: url });
        }
    }

    const handleLogoutClick = () => {
        userDispatch({ type: 'logout' });
        cartDispatch({ type: 'clear' });
        favoriteDispatch({ type: 'clear' });
        removeCurrentUser();
    }

    const handleDeleteAccountClick = () => {
        userDispatch({ type: 'delete', payload: { login: user.login } });
        cartDispatch({ type: 'clear' });
        favoriteDispatch({ type: 'clear' });
        deleteUserFromLocalStorage(user.login);
        removeCurrentUser();
    }

    return (
        <>
            <div className={clsx(cls.profile)}>
                <Title variant={TitleVariants.H1}>My Account</Title>
                <div className={clsx(cls.content)}>
                    <div className={clsx(cls.orders)}>
                        <Title variant={TitleVariants.H2} className={clsx(cls.subtitle)}>Order History</Title>
                        {sortedOrders.length > 0 ? (
                            <div className={clsx(cls.list)}>
                                {sortedOrders?.map((order) => (
                                    <OrderPreview order={order} key={order.id} onClick={() => navigate(`/orders/${order.id}`)} />
                                ))}
                            </div>
                        ) : <div className={clsx(cls.ordersEmpty)}>Пока пусто</div>
                        }
                    </div>
                    <div className={clsx(cls.details)}>
                        <Title variant={TitleVariants.H2} className={clsx(cls.subtitle)}>Personal Details</Title>
                        <form className={clsx(cls.form)}>
                            <div className={clsx(cls.wrapper)}>
                                <div className={clsx(cls.avatar)}>
                                    <Avatar onClick={handleAvatarClick} size='xl' editable={true} />
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/*"
                                        hidden
                                        onChange={handleAvatarChange}
                                    />
                                </div>
                                <span className={clsx(cls.initials)}>{`${user.name} ${user.secondName}`}</span>
                            </div>
                            <div className={clsx(cls.fields)}>
                                {userFields.map((field) => {
                                    const isEditing = editableField === field.name;
                                    return (
                                        <div className={clsx(cls.field)} key={field.name}>
                                            <Input
                                                className={clsx(cls.input)}
                                                type='text'
                                                label={field.label}
                                                name={field.name}
                                                value={
                                                    isEditing
                                                        ? draftUser?.[field.name] ?? ''
                                                        : user?.[field.name] ?? ''
                                                }
                                                disabled={!isEditing}
                                                onChange={(value: string) => onChangehandler(field.name, value)}
                                                error={field.name === 'email' ? emailErrors?.email : undefined}
                                            />
                                            {isEditing ? (
                                                <div className={clsx(cls.fieldActions)}>
                                                    <Button padding={true} variant={ButtonVariants.BLUE} onClick={onSaveHandler}>Save</Button>
                                                    <Button padding={true} variant={ButtonVariants.LIGHT_GREY} onClick={onCancelhandler}>Cancel</Button>
                                                </div>
                                            ) : (
                                                <div className={clsx(cls.fieldEdit)}>
                                                    <Button variant={ButtonVariants.ICON} onClick={() => onEdithandler(field.name)}>
                                                        <CiEdit size={24} />
                                                    </Button>
                                                </div>
                                            )
                                            }
                                        </div>
                                    )
                                })}
                            </div>
                            <Button padding={true} variant={ButtonVariants.BLUE} onClick={() => setPasswordFormOpen(true)} className={clsx(cls.change)}>
                                Change Password
                            </Button>
                        </form>
                        <div className={clsx(cls.actions)}>
                            <Button
                                padding={true}
                                variant={ButtonVariants.LIGHT_GREY}
                                className={clsx(cls.logout)}
                                onClick={handleLogoutClick}
                            >
                                Log Out
                            </Button>

                            <Button
                                padding={true}
                                variant={ButtonVariants.RED}
                                className={clsx(cls.delete)}
                                onClick={handleDeleteAccountClick}
                            >
                                Delete Account
                            </Button>
                        </div>
                    </div>
                </div>
            </div >

            {isPasswordFormOpen && (
                <ChangePasswordModal onClose={() => setPasswordFormOpen(false)} user={draftUser} />
            )}
        </>
    )
}

