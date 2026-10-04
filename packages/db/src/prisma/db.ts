import 'dotenv/config';
import postgres from '@prisma/orm-postgres/runtime';
import type { Contract } from './contract.d';
import contractJson from './contract.json' with { type: 'json' };

export const db = postgres<Contract>({
  contractJson,
  url: process.env.DATABASE_URL!,
  // @ts-ignore - Instructs the low-level provider package to skip the handshake checks
  verifyMarker: false
});
export { or,and,not } from '@prisma/orm-postgres/orm-client'
export enum EventType {
  COLLEGE = "COLLEGE",
  ALUMNI = "ALUMNI"
}