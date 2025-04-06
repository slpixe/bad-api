// config.ts

type DynamicRoute = {
	path: string;
	payload?: any;
};

type Config = {
	version: string;
	quote: string;
	networkDelay: number;
	networkDelayChance: number;
	errorChance: number;
	dynamicRoutes: DynamicRoute[];
	[key: string]: string | number | DynamicRoute[];
};

class ConfigStore {
	private static instance: ConfigStore;
	private readonly config: Config;

	// Private constructor to prevent direct instantiation
	private constructor(initialConfig: Config) {
		this.config = { ...initialConfig };
	}

	/**
	 * Provides access to the singleton instance of the ConfigStore.
	 * Initializes the instance if it doesn't exist.
	 */
	public static getInstance(
		instanceInitialConfig: Config = initialConfig,
	): ConfigStore {
		if (!ConfigStore.instance) {
			ConfigStore.instance = new ConfigStore(instanceInitialConfig);
		}
		return ConfigStore.instance;
	}

	/**
	 * Returns a clone of the current config to avoid external mutations.
	 */
	getConfig(): Config {
		return { ...this.config };
	}

	/**
	 * Updates a specific setting by name.
	 * Throws an error if the setting does not exist.
	 * @param name - The name of the setting to update.
	 * @param value - The new value for the setting.
	 */
	updateSetting(name: string, value: string | number | DynamicRoute[]): void {
		if (!(name in this.config)) {
			//throw new Error(`Setting '${name}' not found`);
		}

		this.config[name] = value;
		console.log(`Updated setting '${name}' to:`, value);
	}

	/**
	 * Updates multiple config.
	 * If any setting does not exist, an error is thrown.
	 * @param updates - Array of objects containing the setting name and new value.
	 */
	updateConfig(updates: { name: string; value: string | number | DynamicRoute[] }[]): void {
		for (const { name, value } of updates) {
			this.updateSetting(name, value);
		}
	}

	/**
	 * Add a new dynamic API route
	 * @param route - Route path starting with /
	 * @param payload - Optional JSON payload for the route
	 */
	addDynamicRoute(route: string, payload?: any): void {
		// Make sure route starts with / but doesn't include /api
		const path = route.startsWith('/') ? route : `/${route}`;
		
		// Check if route already exists
		const routeExists = this.config.dynamicRoutes.some(r => r.path === path);
		if (!routeExists) {
			this.config.dynamicRoutes.push({ path, payload });
			console.log(`Added dynamic route: ${path}`);
		}
	}

	/**
	 * Remove a dynamic API route
	 * @param route - Route path to remove
	 */
	removeDynamicRoute(route: string): void {
		const path = route.startsWith('/') ? route : `/${route}`;
		this.config.dynamicRoutes = this.config.dynamicRoutes.filter(r => r.path !== path);
		console.log(`Removed dynamic route: ${path}`);
	}

	/**
	 * Get all dynamic API routes
	 */
	getDynamicRoutes(): DynamicRoute[] {
		return [...this.config.dynamicRoutes];
	}
}

// Initial config can be customized as needed.
export const initialConfig: Config = {
	version: "v1",
	quote: "yep that",
	networkDelay: 2000,
	networkDelayChance: 0.5,
	errorChance: 0.5,
	dynamicRoutes: [
		{ path: "/example", payload: { message: "This is an example dynamic route" } }
	],
	// other config...
};

// Export the singleton instance for use across the application
export const configStore = ConfigStore.getInstance(initialConfig);
