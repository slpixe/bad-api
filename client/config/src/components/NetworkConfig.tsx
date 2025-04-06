import React, { useState } from 'react';

interface NetworkConfigProps {
  onNetworkDelayChanceChange: (value: number) => void;
  onNetworkDelayChange: (value: number) => void;
  initialDelayChance?: number;
  initialDelay?: number;
}

export const NetworkConfig: React.FC<NetworkConfigProps> = ({
  onNetworkDelayChanceChange,
  onNetworkDelayChange,
  initialDelayChance = 0,
  initialDelay = 0,
}) => {
  const [delayChance, setDelayChance] = useState(initialDelayChance);
  const [delay, setDelay] = useState(initialDelay);

  const handleDelayChanceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setDelayChance(value);
    onNetworkDelayChanceChange(value);
  };

  const handleDelayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    setDelay(value);
    onNetworkDelayChange(value);
  };

  return (
    <fieldset>
      <legend>Network Config</legend>
      <div className="config-section">
        <div className="config-item">
          <label htmlFor="networkDelayChance">Network Delay Chance (%):</label>
          <div>
            <span id="networkDelayChanceValue">{(delayChance * 100).toFixed(0)}%</span>
            <span id="networkDelayChanceStatus"></span>
          </div>
        </div>
        <input
          className="range-input"
          type="range"
          id="networkDelayChance"
          value={delayChance}
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
            <span id="networkDelayValue">{(delay / 1000).toFixed(1)} seconds</span>
            <span id="networkDelayStatus"></span>
          </div>
        </div>
        <input
          className="range-input"
          type="range"
          id="networkDelay"
          value={delay}
          onChange={handleDelayChange}
          min="0"
          max="45000"
        />
      </div>
    </fieldset>
  );
};