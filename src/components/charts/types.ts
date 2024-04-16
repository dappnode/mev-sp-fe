import { fetchAllBlocks, fetchProposedBlocks, fetchAllValidators } from '@/client/api/queryFunctions';

export type ProposedBlocks = Awaited<ReturnType<typeof fetchProposedBlocks>>;

export type ProposedBlock = ProposedBlocks[number];

export type AllBlocksData = Awaited<ReturnType<typeof fetchAllBlocks>>;

export type ValidatorsData = Awaited<ReturnType<typeof fetchAllValidators>>;