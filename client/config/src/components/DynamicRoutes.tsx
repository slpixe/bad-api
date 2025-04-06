import React, { useState } from 'react';

interface DynamicRoutesProps {
  onAddRoute: (path: string) => void;
  onDeleteRoute: (path: string) => void;
  initialRoutes?: string[];
}

interface RouteItemProps {
  path: string;
  onDelete: (path: string) => void;
}

const RouteItem: React.FC<RouteItemProps> = ({ path, onDelete }) => (
  <li className="route-item">
    <span className="route-path">{path}</span>
    <button
      className="delete-route-btn"
      onClick={() => onDelete(path)}
      aria-label={`Delete route ${path}`}
    >
      Delete
    </button>
  </li>
);

export const DynamicRoutes: React.FC<DynamicRoutesProps> = ({
  onAddRoute,
  onDeleteRoute,
  initialRoutes = [],
}) => {
  const [routes, setRoutes] = useState<string[]>(initialRoutes);
  const [newRoutePath, setNewRoutePath] = useState('');

  const handleAddRoute = () => {
    if (!newRoutePath) return;

    const formattedPath = newRoutePath.startsWith('/')
      ? newRoutePath
      : `/${newRoutePath}`;

    if (!routes.includes(formattedPath)) {
      setRoutes([...routes, formattedPath]);
      onAddRoute(formattedPath);
      setNewRoutePath('');
    }
  };

  const handleDeleteRoute = (path: string) => {
    setRoutes(routes.filter(route => route !== path));
    onDeleteRoute(path);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddRoute();
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
          </div>
          <div className="routes-list-container">
            <ul id="dynamicRoutesList">
              {routes.map((route) => (
                <RouteItem
                  key={route}
                  path={route}
                  onDelete={handleDeleteRoute}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </fieldset>
  );
};