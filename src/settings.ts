import { App, PluginSettingTab, Setting } from "obsidian";

import ObsidianAutoCardLink from "src/main";

export interface ObsidianAutoCardLinkSettings {
  showInMenuItem: boolean;
  enhanceDefaultPaste: boolean;
  trimAdditionalWhitespace: boolean;
}

export const DEFAULT_SETTINGS: ObsidianAutoCardLinkSettings = {
  showInMenuItem: true,
  enhanceDefaultPaste: false,
  trimAdditionalWhitespace: false,
};

export class ObsidianAutoCardLinkSettingTab extends PluginSettingTab {
  plugin: ObsidianAutoCardLink;

  constructor(app: App, plugin: ObsidianAutoCardLink) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    const { containerEl } = this;

    containerEl.empty();

    new Setting(containerEl)
      .setName("Enhance Default Paste")
      .setDesc(
        "Fetch the link metadata when pasting a url in the editor with the default paste command"
      )
      .addToggle((val) => {
        if (!this.plugin.settings) return;
        return val
          .setValue(this.plugin.settings.enhanceDefaultPaste)
          .onChange(async (value) => {
            if (!this.plugin.settings) return;
            this.plugin.settings.enhanceDefaultPaste = value;
            await this.plugin.saveSettings();
          });
      });

    new Setting(containerEl)
      .setName("Add commands in menu item")
      .setDesc("Whether to add commands in right click menu items")
      .addToggle((val) => {
        if (!this.plugin.settings) return;
        return val
          .setValue(this.plugin.settings.showInMenuItem)
          .onChange(async (value) => {
            if (!this.plugin.settings) return;
            this.plugin.settings.showInMenuItem = value;
            await this.plugin.saveSettings();
          });
      });

    new Setting(containerEl)
      .setName("Trim additional whitespace")
      .setDesc("Will not add additional newlines to the beginning or end if the link is at the beginning or end of a line respectively")
      .addToggle((val) => {
        if (!this.plugin.settings) return;
        return val
          .setValue(this.plugin.settings.trimAdditionalWhitespace)
          .onChange(async (value) => {
            if (!this.plugin.settings) return;
            this.plugin.settings.trimAdditionalWhitespace = value;
            await this.plugin.saveSettings();
          });
      });
  }
}
