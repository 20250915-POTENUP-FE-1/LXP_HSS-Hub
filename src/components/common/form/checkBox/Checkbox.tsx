import React from 'react';
import '../Form.css';

interface CheckboxProps {
  id?: string;
  label?: string;
  checked: boolean;
  onChange: () => void;
  [property: string]: any;
}

function Checkbox({ id, label, checked, onChange, ...rest }: CheckboxProps) {
  return (
    <label className="checkbox" htmlFor={id}>
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        {...rest}
      />
      <span>{label}</span>
    </label>
  );
}

export default Checkbox;
