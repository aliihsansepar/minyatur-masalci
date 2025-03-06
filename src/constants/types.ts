export interface Character {
  id: string;
  name: string;
  type: "main" | "supporting";
  description?: string;
}

export interface StoryTheme {
  id: string;
  title: string;
  description: string;
}

export interface MoralValue {
  id: string;
  title: string;
  description: string;
}

export interface StorySettings {
  theme: StoryTheme;
  moralValues: MoralValue[];
}

export interface CustomItem {
  id: string;
  name: string;
  description?: string;
}

export interface StoryConfig {
  mainCharacter: Character;
  childAge: number;
  settings: StorySettings;
  supportingCharacters?: Character[];
  storyLength: "short" | "medium" | "long";
  customItems?: CustomItem[];
}

export interface Story {
  id: string;
  title: string;
  content: string;
  config: StoryConfig;
  createdAt: Date;
}
