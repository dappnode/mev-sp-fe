export function isValidPubkey(pubkey: string): boolean {
    // Regular expression to match a 48-byte hex string with '0x' prefix
    const pubkeyRegex = /^0x[a-fA-F0-9]{96}$/;
    return pubkeyRegex.test(pubkey);
}

