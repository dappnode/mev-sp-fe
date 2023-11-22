// pages/api/validatorRelayers.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { isValidPubkey } from '@/utils/isValidPubkey'; // Assuming you have a utility function for validating public keys

const handleValidatorRelayers = async (req: NextApiRequest, res: NextApiResponse) => {
    // Extracting the public key from the request
    const valPubKeys = req.query.valpubkey as string;

    if (!valPubKeys) {
        return res.status(400).json({ error: "No validator pubkey provided!" });
    }

    const keys = valPubKeys.split(',');
    if (keys.length > 50) {
        return res.status(400).json({ error: "Maximum number of pubkeys exceeded (max: 50)" });
    }

    for (const key of keys) {
        if (!isValidPubkey(key)) {
            return res.status(400).json({ error: `Invalid validator pubkey format: ${key}` });
        }
    }

    // Implement the logic to process validators concurrently and handle the response
    try {
        const results = await processValidatorsConcurrently(keys);
        // Respond with the results
        res.status(200).json(results);
    } catch (e) {
        // Handle errors appropriately
        res.status(500).json({ error: e });
    }
};

// Assuming these are the types for your results
interface ValidatorResult {
    isValid: boolean;
    data: any; // Replace with the actual data type
}

interface ValidationResult {
    results: ValidatorResult[];
    allValid: boolean;
}

// Mock implementation of processing a single validator
// Replace this with the actual logic to process each validator
async function processSingleValidator(validatorKey: string): Promise<ValidatorResult> {
    // Implement the logic to check the validator
    // For example, making an HTTP request to a relay and processing the response
    // ...

    return {
        isValid: true, // or false based on your processing logic
        data: {} // Replace with actual data
    };
}

// The processValidatorsConcurrently function
async function processValidatorsConcurrently(keys: string[]): Promise<ValidationResult> {
    const promises = keys.map(key => processSingleValidator(key));

    const results = await Promise.all(promises);
    const allValid = results.every(result => result.isValid);

    return {
        results,
        allValid
    };
}


export default handleValidatorRelayers;
