type Settings = {
    [key: string]: any;
};

export class SettingsStore {
    private settings: Settings;

    constructor(initialSettings: Settings) {
        this.settings = { ...initialSettings };
    }

    getSettings(): Settings {
        return { ...this.settings };
        // return this.settings;
    }

    updateSetting(name: string, value: any): void {
        // if (name in this.settings) {
        //     this.settings[name] = value;
        // } else {
        //     console.log('=this?')
        //     throw new Error(`Setting '${name}' not found`);
        // }
        try{
            this.settings[name] = value;
            console.log('=settings', this.settings);
        } catch (e: unknown) {
            // console.log('=this?')
            // throw new Error(`Setting '${name}' not found`);
            console.log('=e', e);
        }
    }

    updateSettings(updates: { name: string, value: any }[]): void {
        updates.forEach(({ name, value }) => {
            this.updateSetting(name, value);
        });
    }
}

export const initialSettings: Settings = {
    version: 'v1',
    quote: 'yep that',
    // other settings...
};