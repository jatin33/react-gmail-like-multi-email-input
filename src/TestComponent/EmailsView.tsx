import React from 'react';
import { BaseMultiEmailProps } from '../hooks/types';
import { isFalsy } from '../hooks/utils';
import Tag from './Tag';

type ValidEmailsViewProps = {
  validEmails: string[];
  focused: boolean;
  handleRemove: (
    emailId: string,
    emailIndexPosition: number,
    isDisabled?: boolean | undefined
  ) => void;
} & Pick<
  BaseMultiEmailProps,
  'getLabel' | 'isDisabled' | 'validEmailsToShowOnblurCount'
>;

function EmailsView({
  validEmails,
  isDisabled,
  getLabel,
  handleRemove,
}: ValidEmailsViewProps) {
  return validEmails && validEmails?.length > 0 ? (
    <>
      {validEmails?.map((validEmail, index) => {
        return !isFalsy(getLabel) ? (
          getLabel?.(validEmail, index, handleRemove, isDisabled)
        ) : (
          <Tag
            key={index}
            email={validEmail}
            emailIndexPosition={index}
            onRemove={handleRemove}
            showRemoveIcon={!isDisabled}
          />
        );
      })}
    </>
  ) : (
    <></>
  );
}

export default EmailsView;
