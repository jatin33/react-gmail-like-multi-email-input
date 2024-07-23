import React, { useState } from "react";
import { isEmail } from "../hooks/utils";
import "./Tag.css";

type Props = {
  email: string;
  emailIndexPosition: number;
  isDisabled?: boolean;
  showRemoveIcon?: boolean;
  onRemove: (emailId: string, emailIndexPosition: number, isDisabled?: boolean) => void;
};

function Tag({ email, emailIndexPosition, isDisabled, showRemoveIcon = true, onRemove }: Props) {
  const isValidEmail = isEmail(email);

  const getStyles = () => {
    const baseClass = "Tag-Base";
    if (isValidEmail || emailIndexPosition === -1) {
      return `${baseClass} Valid`;
    } else {
      return `${baseClass} InValid`;
    }
  };

  return (
    <div className={getStyles()}>
      <span>{email}</span>
      {showRemoveIcon ? (
        <button
          onClick={() => {
            onRemove(email, emailIndexPosition, isDisabled);
          }}
          className="gb-w-3 gb-h-3"
        >
          <span>x</span>
        </button>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Tag;
