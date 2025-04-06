import React from 'react';

interface ErrorConfigProps {
  onErrorChanceChange: (value: number) => void;
  errorChance: number;      // Changed from initialErrorChance
  isSyncing?: boolean;      // Added sync status
}

export const ErrorConfig: React.FC<ErrorConfigProps> = ({
  onErrorChanceChange,
  errorChance,
  isSyncing = false,
}) => {
  const handleErrorChanceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
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
            <span id="errorChanceStatus" className="sync-status">
              {isSyncing ? '⏳' : '✅'}
            </span>
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