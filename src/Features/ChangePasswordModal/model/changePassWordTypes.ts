export type PasswordForm = {
  password: string;
  confirm: string;
};

export type PasswordErrors = Partial<Record<keyof PasswordForm, string>>;
