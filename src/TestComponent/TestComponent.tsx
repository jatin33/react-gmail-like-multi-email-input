import React, { useRef } from 'react';
import useEmailInput from '../hooks/useMultiEmailInput';
import ValidEmailsView from './EmailsView';
import { MultiEmailInputProps } from '../hooks/types';
import { isFalsy } from '../hooks/utils';
import './TestComponent.css';

function TestComponent({
  emails = [],
  isDisabled,
  getLabel,
  onEmailChange,
  duplicateAllowed,
  delimiters = [',', ';'],
  adornment,
  validEmailsToShowOnblurCount = 3,
  error,
  helperText,
  ...inputBaseProps
}: MultiEmailInputProps) {
  const emailInputRef = useRef<HTMLInputElement>(null);

  const {
    inputValue,
    emailsState,
    focused,
    handleOnKeyDown,
    handleKeyUp,
    handleChange,
    handleRemove,
    handleOnBlur,
    handlePaste,
    handleFocus,
  } = useEmailInput({
    emails,
    delimiters,
    duplicateAllowed,
    isDisabled,
    onEmailChange,
  });

  return (
    <>
      <div
        className={`container ${emailsState.length > 0 ? 'items-start' : 'items-end'}`}
        onClick={() => emailInputRef.current?.focus()}
      >
        {!isFalsy(adornment?.start) ? adornment?.start : <p>To:</p>}

        <div className="inside-container">
          <ValidEmailsView
            validEmails={emailsState}
            isDisabled={isDisabled}
            getLabel={getLabel}
            handleRemove={handleRemove}
            focused={focused}
            validEmailsToShowOnblurCount={validEmailsToShowOnblurCount}
          />
          {isDisabled ? (
            <></>
          ) : (
            <input
              placeholder="Enter your emails here"
              autoFocus
              {...inputBaseProps}
              type="email"
              ref={emailInputRef}
              onKeyDown={handleOnKeyDown}
              onChange={handleChange}
              onKeyUp={handleKeyUp}
              onPaste={handlePaste}
              onBlur={(e) => {
                inputBaseProps?.onBlur?.(e);
                handleOnBlur(e);
              }}
              onFocus={(e) => {
                inputBaseProps?.onFocus?.(e);
                handleFocus();
              }}
              value={inputValue}
              className={`input-field ${inputBaseProps.className}`}
              data-testid="email-input"
            />
          )}
        </div>

        <div className="gb-justify-self-end">{adornment?.end}</div>
      </div>
      {error ? (
        <div className="gb-flex gb-items-center gb-gap-x-1 gb-pt-1">
          <p className="gb-italic gb-text-gbTokens-error-500">
            {helperText ?? 'Email id entered is invalid'}
          </p>
        </div>
      ) : null}
    </>
  );
}

export default TestComponent;
