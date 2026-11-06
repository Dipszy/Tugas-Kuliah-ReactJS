import React, { useState } from 'react';

/**
 * Komponen Input Reusable dengan dukungan validasi, ikon, dan toggle password
 */
const InputGroup = ({
  id,
  name,
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  touched,
  icon,
  required = true,
  autoComplete = 'off',
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordField = type === 'password';
  const inputType = isPasswordField ? (showPassword ? 'text' : 'password') : type;
  
  const hasError = touched && Boolean(error);
  const isValid = touched && !error && value && value.trim ? value.trim().length > 0 : false;

  return (
    <div className="input-group-container">
      <div className="input-label-row">
        <label htmlFor={id} className="input-label">
          {label} {required && <span className="required-star">*</span>}
        </label>
      </div>

      <div className={`input-wrapper ${hasError ? 'input-error' : ''} ${isValid ? 'input-success' : ''}`}>
        {icon && <span className="input-icon-left">{icon}</span>}

        <input
          id={id}
          name={name}
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          autoComplete={autoComplete}
          className="form-input"
        />

        {isPasswordField && (
          <button
            type="button"
            className="password-toggle-btn"
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? 'Sembunyikan password' : 'Lihat password'}
            tabIndex="-1"
          >
            {showPassword ? (
              // Eye-off icon
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                <line x1="1" y1="1" x2="23" y2="23" />
              </svg>
            ) : (
              // Eye icon
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            )}
          </button>
        )}

        {/* Valid checkmark badge */}
        {!isPasswordField && isValid && (
          <span className="input-valid-indicator">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </span>
        )}
      </div>

      {/* Error Message */}
      {hasError && (
        <p className="input-error-msg">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <span>{error}</span>
        </p>
      )}
    </div>
  );
};

export default InputGroup;
