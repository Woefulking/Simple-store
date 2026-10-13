import { Modal } from "Shared/ui/Modal/Modal";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "Shared/ui/Input/Input";
import { Button, ButtonVariants } from "Shared/ui/Button/Button";
import { updateUser } from "App/storage/userStorage";
import { type User, useUserStore } from "Entities/User";
import { Title, TitleVariants } from "Shared/ui/Title/Title";
import { passwordSchema, type PasswordForm } from "..";

interface PasswordModalProps {
    onClose: () => void;
    user: User;
}

export const ChangePasswordModal = (props: PasswordModalProps) => {
    const { onClose, user } = props;

    const dispatch = useUserStore((state) => state.dispatch);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<PasswordForm>({
        resolver: zodResolver(passwordSchema),
        defaultValues: {
            password: "",
            confirm: "",
        },
    });

    const onSavePasswordHandler = (data: PasswordForm) => {
        const nextUser = {
            ...user,
            password: data.password,
        };

        updateUser(nextUser);

        dispatch({
            type: "update",
            payload: nextUser,
        });

        reset();
        onClose();
    };

    return (
        <Modal onClose={onClose} className="max-w-80!">
            <div className="flex flex-col gap-6 w-full text-primary">
                <Title
                    variant={TitleVariants.H2}
                    className="text-center"
                >
                    Password Change
                </Title>

                <form
                    className="flex flex-col gap-4 flex-1"
                    name="changePasswordForm"
                    onSubmit={handleSubmit(onSavePasswordHandler)}
                >
                    <Input
                        type="password"
                        label="Password"
                        placeholder="Enter new password"
                        {...register("password")}
                        error={errors.password?.message}
                    />

                    <Input
                        type="password"
                        label="Confirm password"
                        placeholder="Confirm new password"
                        {...register("confirm")}
                        error={errors.confirm?.message}
                    />

                    <Button
                        type="submit"
                        variant={ButtonVariants.BLUE}
                        padding={true}
                        className="w-full mt-2"
                    >
                        Save
                    </Button>
                </form>
            </div>
        </Modal>
    );
};