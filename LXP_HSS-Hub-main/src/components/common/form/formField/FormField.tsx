import React from 'react';
import '../Form.css';

interface FormFieldProps {
  label?: string;
  htmlFor?: string;
  required?: boolean;
  error?: boolean;
  size?: 'sm' | 'lg';
  children: React.ReactNode;
}

function FormField({
  label,
  htmlFor,
  required = false,
  error,
  size, // 'sm' | 'lg'
  children,
}: FormFieldProps) {
  const classes = ['field'];
  if (size === 'sm') classes.push('is-sm');
  if (size === 'lg') classes.push('is-lg');
  if (error) classes.push('is-invalid');

  return (
    <div className={classes.join(' ')}>
      {label && (
        <label className="label" htmlFor={htmlFor}>
          {label}
          {required && <span className="required">*</span>}
        </label>
      )}

      <div className="control">{children}</div>

      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default FormField;
