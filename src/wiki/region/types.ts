import type { Create } from '@teyvatdev/types';

// The output JSON
export type RegionOutput = Create.Region;

// Temporary Scraper Data Interfaces
// TODO: Add new types here

export interface RegionTableData {
    nation: string,
    element: string,
    archon: string,
    ideal: string,
    governingBody: string
}
