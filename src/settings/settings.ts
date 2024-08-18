// settings.ts

type Settings = {
    version: string;
    quote: string;
    // Add other specific settings as needed
    [key: string]: any;
};

export class SettingsStore {
    private settings: Settings;

    constructor(initialSettings: Settings) {
        this.settings = { ...initialSettings };
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
    updateSetting(name: string, value: any): void {
        if (!(name in this.settings)) {
            throw new Error(`Setting '${name}' not found`);
        }

        this.settings[name] = value;
        console.log(`Updated setting '${name}' to:`, value);
    }

    /**
     * Updates multiple settings.
     * If any setting does not exist, an error is thrown.
     * @param updates - Array of objects containing the setting name and new value.
     */
    updateSettings(updates: { name: string, value: any }[]): void {
        updates.forEach(({ name, value }) => {
            this.updateSetting(name, value);
        });
    }
}

// Initial settings can be customized as needed.
export const initialSettings: Settings = {
    version: 'v1',
    quote: 'yep that',
    // other settings...
};
