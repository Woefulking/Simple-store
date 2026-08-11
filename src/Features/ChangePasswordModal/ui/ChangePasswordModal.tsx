import { Modal } from "src/Shared/ui/Modal/Modal";
import { useState } from "react";
import { Input } from "src/Shared/ui/Input/Input";
import { Button, ButtonVariants } from "src/Shared/ui/Button/Button";
import z from "zod";
import { updateUser } from "src/App/storage/userStorage";
import { type User, useUserStore } from "src/Entities/User";
import { type PasswordErrors, type PasswordForm, passwordSchema } from "..";
import { Title, TitleVariants } from "src/Shared/ui/Title/Title";

interface PasswordModalProps {
    onClose: () => void;
    user: User;

}
export const ChangePasswordModal = (props: PasswordModalProps) => {
    const { onClose, user } = props;
    const dispatch = useUserStore((state) => state.dispatch)!;

    const [form, setForm] = useState<PasswordForm>({
        password: '',
        confirm: '',
    });

    const [errors, setErrors] = useState<PasswordErrors>({});

    const validate = () => {
        const result = passwordSchema.safeParse(form);

        if (result.success) {
            setErrors({});
            return true;
        }

        const flattened = z.flattenError(result.error);
        const nextErrors: PasswordErrors = {};

        Object.entries(flattened.fieldErrors).forEach(([field, messages]) => {
            if (messages && messages.length > 0) {
                nextErrors[field as keyof PasswordForm] = messages[0];
            }
        });

        setErrors(nextErrors);
        return false;
    };

    const onChangeHandler = (field: keyof PasswordErrors, value: string) => {
        setForm((prev) => ({
            ...prev, [field]: value
        }));

        setErrors((prev) => ({
            ...prev, [field]: null
        }));
    }

    const onSavePasswordHandler = () => {
        if (!validate()) return;

        let nextUser = { ...user, password: form.password };

        updateUser(nextUser);
        dispatch({ type: 'update', payload: nextUser });
        setForm({ password: '', confirm: '' });
        setErrors({});
        onClose();
    }

    return (
        <Modal onClose={onClose} className="max-w-80!">
            <div className="flex flex-col gap-6 w-full text-primary">
                <Title variant={TitleVariants.H2} className="text-center">
                    Password Change
                </Title>
                <form className="flex flex-col gap-4 flex-1" name="changePasswordForm" onSubmit={(e) => e.preventDefault()}>
                    <Input
                        type='password'
                        label='Password'
                        name='password'
                        value={form.password}
                        onChange={(value: string) => onChangeHandler('password', value)}
                        error={errors.password}
                    />
                    <Input
                        type='password'
                        label='Confirm password'
                        name='confirmpassword'
                        value={form.confirm}
                        onChange={(value: string) => onChangeHandler('confirm', value)}
                        error={errors.confirm}
                    />
                    <Button variant={ButtonVariants.BLUE} padding={true} onClick={onSavePasswordHandler} className="w-full mt-2">
                        Save
                    </Button>
                </form>
            </div>
        </Modal>
    )
}