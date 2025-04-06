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
  [key: string]: any;
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
    // Connect to WebSocket server
    console.log('Initializing WebSocket connection...');
    const newSocket = io({
      path: '/socket.io',
      transports: ['websocket'],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    newSocket.on('connect', () => {
      console.log('✅ Connected to WebSocket server');
    });

    newSocket.on('welcome', (data) => {
      console.log('📩 Received welcome:', data);
    });

    newSocket.on('configSync', (data: ConfigState) => {
      console.log('📩 Received config update:', data);
      setConfig(data);
    });

    newSocket.on('error', (error) => {
      console.error('❌ WebSocket error:', error);
    });

    newSocket.on('disconnect', () => {
      console.log('❌ Disconnected from WebSocket server');
    });

    newSocket.on('connect_error', (error) => {
      console.error('❌ Connection error:', error);
    });

    setSocket(newSocket);

    // Cleanup on unmount
    return () => {
      console.log('Closing WebSocket connection...');
      newSocket.close();
    };
  }, []);

  const updateConfig = (updates: Partial<ConfigState>) => {
    if (socket) {
      console.log('📤 Sending config update:', updates);
      socket.emit('configSync', updates);
    } else {
      console.warn('⚠️ Cannot send update: WebSocket not connected');
    }
  };

  const addDynamicRoute = (path: string) => {
    if (socket) {
      console.log('📤 Adding dynamic route:', path);
      socket.emit('addDynamicRoute', { path });
    } else {
      console.warn('⚠️ Cannot add route: WebSocket not connected');
    }
  };

  const removeDynamicRoute = (path: string) => {
    if (socket) {
      console.log('📤 Removing dynamic route:', path);
      socket.emit('removeDynamicRoute', path);
    } else {
      console.warn('⚠️ Cannot remove route: WebSocket not connected');
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
          onAddRoute={addDynamicRoute}
          onDeleteRoute={removeDynamicRoute}
          initialRoutes={config.dynamicRoutes}
        />
      </form>

      <div style={{ margin: '20px 0', color: '#666' }}>
        Connection Status: {socket?.connected ? '🟢 Connected' : '🔴 Disconnected'}
      </div>
    </div>
  );
};