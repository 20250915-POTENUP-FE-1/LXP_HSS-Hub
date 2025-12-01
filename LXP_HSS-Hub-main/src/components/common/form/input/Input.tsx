import React, { ChangeEvent, InputHTMLAttributes } from 'react';
import '../Form.css';

function Input({
  id,
  value,
  onChange,
  placeholder,
  type = 'text',
  ...rest
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      id={id}
      className="input"
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      {...rest}
    />
  );
}

export default Input;
