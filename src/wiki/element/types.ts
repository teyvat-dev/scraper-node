import type { Create } from '@teyvatdev/types';
// The output JSON
export type ElementOutput = Create.Element;

// Temporary Scraper Data Interfaces
// TODO: Add new types here

export interface ElementTableData {
  name: string;
  statusEffect: string;
  reactionFormulas: string[];
  reactionDescriptions: string[];
}
