// settings.ts

type Settings = {
	version: string;
	quote: string;
	networkDelay: number;
	[key: string]: string | number;
};

class SettingsStore {
	private static instance: SettingsStore;
	private readonly settings: Settings;

	// Private constructor to prevent direct instantiation
	private constructor(initialSettings: Settings) {
		this.settings = { ...initialSettings };
	}

	/**
	 * Provides access to the singleton instance of the SettingsStore.
	 * Initializes the instance if it doesn't exist.
	 */
	public static getInstance(
		instanceInitialSettings: Settings = initialSettings,
	): SettingsStore {
		if (!SettingsStore.instance) {
			SettingsStore.instance = new SettingsStore(instanceInitialSettings);
		}
		return SettingsStore.instance;
	}

	/**
	 * Returns a clone of the current settings to avoid external mutations.
	 */
	getSettings(): Settings {
		return { ...this.settings };
	}

	/**
	 * Updates a specific setting by name.
	 * Throws an error if the setting does not exist.
	 * @param name - The name of the setting to update.
	 * @param value - The new value for the setting.
	 */
	updateSetting(name: string, value: string | number): void {
		if (!(name in this.settings)) {
			//throw new Error(`Setting '${name}' not found`);
		}

		this.settings[name] = value;
		console.log(`Updated setting '${name}' to:`, value);
	}

	/**
	 * Updates multiple settings.
	 * If any setting does not exist, an error is thrown.
	 * @param updates - Array of objects containing the setting name and new value.
	 */
	updateSettings(updates: { name: string; value: string | number }[]): void {
		for (const { name, value } of updates) {
			this.updateSetting(name, value);
		}
	}
}

// Initial settings can be customized as needed.
export const initialSettings: Settings = {
	version: "v1",
	quote: "yep that",
	networkDelay: 500,
	// other settings...
};

// Export the singleton instance for use across the application
export const settingsStore = SettingsStore.getInstance(initialSettings);
