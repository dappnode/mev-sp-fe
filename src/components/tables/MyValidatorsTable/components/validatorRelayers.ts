import axios from 'axios';
import { SMOOTHING_POOL_ADDRESS } from '../../../../utils/config'
// Utility function to validate public keys
function isValidPubkey(key: string): boolean {
    const pubkeyRegex = /^0x[0-9a-fA-F]{96}$/;
    return pubkeyRegex.test(key);
}

// Types for the results
interface HttpRelay {
    relayAddress: string;
    feeRecipient?: string;
    timestamp?: string;
}

interface ValidatorRelayResult {
    validatorKey: string; // Added to store the validator key
    correctFeeRelayers: HttpRelay[];
    wrongFeeRelayers: HttpRelay[];
    unregisteredRelayers: HttpRelay[];
    isValidatorValid: boolean;
}

// Split the relay URLs from the environment variable
const relays: string[] = process.env.NEXT_PUBLIC_RELAYS_BASE_URLS?.split(',') || [];

// Implement processSingleValidator
async function processSingleValidator(valPubKey: string): Promise<ValidatorRelayResult> {
    let correctFeeRelays: HttpRelay[] = [];
    let wrongFeeRelays: HttpRelay[] = [];
    let unregisteredRelays: HttpRelay[] = [];
    let registeredCorrectFee = false;

    for (const relay of relays) {
        try {
            const url = `${relay}/relay/v1/data/validator_registration?pubkey=${valPubKey}`;
            const response = await axios.get(url);

            if (response.status === 200) {
                const signedRegistration = response.data; // Adjust based on actual response structure

                const relayRegistration: HttpRelay = {
                    relayAddress: relay,
                    feeRecipient: signedRegistration.feeRecipient, // Replace with actual path in the response
                    timestamp: signedRegistration.timestamp, // Replace with actual path in the response
                };

                if (signedRegistration.feeRecipient === SMOOTHING_POOL_ADDRESS ) {
                    correctFeeRelays.push(relayRegistration);
                } else {
                    wrongFeeRelays.push(relayRegistration);
                }
            } else if (response.status === 400 || response.status === 404) {
                unregisteredRelays.push({ relayAddress: relay });
            } else {
                // Handle other HTTP errors
                throw new Error(`HTTP error ${response.status}`);
            }
        } catch (error) {
            console.error(`Error calling relay ${relay} for validator ${valPubKey}:`, error);
            unregisteredRelays.push({ relayAddress: relay });
        }
    }

    if (wrongFeeRelays.length === 0 && correctFeeRelays.length > 0) {
        registeredCorrectFee = true;
    }

    return {
        validatorKey: valPubKey,
        correctFeeRelayers: correctFeeRelays,
        wrongFeeRelayers: wrongFeeRelays,
        unregisteredRelayers: unregisteredRelays,
        isValidatorValid: registeredCorrectFee,
    };
}
// Implement processValidatorsConcurrently
async function processValidatorsConcurrently(keys: string[]): Promise<{ results: ValidatorRelayResult[], allValid: boolean }> {
    // Ensure all keys are valid
    if (!keys.every(isValidPubkey)) {
        throw new Error('Invalid validator pubkey format');
    }

    // Process each validator concurrently
    const results = await Promise.all(keys.map(processSingleValidator));
    const allValid = results.every(result => result.isValidatorValid);

    return { results, allValid };
}
interface ValidatorRelayResponse {
    validators: ValidatorRelayResult[];
    allValidatorsCorrect: boolean;
    incorrectValidators: string[];
}
// Function to extract incorrect validators
function extractIncorrectValidators(results: ValidatorRelayResult[]): string[] {
    return results
        .filter(result => !result.isValidatorValid)
        .map(result => result.validatorKey); // Assuming validatorKey is part of ValidatorRelayResult
}

// Implementing handleValidatorRelayers
export async function handleValidatorRelayers(valPubKeys: string): Promise<ValidatorRelayResponse> {
    console.log("CALLED")
    const keys = valPubKeys.split(',');
    if (keys.length === 0) {
        throw new Error('No validator pubkey provided!');
    }

    if (keys.length > 50) {
        throw new Error('Maximum number of pubkeys exceeded (max: 50)');
    }

    try {
        const { results, allValid } = await processValidatorsConcurrently(keys);
        const incorrectValidators = extractIncorrectValidators(results);

        return {
            validators: results,
            allValidatorsCorrect: allValid,
            incorrectValidators: incorrectValidators,
        };
    } catch (error) {
        throw new Error('An error occurred while processing validators');
    }
}