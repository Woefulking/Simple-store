import { Button, ButtonVariants } from "Shared/ui/Button/Button";
import { Input } from "Shared/ui/Input/Input"
import { useState } from "react"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocation, useNavigate } from "react-router";
import { loginSchema, registerSchema, type LoginForm, type RegisterForm } from "../model/AuthSchemas";
import { checkUserExist, createUser, getUser } from "App/storage/userStorage";
import { setCurrentUser } from "App/storage/currentUserStore";
import { getFromStorage, saveToStorage } from "App/storage/storage";
import { Title, TitleVariants } from "Shared/ui/Title/Title";
import { mergeGuestWithUser } from "Features/lib/mergeGuestWithUser";
import { useUserStore, type User } from "Entities/User";
import type { Guest } from "Entities/Guest";

export const AuthPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from || '/';

    const [formError, setFormError] = useState<string | null>();

    const userDispatch = useUserStore((state) => state.dispatch);

    const [isRegistration, setIsRegistration] = useState(false);

    const loginForm = useForm<LoginForm>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            login: '',
            password: '',
        },
    });

    const registerForm = useForm<RegisterForm>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            login: '',
            password: '',
            confirm: '',
            email: '',
        },
    });

    const { errors: loginErrors } = loginForm.formState;
    const { errors: registerErrors } = registerForm.formState;

    const guest = getFromStorage<Guest>('guest');

    const clearFields = () => {
        loginForm.reset();
        registerForm.reset();
        setFormError(null);
    }

    const register = (form: RegisterForm): boolean => {
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

    const login = (form: LoginForm): boolean => {
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

    const onAuthSuccess = () => {
        navigate(from, { replace: true });

        loginForm.reset();
        registerForm.reset();

        setFormError(null);

        saveToStorage('guest', { cart: [], favorites: [] });
    };

    const onLoginSubmit = (data: LoginForm) => {
        const success = login(data);

        if (success) {
            onAuthSuccess();
        }
    };

    const onRegisterSubmit = (data: RegisterForm) => {
        const success = register(data);

        if (success) {
            onAuthSuccess();
        }
    };

    return (
        <div className="h-full flex items-center justify-center bg-main p-4 sm:p-6 text-primary">
            <form onSubmit={isRegistration ? registerForm.handleSubmit(onRegisterSubmit,  (errors) => console.log('REGISTER INVALID:', errors)) : loginForm.handleSubmit(onLoginSubmit)} className="w-full max-w-90 bg-secondary rounded-2xl transition-shadow duration-200 hover:shadow-soft-hover px-5 py-6 sm:px-7 sm:py-8 flex flex-col">
                <Title variant={TitleVariants.H1} className="text-center">
                    {isRegistration ? 'Registration' : 'Log In'}
                </Title>
                <div className="flex flex-col gap-4 mb-6">
                    <Input
                        label="Login"
                        placeholder="Enter your login"
                        type="text"
                        {...(isRegistration
                            ? registerForm.register('login')
                            : loginForm.register('login'))}
                        error={
                            isRegistration
                                ? registerErrors.login?.message
                                : loginErrors.login?.message
                            }
                    />
                    <Input
                        label="Password"
                        placeholder="Enter your password"
                        type="password"
                        {...(isRegistration
                            ? registerForm.register('password')
                            : loginForm.register('password'))}
                        error={
                            isRegistration
                                ? registerForm.formState.errors.password?.message
                                : loginForm.formState.errors.password?.message
                        }
                    />
                    {isRegistration && (
                        <>
                            <Input
                                label="Confirm password"
                                placeholder="Confirm your password"
                                type="password"
                                {...registerForm.register('confirm')}
                                error={registerErrors.confirm?.message}
                            />
                            <Input
                                label="Email"
                                placeholder="Enter your email"
                                type="text"
                                {...registerForm.register('email')}
                                error={registerErrors.email?.message}
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
                        type="submit"
                        padding={true}
                        variant={ButtonVariants.BLUE}
                        className="w-full"
                    >
                        {!isRegistration ? 'Sign In' : 'Sign Up'}
                    </Button>
                    <Button
                        type="button"
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

