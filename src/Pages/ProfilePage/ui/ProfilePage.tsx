import { Avatar } from "components/Avatar/Avatar";
import { Button, ButtonVariants } from "components/Button/Button";
import { Input } from "components/Input/Input";
import { useRef, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { ensureAvatarColor } from "helpers/ensureAvatarColor";
import z from "zod";
import { useClickOutside } from "hooks/useClickOutside";
import { EmailErrors } from "../model/ProfileTypes";
import { emailSchema } from "../model/validationSchemas";
import { useUserStore } from "entities/User/UserStore";
import { User, userFields } from "entities/User/UserTypes";
import { PasswordModal } from "./PasswordModal";
import { deleteUserFromLocalStorage, updateUser } from "storage/userStorage";
import { removeCurrentUser } from "storage/currentUserStore";
import { Title, TitleVariants } from "components/Title/Title";
import { useCartStore } from "entities/Cart/CartStore";
import { useFavoritesStore } from "entities/Favorites/FavoritesStore";
import cls from './ProfilePage.module.scss';
import clsx from "clsx";
import { OrderList } from "components/Orders/OrderList";

export const ProfilePage = () => {
    const user = useUserStore((state) => state.user)!;
    const userDispatch = useUserStore((state) => state.dispatch);
    const cartDispatch = useCartStore((state) => state.dispatch);
    const favoriteDispatch = useFavoritesStore((state) => state.dispatch);

    const [draftUser, setDraftUser] = useState<User>(user);
    const [editableField, setEditableField] = useState<keyof User | null>(null);

    const [isPasswordFormOpen, setPasswordFormOpen] = useState<boolean>(false);

    const [emailErrors, setEmailErrors] = useState<EmailErrors>({});

    const fileInputRef = useRef<HTMLInputElement>(null)
    const modalRef = useRef<HTMLDivElement | null>(null);

    useClickOutside(modalRef, () => {
        setPasswordFormOpen(false);
    })

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
                <OrderList />
                <div className={clsx(cls.personInfo)}>
                    <Title variant={TitleVariants.H1}>Личный кабинет</Title>
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
                                                <Button padding={true} variant={ButtonVariants.BLUE} onClick={onSaveHandler}>Сохранить</Button>
                                                <Button padding={true} variant={ButtonVariants.LIGHT_GREY} onClick={onCancelhandler}>Отменить</Button>
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
                            Сменить пароль
                        </Button>
                    </form>
                    <div className={clsx(cls.actions)}>
                        <Button
                            padding={true}
                            variant={ButtonVariants.LIGHT_GREY}
                            className={clsx(cls.logout)}
                            onClick={handleLogoutClick}
                        >
                            Выйти из аккаунта
                        </Button>

                        <Button
                            padding={true}
                            variant={ButtonVariants.RED}
                            className={clsx(cls.delete)}
                            onClick={handleDeleteAccountClick}
                        >
                            Удалить профиль
                        </Button>
                    </div>
                </div>
            </div >

            <PasswordModal isOpen={isPasswordFormOpen} onClose={() => setPasswordFormOpen(false)} user={draftUser} />
        </>
    )
}

