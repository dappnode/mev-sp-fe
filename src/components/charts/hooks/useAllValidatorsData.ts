import { useQuery } from '@tanstack/react-query';
import { fetchAllValidators } from '@/client/api/queryFunctions';

export function useAllValidatorsData() {
    const {
        data: validatorsData,
        isLoading: isLoadingValidatorsData,
        isError: isErrorValidatorsData,
    } = useQuery({
        queryKey: ['validators'],
        queryFn: fetchAllValidators,
    })

    return { validatorsData, isLoadingValidatorsData, isErrorValidatorsData }
}