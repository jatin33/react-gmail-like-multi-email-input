import React from 'react';
import { render, fireEvent, screen, cleanup } from '@testing-library/react';
import TestComponent from './TestComponent';

describe('EmailInput', () => {
  afterEach(() => {
    cleanup();
  });

  test('adding valid email by enter key', () => {
    const onEmailChange = jest.fn();
    render(<TestComponent emails={[]} onEmailChange={onEmailChange} />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'test@example.com' } });
    fireEvent.keyUp(input, { key: 'Enter', code: 'Enter' });

    expect(onEmailChange).toHaveBeenCalledWith(['test@example.com']);
  });

  test('adding valid email by spacebar key', () => {
    const onEmailChange = jest.fn();
    render(<TestComponent emails={[]} onEmailChange={onEmailChange} />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'test@example.com' } });
    fireEvent.keyUp(input, { key: ' ', code: 'SpaceBar' });

    expect(onEmailChange).toHaveBeenCalledWith(['test@example.com']);
  });

  test('adding valid email by going out of focus', () => {
    const onEmailChange = jest.fn();
    render(<TestComponent emails={[]} onEmailChange={onEmailChange} />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'test99@example.com' } });
    fireEvent.blur(input);

    expect(onEmailChange).toHaveBeenCalledWith(['test99@example.com']);
  });

  test('removing email', () => {
    const onEmailChange = jest.fn();
    render(
      <TestComponent
        emails={['test45@example.com']}
        onEmailChange={onEmailChange}
      />
    );

    const input = screen.getByRole('textbox');
    fireEvent.keyDown(input, { key: 'Backspace', code: 'Backspace' });

    expect(onEmailChange).toHaveBeenCalledWith([]);
  });

  test('readonly mode', () => {
    const onEmailChange = jest.fn();
    render(
      <TestComponent
        emails={['test45@example.com']}
        onEmailChange={onEmailChange}
        isDisabled
      />
    );

    // queryBy used because:  refer: https://stackoverflow.com/questions/52783144/how-do-you-test-for-the-non-existence-of-an-element-using-jest-and-react-testing
    const input = screen.queryByTestId('email-input');
    expect(input).toBeNull();
  });

  test('handling paste event', () => {
    const onEmailChange = jest.fn();
    const { getByRole } = render(
      <TestComponent emails={[]} onEmailChange={onEmailChange} />
    );

    const input = getByRole('textbox');
    fireEvent.paste(input, {
      clipboardData: { getData: () => 'test67@example.com' },
    });

    expect(onEmailChange).toHaveBeenCalledWith(['test67@example.com']);
  });

  test('paste multiple emails at once', () => {
    const onEmailChange = jest.fn();
    const { getByRole } = render(
      <TestComponent
        delimiters={[';', ',']}
        emails={[]}
        onEmailChange={onEmailChange}
      />
    );

    const input = getByRole('textbox');
    fireEvent.paste(input, {
      clipboardData: {
        getData: () => 'test67@example.com;jna@mail.com,ja@mail.com',
      },
    });

    expect(onEmailChange).toHaveBeenCalledWith(['test67@example.com']);
    expect(onEmailChange).toHaveBeenCalledWith([
      'test67@example.com',
      'jna@mail.com',
    ]);
    expect(onEmailChange).toHaveBeenCalledWith([
      'test67@example.com',
      'jna@mail.com',
      'ja@mail.com',
    ]);
  });

  test('valid email address formats', () => {
    const onEmailChange = jest.fn();
    render(<TestComponent emails={[]} onEmailChange={onEmailChange} />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'Test@Example.Com' } });
    fireEvent.keyUp(input, { key: 'Enter', code: 'Enter' });

    expect(onEmailChange).toHaveBeenCalledWith(['Test@Example.Com']);
  });
});
