export type EmailForm = {
  email: string;
};

export type EmailErrors = Partial<Record<keyof EmailForm, string>>;
