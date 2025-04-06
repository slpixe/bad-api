import React, { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { NetworkConfig } from './components/NetworkConfig';
import { ErrorConfig } from './components/ErrorConfig';
import { DynamicRoutes } from './components/DynamicRoutes';
import './styles/config-page.css';

interface ConfigState {
  networkDelayChance: number;
  networkDelay: number;
  errorChance: number;
  dynamicRoutes: string[];
}

export const App: React.FC = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [config, setConfig] = useState<ConfigState>({
    networkDelayChance: 0,
    networkDelay: 0,
    errorChance: 0,
    dynamicRoutes: [],
  });

  useEffect(() => {
    const newSocket = io();
    setSocket(newSocket);

    newSocket.on('connect', () => {
      console.log('Connected to server');
      newSocket.emit('getConfig');
    });

    newSocket.on('config', (data: ConfigState) => {
      setConfig(data);
    });

    return () => {
      newSocket.close();
    };
  }, []);

  const updateConfig = (updates: Partial<ConfigState>) => {
    if (socket) {
      socket.emit('updateConfig', updates);
    }
  };

  return (
    <div>
      <h1>Config Page</h1>
      <form id="configForm" onSubmit={(e) => e.preventDefault()}>
        <NetworkConfig
          onNetworkDelayChanceChange={(value) =>
            updateConfig({ networkDelayChance: value })
          }
          onNetworkDelayChange={(value) =>
            updateConfig({ networkDelay: value })
          }
          initialDelayChance={config.networkDelayChance}
          initialDelay={config.networkDelay}
        />

        <ErrorConfig
          onErrorChanceChange={(value) =>
            updateConfig({ errorChance: value })
          }
          initialErrorChance={config.errorChance}
        />

        <DynamicRoutes
          onAddRoute={(path) =>
            updateConfig({
              dynamicRoutes: [...config.dynamicRoutes, path],
            })
          }
          onDeleteRoute={(path) =>
            updateConfig({
              dynamicRoutes: config.dynamicRoutes.filter(
                (route) => route !== path
              ),
            })
          }
          initialRoutes={config.dynamicRoutes}
        />
      </form>
    </div>
  );
};