const isFalsy = <T>(value: T): boolean => {
  return (
    value === '' ||
    value === null ||
    value === undefined ||
    (Array.isArray(value) && value.length === 0) ||
    (typeof value === 'object' && Object.keys(value).length === 0)
  );
};

// Refer: https://regexr.com/2rhq7
const EMAIL_REGEX =
  /^[a-zA-Z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?$/;

const isEmail = (email: string): boolean => {
  const regex = new RegExp(EMAIL_REGEX);
  return regex.test(email);
};

// Function to escape special characters in a delimiter
function escapeRegExp(delimiter: string): string {
  return delimiter.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // Escape special characters
}

// Function to create a regular expression from an array of delimiters
function createSplitRegExp(delimiters: string[]): RegExp {
  // Escape each delimiter and join them with '|'
  const escapedDelimiters = delimiters.map(escapeRegExp).join('|');
  return new RegExp(escapedDelimiters, 'g'); // Create a global regular expression
}

function uniq<T>(array: T[]): T[] {
  const seen = new Set<T>();
  return array.filter((item) => {
    if (seen.has(item)) {
      return false;
    } else {
      seen.add(item);
      return true;
    }
  });
}

export { isEmail, createSplitRegExp, isFalsy, uniq };
