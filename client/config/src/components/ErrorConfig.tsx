import React, { useState } from 'react';

interface ErrorConfigProps {
  onErrorChanceChange: (value: number) => void;
  initialErrorChance?: number;
}

export const ErrorConfig: React.FC<ErrorConfigProps> = ({
  onErrorChanceChange,
  initialErrorChance = 0,
}) => {
  const [errorChance, setErrorChance] = useState(initialErrorChance);

  const handleErrorChanceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setErrorChance(value);
    onErrorChanceChange(value);
  };

  return (
    <fieldset>
      <legend>Error Config</legend>
      <div className="config-section">
        <div className="config-item">
          <label htmlFor="errorChance">Error Chance (%):</label>
          <div>
            <span id="errorChanceValue">{(errorChance * 100).toFixed(0)}%</span>
            <span id="errorChanceStatus"></span>
          </div>
        </div>
        <input
          className="range-input"
          type="range"
          id="errorChance"
          value={errorChance}
          onChange={handleErrorChanceChange}
          min="0"
          max="1"
          step="0.1"
        />
      </div>
    </fieldset>
  );
};