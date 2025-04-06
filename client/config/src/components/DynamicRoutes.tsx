import React, { useState } from 'react';

interface DynamicRoute {
  path: string;
  payload?: any;
}

interface DynamicRoutesProps {
  onAddRoute: (path: string) => void;
  onDeleteRoute: (path: string) => void;
  routes: DynamicRoute[];
  isSyncing?: boolean;
}

export const DynamicRoutes: React.FC<DynamicRoutesProps> = ({
  onAddRoute,
  onDeleteRoute,
  routes,
  isSyncing = false,
}) => {
  const [newRoutePath, setNewRoutePath] = useState('');

  const handleAddRoute = () => {
    if (!newRoutePath) return;

    const formattedPath = newRoutePath.startsWith('/')
      ? newRoutePath
      : `/${newRoutePath}`;

    if (!routes.some(route => route.path === formattedPath)) {
      onAddRoute(formattedPath);
      setNewRoutePath('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddRoute();
    }
  };

  const formatPayload = (payload: any): string => {
    try {
      return JSON.stringify(payload, null, 2);
    } catch {
      return String(payload);
    }
  };

  return (
    <fieldset>
      <legend>Dynamic API Routes</legend>
      <div className="config-section">
        <div className="dynamic-routes-container">
          <div className="route-input-container">
            <input
              type="text"
              id="newRoutePath"
              value={newRoutePath}
              onChange={(e) => setNewRoutePath(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Route path (e.g., /example)"
            />
            <button type="button" onClick={handleAddRoute}>
              Add Route
            </button>
            <span className="sync-status">
              {isSyncing ? '⏳' : '✅'}
            </span>
          </div>
          <div className="routes-list-container">
            {routes.length === 0 ? (
              <p style={{ color: '#666', fontStyle: 'italic' }}>
                No dynamic routes configured
              </p>
            ) : (
              <ul id="dynamicRoutesList">
                {routes.map((route) => (
                  <li key={route.path} className="route-item">
                    <span className="route-path" title="Route path">
                      {route.path}
                    </span>
                    {route.payload && (
                      <code className="route-payload" title="Route payload">
                        {formatPayload(route.payload)}
                      </code>
                    )}
                    <button
                      className="delete-route-btn"
                      onClick={() => onDeleteRoute(route.path)}
                      aria-label={`Delete route ${route.path}`}
                      title="Delete route"
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </fieldset>
  );
};