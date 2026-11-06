import React from 'react';
import { calculatePasswordStrength } from '../utils/validation';

/**
 * Komponen Indikator Kekuatan Password Realtime
 */
const PasswordStrengthBar = ({ password }) => {
  if (!password) return null;

  const { score, label, color, percent } = calculatePasswordStrength(password);

  return (
    <div className="password-strength-container">
      <div className="strength-header">
        <span className="strength-title">Kekuatan Password:</span>
        <span className="strength-badge" style={{ color: color, fontWeight: 600 }}>
          {label}
        </span>
      </div>

      <div className="strength-track">
        <div
          className="strength-fill"
          style={{
            width: percent,
            backgroundColor: color,
            transition: 'width 0.3s ease, background-color 0.3s ease',
          }}
        />
      </div>

      <p className="strength-hint">
        Gunakan minimal 8 karakter dengan perpaduan huruf besar, huruf kecil, dan angka.
      </p>
    </div>
  );
};

export default PasswordStrengthBar;
