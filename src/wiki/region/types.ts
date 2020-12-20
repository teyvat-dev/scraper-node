import type { Create } from '@teyvatdev/types';

// The output JSON
export type RegionOutput = Create.Region;

export interface RegionTableData {
  nation: string;
  element: string;
  archon: string;
  ideal: string;
  governingBody: string;
}
