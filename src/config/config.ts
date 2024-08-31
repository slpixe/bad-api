// config.ts

type Config = {
	version: string;
	quote: string;
	networkDelay: number;
	[key: string]: string | number;
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
	updateSetting(name: string, value: string | number): void {
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
	updateConfig(updates: { name: string; value: string | number }[]): void {
		for (const { name, value } of updates) {
			this.updateSetting(name, value);
		}
	}
}

// Initial config can be customized as needed.
export const initialConfig: Config = {
	version: "v1",
	quote: "yep that",
	networkDelay: 500,
	networkDelayChance: 0.5,
	// other config...
};

// Export the singleton instance for use across the application
export const configStore = ConfigStore.getInstance(initialConfig);
