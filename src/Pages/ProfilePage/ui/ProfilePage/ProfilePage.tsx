import { Avatar } from "Entities/User/ui/Avatar/Avatar";
import { Button, ButtonVariants } from "Shared/ui/Button/Button";
import { Input } from "Shared/ui/Input/Input";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CiEdit } from "react-icons/ci";
import { deleteUserFromLocalStorage, updateUser} from "App/storage/userStorage";
import { removeCurrentUser } from "App/storage/currentUserStore";
import { Title, TitleVariants } from "Shared/ui/Title/Title";
import {
    ensureAvatarColor,
    type User,
    userFields,
    useUserStore,
} from "Entities/User";
import { useCartStore } from "Entities/Cart";
import { useFavoritesStore } from "Entities/Favorites";
import { emailSchema } from "Pages/ProfilePage";
import { ChangePasswordModal } from "Features/ChangePasswordModal";
import { OrderPreview } from "Entities/Order";
import { useNavigate } from "react-router";
import { DeleteAccountModal } from "Features/DeleteAccountModal";

type EmailForm = {
    email: string;
};

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
    const [editableField, setEditableField] =
        useState<keyof User | null>(null);

    const [isPasswordFormOpen, setPasswordFormOpen] =
        useState<boolean>(false);

    const [isDeleteAccountModalOpen, setDeleteAccountModalOpen] =
        useState<boolean>(false);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const emailForm = useForm<EmailForm>({
        resolver: zodResolver(emailSchema),
        defaultValues: {
            email: user.email,
        },
        mode: "onSubmit",
    });

    const { errors: emailErrors } = emailForm.formState;

    const onEditHandler = (field: keyof User) => {
        setEditableField(field);
        setDraftUser(user);

        if (field === "email") {
            emailForm.reset({
                email: user.email,
            });
        }
    };

    const onChangeHandler = (
        field: "name" | "secondName",
        value: string,
    ) => {
        setDraftUser((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const onCancelHandler = () => {
        setDraftUser(user);
        setEditableField(null);

        emailForm.reset({
            email: user.email,
        });
    };

    const saveUser = (userData: User) => {
        const nextUser = ensureAvatarColor(userData);

        updateUser(nextUser);
        userDispatch({
            type: "update",
            payload: nextUser,
        });

        setDraftUser(nextUser);
        setEditableField(null);
    };

    const onSaveHandler = () => {
        if (editableField === "email") {
            void emailForm.handleSubmit((data) => {
                saveUser({
                    ...draftUser,
                    email: data.email,
                });
            })();

            return;
        }
        saveUser(draftUser);
    };

    const handleAvatarClick = () => {
        fileInputRef.current?.click();
    };

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (!file) return;

        const reader = new FileReader();

        reader.onloadend = () => {
            const base64 = reader.result as string;

            userDispatch({
                type: "update",
                payload: {
                    avatar: base64,
                },
            });
        };

        reader.readAsDataURL(file);
    };

    const handleLogoutClick = () => {
        userDispatch({ type: "logout"});
        cartDispatch({type: "clear"});
        favoriteDispatch({type: "clear"});

        removeCurrentUser();
    };

    const handleDeleteAccount = () => {
        userDispatch({
            type: "delete",
            payload: {
                login: user.login,
            },
        });

        cartDispatch({
            type: "clear",
        });

        favoriteDispatch({
            type: "clear",
        });

        deleteUserFromLocalStorage(user.login);
        removeCurrentUser();

        setDeleteAccountModalOpen(false);
    };

    return (
        <>
            <div className="w-full h-full flex flex-col p-4 md:p-8 bg-secondary rounded-2xl shadow-soft text-primary">
                <Title variant={TitleVariants.H1}>
                    My Account
                </Title>

                <div className="h-full flex flex-col gap-8 lg:flex-row lg:gap-12">
                    <div className="w-full flex flex-col lg:w-[60%] lg:border-r lg:border-primary-border lg:pr-8">
                        <Title
                            variant={TitleVariants.H2}
                            className="text-secondary-text"
                        >
                            Order History
                        </Title>

                        {sortedOrders.length > 0 ? (
                            <div
                                className="flex flex-col gap-4 max-h-100 md:max-h-160 overflow-y-auto pr-2
                                [&::-webkit-scrollbar]:w-1.5
                                [&::-webkit-scrollbar-track]:bg-transparent
                                [&::-webkit-scrollbar-thumb]:bg-primary-border
                                [&::-webkit-scrollbar-thumb]:rounded-full
                                hover:[&::-webkit-scrollbar-thumb]:bg-muted"
                            >
                                {sortedOrders.map((order) => (
                                    <OrderPreview
                                        order={order}
                                        key={order.id}
                                        onClick={() =>
                                            navigate(`/orders/${order.id}`)
                                        }
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="flex-1 flex justify-center items-center text-xl md:text-2xl text-muted min-h-37.5">
                                No orders
                            </div>
                        )}
                    </div>

                    <div className="w-full flex flex-col lg:w-[40%]">
                        <Title
                            variant={TitleVariants.H2}
                            className="text-secondary-text"
                        >
                            Personal Details
                        </Title>

                        <form
                            className="flex flex-col gap-4 mb-8"
                            onSubmit={(e) => e.preventDefault()}
                        >
                            <div className="flex flex-row items-center gap-4 mb-2">
                                <div className="shrink-0">
                                    <Avatar
                                        onClick={handleAvatarClick}
                                        size="xl"
                                        editable={true}
                                    />

                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/*"
                                        hidden
                                        onChange={handleAvatarChange}
                                    />
                                </div>

                                <span className="text-lg md:text-xl font-semibold text-primary">
                                    {`${user.name} ${user.secondName}`}
                                </span>
                            </div>

                            <div className="flex flex-col gap-3 mb-2">
                                {userFields.map((field) => {
                                    const isEditing =
                                        editableField === field.name;

                                    const isEmail =
                                        field.name === "email";

                                    return (
                                        <div
                                            className="relative flex flex-row items-end gap-4 w-full pr-12"
                                            key={field.name}
                                        >
                                            {isEmail ? (
                                                <Input
                                                    className="flex-1"
                                                    type="text"
                                                    label={field.label}
                                                    {...emailForm.register("email")}
                                                    disabled={!isEditing}
                                                    error={emailErrors.email?.message}
                                                />
                                            ) : (
                                                <Input
                                                    className="flex-1"
                                                    type="text"
                                                    label={field.label}
                                                    name={field.name}
                                                    value={
                                                        isEditing
                                                            ? draftUser[field.name] ?? ""
                                                            : user[field.name] ?? ""
                                                    }
                                                    disabled={!isEditing}
                                                    onChange={(event) =>
                                                        onChangeHandler(
                                                            field.name,
                                                            event.target.value,
                                                        )
                                                    }
                                                />
                                            )}

                                            {isEditing ? (
                                                <div className="flex gap-1.5">
                                                    <Button
                                                        type="button"
                                                        padding={true}
                                                        variant={ButtonVariants.BLUE}
                                                        onClick={onSaveHandler}
                                                    >
                                                        Save
                                                    </Button>

                                                    <Button
                                                        type="button"
                                                        padding={true}
                                                        variant={ButtonVariants.LIGHT_GREY}
                                                        onClick={onCancelHandler}
                                                    >
                                                        Cancel
                                                    </Button>
                                                </div>
                                            ) : (
                                                <div className="absolute right-2 bottom-2 z-10">
                                                    <Button
                                                        type="button"
                                                        variant={ButtonVariants.ICON}
                                                        onClick={() =>
                                                            onEditHandler(field.name)
                                                        }
                                                    >
                                                        <CiEdit size={24} />
                                                    </Button>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>

                            <Button
                                type="button"
                                padding={true}
                                variant={ButtonVariants.BLUE}
                                onClick={() => setPasswordFormOpen(true)}
                                className="self-start w-full sm:w-auto"
                            >
                                Change Password
                            </Button>
                        </form>

                        <div className="flex flex-col gap-3 mt-auto pt-4 border-t border-primary-border/40 sm:flex-row sm:justify-end sm:gap-4 sm:border-none sm:pt-0">
                            <Button
                                type="button"
                                padding={true}
                                variant={ButtonVariants.LIGHT_GREY}
                                className="w-full sm:w-auto"
                                onClick={handleLogoutClick}
                            >
                                Log Out
                            </Button>

                            <Button
                                type="button"
                                padding={true}
                                variant={ButtonVariants.RED}
                                className="w-full sm:w-auto"
                                onClick={() =>
                                    setDeleteAccountModalOpen(true)
                                }
                            >
                                Delete Account
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {isPasswordFormOpen && (
                <ChangePasswordModal
                    onClose={() => setPasswordFormOpen(false)}
                    user={draftUser}
                />
            )}

            {isDeleteAccountModalOpen && (
                <DeleteAccountModal
                    onClose={() => setDeleteAccountModalOpen(false)}
                    onDelete={handleDeleteAccount}
                />
            )}
        </>
    );
};