import React, { TextareaHTMLAttributes } from 'react';
import '../Form.css';

function Textarea({
  id,
  value,
  onChange,
  placeholder,
  rows = 4,
  ...rest
}: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      id={id}
      className="textarea"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      {...rest}
    />
  );
}

export default Textarea;
