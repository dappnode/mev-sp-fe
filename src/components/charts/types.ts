export type ProposedBlock = {
    slot: number;
    validatorIndex: number;
    block: number;
    validatorKey: string;
    blockType: "okpoolproposal" | "okpoolproposalblskeys" | "missedproposal" | "wrongfeerecipient";
    rewardWei: string;
    rewardType: "" | "vanila" | "mev" | "unknownrewardtype";
    withdrawalAddress: string;
};