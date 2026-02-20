export type PasswordForm = {
  password: string;
  confirm: string;
};

export type EmailForm = {
  email: string;
};

export type PasswordErrors = Partial<Record<keyof PasswordForm, string>>;
export type EmailErrors = Partial<Record<keyof EmailForm, string>>;
