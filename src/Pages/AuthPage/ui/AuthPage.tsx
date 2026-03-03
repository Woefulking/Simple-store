import { Button, ButtonVariants } from "Shared/ui/Button/Button";
import { Input } from "Shared/ui/Input/Input"
import { useState } from "react"
import z from "zod";
import cls from './AuthPage.module.scss';
import clsx from "clsx";
import { useLocation, useNavigate } from "react-router";
import { loginSchema, registerSchema } from "../model/AuthSchemas";
import { checkUserExist, createUser, getUser } from "app/storage/userStorage";
import { setCurrentUser } from "app/storage/currentUserStore";
import { getFromStorage, saveToStorage } from "app/storage/storage";
import { Title, TitleVariants } from "Shared/ui/Title/Title";
import { User, useUserStore } from "entities/User";
import { Guest } from "entities/Guest";
import { mergeGuestWithUser } from "Features/lib/mergeGuestWithUser";

type AuthForm = {
    login: string;
    password: string;
    confirm: string;
    email: string;
};

type FormErrors = Partial<Record<keyof AuthForm, string>>;

export const AuthPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from || '/';

    const [form, setForm] = useState<AuthForm>({ login: '', password: '', confirm: '', email: '' });
    const [fieldsErrors, setFieldsErrors] = useState<FormErrors>({});
    const [formError, setFormError] = useState<string | null>();

    const userDispatch = useUserStore((state) => state.dispatch);

    const [isRegistration, setIsRegistration] = useState(false);

    const guest = getFromStorage<Guest>('guest');

    const clearFields = () => {
        setForm({ login: '', password: '', confirm: '', email: '' });
        setFieldsErrors({});
        setFormError(null);
    }

    const validate = () => {
        const schema = isRegistration ? registerSchema : loginSchema;
        const result = schema.safeParse(form);

        if (result.success) {
            setFieldsErrors({});
            return true;
        }

        const flattened = z.flattenError(result.error);

        const nextErrors: FormErrors = {};

        Object.entries(flattened.fieldErrors).forEach(([field, messages]) => {
            if (messages && messages.length > 0) {
                nextErrors[field as keyof AuthForm] = messages[0];
            }
        });

        setFieldsErrors(nextErrors);
        return false;
    }

    const register = (form: AuthForm): boolean => {
        const exists = checkUserExist(form.login);

        if (exists) {
            setFormError('Пользователь с таким логином уже существует');
            return false;
        }

        const newUser: User = {
            login: form.login,
            password: form.password,
            email: form.email,
            name: '',
            secondName: '',
            avatar: '',
            cart: guest?.cart ?? [],
            favorites: guest?.favorites ?? [],
            orders: [],
        };

        createUser(newUser);
        setCurrentUser(newUser.login);
        userDispatch({ type: 'create', payload: newUser });

        return true;
    };

    const login = (form: AuthForm): boolean => {
        let user = getUser(form.login, form.password);

        if (!user) {
            setFormError('Неверный логин или пароль');
            return false;
        }

        user = mergeGuestWithUser(user);

        setCurrentUser(user.login);
        userDispatch({ type: 'login', payload: user });

        return true;
    }

    const onChangeHandler = (field: keyof AuthForm, value: string) => {
        setForm(prevForm =>
            ({ ...prevForm, [field]: value })
        );
        setFieldsErrors(prevError =>
            ({ ...prevError, [field]: null })
        );
        setFormError(null);
    }

    const onSubmitHandler = () => {
        if (!validate()) return;

        const success = isRegistration
            ? register(form)
            : login(form);

        if (success) {
            navigate(from, { replace: true });
            clearFields();
            saveToStorage('guest', { cart: [], favorites: [] });
        }
    }

    return (
        <div className={clsx(cls.authPage)}>
            <form className={clsx(cls.form)}>
                <Title variant={TitleVariants.H1}>
                    {isRegistration ? 'Регистрация' : 'Вход'}
                </Title>
                <div className={clsx(cls.fields)}>
                    <Input
                        label="Логин"
                        name="login"
                        placeholder="Введите ваш логин"
                        value={form.login}
                        type="text"
                        onChange={(value: string) => onChangeHandler('login', value)}
                        error={fieldsErrors.login}
                    />
                    <Input
                        label="Пароль"
                        name="password"
                        placeholder="Введите ваш пароль"
                        value={form.password}
                        type="password"
                        onChange={(value: string) => onChangeHandler('password', value)}
                        error={fieldsErrors.password}
                    />
                    {isRegistration && (
                        <>
                            <Input
                                label="Подверждение парля"
                                name="confirm"
                                placeholder="Введите пароль повторно"
                                value={form.confirm}
                                type="password"
                                onChange={(value: string) => onChangeHandler('confirm', value)}
                                error={fieldsErrors.confirm}
                            />
                            <Input
                                label="Email"
                                name="email"
                                placeholder="Введите ваш email"
                                value={form.email}
                                type="text"
                                onChange={(value: string) => onChangeHandler('email', value)}
                                error={fieldsErrors.email}
                            />
                        </>
                    )}
                </div>
                {formError && (
                    <div className={clsx(cls.formError)}>
                        {formError}
                    </div>
                )}
                <div className={clsx(cls.formActions)}>
                    <Button
                        padding={true}
                        variant={ButtonVariants.BLUE}
                        onClick={onSubmitHandler}
                    >
                        {!isRegistration ? 'Войти' : 'Зарегистрироваться'}
                    </Button>
                    <Button
                        padding={true}
                        variant={ButtonVariants.LIGHT_GREY}
                        onClick={() => {
                            setIsRegistration(!isRegistration);
                            clearFields();
                        }}
                    >
                        {!isRegistration ? 'Создать аккаунт' : 'Авторизоваться'}
                    </Button>
                </div>
            </form>
        </div>
    )
}

