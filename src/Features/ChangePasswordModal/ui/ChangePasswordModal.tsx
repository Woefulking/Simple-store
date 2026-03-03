import { Modal } from "Shared/ui/Modal/Modal";
import clsx from "clsx";
import cls from './ChangePasswordModal.module.scss';
import { useRef, useState } from "react";
import { useClickOutside } from "Shared/hooks/useClickOutside";
import { Input } from "Shared/ui/Input/Input";
import { Button, ButtonVariants } from "Shared/ui/Button/Button";
import z from "zod";
import { updateUser } from "app/storage/userStorage";
import { User, useUserStore } from "entities/User";
import { PasswordErrors, PasswordForm, passwordSchema } from "..";

interface PasswordModalProps {
    isOpen: boolean;
    onClose: () => void;
    user: User;

}
export const ChangePasswordModal = (props: PasswordModalProps) => {
    const { isOpen, onClose, user } = props;
    const dispatch = useUserStore((state) => state.dispatch)!;

    const [form, setForm] = useState<PasswordForm>({
        password: '',
        confirm: '',
    });

    const [errors, setErrors] = useState<PasswordErrors>({});

    const modalRef = useRef<HTMLDivElement | null>(null);

    useClickOutside(modalRef, () => {
        onClose();
        setForm({ password: '', confirm: '' });
    });

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
        setForm({} as PasswordForm);
        onClose();
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className={clsx(cls.modal)} ref={modalRef}>
                <h2 className={clsx(cls.title, cls.modalTitle)}>Смена пароля</h2>
                <form className={clsx(cls.form)} name="changePasswordForm">
                    <Input
                        className={clsx(cls.input)}
                        type='password'
                        label='Пароль'
                        name='password'
                        value={form.password}
                        onChange={(value: string) => onChangeHandler('password', value)}
                        error={errors.password}
                    />
                    <Input
                        className={clsx(cls.input)}
                        type='password'
                        label='Подтверждение пароля'
                        name='confirmpassword'
                        value={form.confirm}
                        onChange={(value: string) => onChangeHandler('confirm', value)}
                        error={errors.confirm}
                    />
                </form>
                <Button variant={ButtonVariants.BLUE} onClick={onSavePasswordHandler}>
                    Сохранить
                </Button>
            </div>
        </Modal>
    )
}