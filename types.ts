import { BODY_PARTS } from './constants';

export type BodyPart = typeof BODY_PARTS[number]['id'];

export type NeedleCounts = Record<BodyPart, number>;

export interface AcupunctureRecord {
  patientId: string;
  bedId: string;
  counts: NeedleCounts;
  total: number;
  scanTimestamp: string;
  acupunctureTimestamp: string | null;
  removalTimestamp: string | null;
  moxibustionCount: number;
  cupping: boolean;
  electroacupuncturePairs: number;
  remarks: string;
}