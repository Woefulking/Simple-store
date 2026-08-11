import { Button, ButtonVariants } from "shared/ui/Button/Button";
import { Input } from "shared/ui/Input/Input"
import { useState } from "react"
import z from "zod";
import { useLocation, useNavigate } from "react-router";
import { loginSchema, registerSchema } from "../model/AuthSchemas";
import { checkUserExist, createUser, getUser } from "app/storage/userStorage";
import { setCurrentUser } from "app/storage/currentUserStore";
import { getFromStorage, saveToStorage } from "app/storage/storage";
import { Title, TitleVariants } from "shared/ui/Title/Title";
import { mergeGuestWithUser } from "features/lib/mergeGuestWithUser";
import { useUserStore, type User } from "entities/User";
import type { Guest } from "entities/Guest";

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
            setFormError('User with this login already exists');
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
            setFormError('Invalid login or password');
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
        <div className="h-full flex items-center justify-center bg-main p-4 sm:p-6 text-primary">
            <form className="w-full max-w-90 bg-secondary rounded-2xl transition-shadow duration-200 hover:shadow-soft-hover px-5 py-6 sm:px-7 sm:py-8 flex flex-col">
                <Title variant={TitleVariants.H1} className="text-center">
                    {isRegistration ? 'Registration' : 'Log In'}
                </Title>
                <div className="flex flex-col gap-4 mb-6">
                    <Input
                        label="Login"
                        name="login"
                        placeholder="Enter your login"
                        value={form.login}
                        type="text"
                        onChange={(value: string) => onChangeHandler('login', value)}
                        error={fieldsErrors.login}
                    />
                    <Input
                        label="Password"
                        name="password"
                        placeholder="Enter your password"
                        value={form.password}
                        type="password"
                        onChange={(value: string) => onChangeHandler('password', value)}
                        error={fieldsErrors.password}
                    />
                    {isRegistration && (
                        <>
                            <Input
                                label="Confirm password"
                                name="confirm"
                                placeholder="Confirm your password"
                                value={form.confirm}
                                type="password"
                                onChange={(value: string) => onChangeHandler('confirm', value)}
                                error={fieldsErrors.confirm}
                            />
                            <Input
                                label="Email"
                                name="email"
                                placeholder="Enter your email"
                                value={form.email}
                                type="text"
                                onChange={(value: string) => onChangeHandler('email', value)}
                                error={fieldsErrors.email}
                            />
                        </>
                    )}
                </div>
                {formError && (
                    <div className="text-center text-danger text-xs mb-6 font-medium animate-pulse">
                        {formError}
                    </div>
                )}
                <div className="flex flex-col gap-3">
                    <Button
                        padding={true}
                        variant={ButtonVariants.BLUE}
                        className="w-full"
                        onClick={onSubmitHandler}
                    >
                        {!isRegistration ? 'Sign In' : 'Sign Up'}
                    </Button>
                    <Button
                        padding={true}
                        variant={ButtonVariants.LIGHT_GREY}
                        className="w-full"
                        onClick={() => {
                            setIsRegistration(!isRegistration);
                            clearFields();
                        }}
                    >
                        {!isRegistration ? 'Create account' : 'Log In'}
                    </Button>
                </div>
            </form>
        </div>
    )
}

