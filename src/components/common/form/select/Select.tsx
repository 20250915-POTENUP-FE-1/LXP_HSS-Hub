import React, { SelectHTMLAttributes } from 'react';
import '../Form.css';

function Select({
  id,
  value,
  onChange,
  children,
  ...rest
}: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      id={id}
      className="select"
      value={value}
      onChange={onChange}
      {...rest}
    >
      {children}
    </select>
  );
}

export default Select;
