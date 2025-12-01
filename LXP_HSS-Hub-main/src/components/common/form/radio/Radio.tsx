import React, { ChangeEvent } from 'react';
import '../Form.css';

interface RadioProps {
  name: string;
  id: string;
  label: string;
  checked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  [property: string]: any;
}

function Radio({ name, id, label, checked, onChange, ...rest }: RadioProps) {
  return (
    <label className="radio" htmlFor={id}>
      <input
        id={id}
        name={name}
        type="radio"
        checked={checked}
        onChange={onChange}
        {...rest}
      />
      <span>{label}</span>
    </label>
  );
}

export default Radio;
