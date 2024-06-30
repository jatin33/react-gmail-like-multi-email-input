import { InputHTMLAttributes } from "react";

// placeholder to be replaced later
export interface BaseMultiEmailProps {
  adornment?: Partial<{
    start: React.ReactNode;
    end: React.ReactNode;
  }>;
  emails?: string[];
  getLabel?: (
    emailId: string,
    emailIndexPosition: number,
    removeEmail: (emailId: string, emailIndexPosition: number, isDisabled?: boolean) => void,
    isDisabled?: boolean
  ) => React.ReactNode;
  onEmailChange?: (emails: string[]) => void;
  onInputChange?: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  isDisabled?: boolean;
  duplicateAllowed?: boolean;
  delimiters?: string[];
  validEmailsToShowOnblurCount?: number;
  error?: boolean;
  helperText?: string;
}

export interface MultiEmailInputProps extends InputHTMLAttributes<HTMLInputElement>, BaseMultiEmailProps {}
