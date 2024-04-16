import { ValidatorsData } from '../types';
import { useMemo } from 'react';

export function useValidatorStatuses(validatorsData: ValidatorsData | undefined) {
    return useMemo(() => {
        if (!validatorsData) return [];

        let yellowCard = 0;
        let redCard = 0;
        let banned = 0;

        validatorsData.forEach((validator) => {
            if (validator.status === 'yellowcard') {
                yellowCard += 1;
            } else if (validator.status === 'redcard') {
                redCard += 1;
            } else if (validator.status === 'banned') {
                banned += 1;
            }
        });

        return [
            { name: 'Yellow Card 🟡', count: yellowCard },
            { name: 'Red Card 🔴', count: redCard },
            { name: 'Banned 💀', count: banned },
        ];
    }, [validatorsData]);
}
