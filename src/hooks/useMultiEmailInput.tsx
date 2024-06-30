import React, { useEffect, useState } from "react";
import { createSplitRegExp, isFalsy, uniq } from "./utils";
import { BaseMultiEmailProps } from "./types";

function useEmailInput({
  emails = [],
  delimiters = [],
  duplicateAllowed,
  validEmailsToShowOnblurCount = 3,
  isDisabled,
  onEmailChange,
  onInputChange,
}: BaseMultiEmailProps) {
  const [inputValue, setInputValue] = useState("");
  const [emailsState, setEmailsState] = useState<string[]>([]);
  const [focused, setFocused] = useState(false);

  const handleRemove = (emailId: string, emailIndexPosition: number, _isDisabled?: boolean) => {
    if (isDisabled) {
      return;
    }
    const filteredEmails = [...emailsState.slice(0, emailIndexPosition), ...emailsState.slice(emailIndexPosition + 1)];
    setEmailsState(filteredEmails);
    onEmailChange?.(filteredEmails);
  };

  const addEmail = (email?: string) => {
    const formattedEmail = email?.trim() ?? "";
    if (!isFalsy(formattedEmail)) {
      setEmailsState((s) => {
        if (duplicateAllowed) {
          onEmailChange?.([...s, formattedEmail]);
          return [...s, formattedEmail];
        }
        onEmailChange?.(uniq([...s, formattedEmail]));
        return uniq([...s, formattedEmail]);
      });
      setInputValue("");
    }
  };

  const handleOnKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if ([" ", "Enter"].includes(event.key)) {
      event.preventDefault();
    } else if (event.key === "Backspace") {
      if (inputValue === "" && !isDisabled) {
        handleRemove(inputValue, emailsState.length - 1);
      }
    } else if (delimiters.includes(event.key)) {
      event.preventDefault();
    }
  };

  // when enter, tab, space and delimiters (,) are fired after that add email
  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if ([" ", "Enter"].includes(event.key)) {
      addEmail(inputValue);
    } else if (delimiters.includes(event.key)) {
      addEmail(inputValue);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const currentEventValue = event.currentTarget.value;
    setInputValue(currentEventValue);
    onInputChange?.(event);
  };

  const handleOnBlur = (event: React.FocusEvent<HTMLInputElement, Element>) => {
    setFocused(false);
    addEmail(event.target.value);
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    let pastedItem = (event.clipboardData || (window as any)?.clipboardData)?.getData("text") ?? "";
    const splitRegExp: RegExp = createSplitRegExp(delimiters);
    pastedItem
      .split(splitRegExp)
      .filter((item) => item !== "")
      .forEach((item) => {
        addEmail(item);
      });

    let id = setTimeout(() => {
      setInputValue("");
      clearTimeout(id);
    }, 50);
  };

  const handleFocus = (event: React.FocusEvent<HTMLInputElement, Element>) => {
    setFocused(true);
  };

  useEffect(() => {
    if (emails.length > 0) {
      setEmailsState(emails?.map((item) => item.trim()));
    }
  }, [emails]);

  const validEmailsToShow = !focused ? emailsState.slice(0, validEmailsToShowOnblurCount) : emailsState;

  return {
    handleChange,
    handleKeyUp,
    handleOnKeyDown,
    addEmail,
    handleRemove,
    handleOnBlur,
    handlePaste,
    handleFocus,
    validEmailsToShow,
    focused,
    emailsState,
    inputValue,
  };
}

export default useEmailInput;
