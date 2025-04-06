import React from 'react';

interface NetworkConfigProps {
  onNetworkDelayChanceChange: (value: number) => void;
  onNetworkDelayChange: (value: number) => void;
  networkDelayChance: number;  // Changed from initialDelayChance
  networkDelay: number;        // Changed from initialDelay
  isSyncing?: boolean;        // Added sync status
}

export const NetworkConfig: React.FC<NetworkConfigProps> = ({
  onNetworkDelayChanceChange,
  onNetworkDelayChange,
  networkDelayChance,
  networkDelay,
  isSyncing = false,
}) => {
  const handleDelayChanceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    onNetworkDelayChanceChange(value);
  };

  const handleDelayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    onNetworkDelayChange(value);
  };

  return (
    <fieldset>
      <legend>Network Config</legend>
      <div className="config-section">
        <div className="config-item">
          <label htmlFor="networkDelayChance">Network Delay Chance (%):</label>
          <div>
            <span id="networkDelayChanceValue">{(networkDelayChance * 100).toFixed(0)}%</span>
            <span id="networkDelayChanceStatus" className="sync-status">
              {isSyncing ? '⏳' : '✅'}
            </span>
          </div>
        </div>
        <input
          className="range-input"
          type="range"
          id="networkDelayChance"
          value={networkDelayChance}
          onChange={handleDelayChanceChange}
          min="0"
          max="1"
          step="0.1"
        />
      </div>
      <div className="config-section">
        <div className="config-item">
          <label htmlFor="networkDelay">Network Delay (seconds):</label>
          <div>
            <span id="networkDelayValue">{(networkDelay / 1000).toFixed(1)} seconds</span>
            <span id="networkDelayStatus" className="sync-status">
              {isSyncing ? '⏳' : '✅'}
            </span>
          </div>
        </div>
        <input
          className="range-input"
          type="range"
          id="networkDelay"
          value={networkDelay}
          onChange={handleDelayChange}
          min="0"
          max="45000"
        />
      </div>
    </fieldset>
  );
};