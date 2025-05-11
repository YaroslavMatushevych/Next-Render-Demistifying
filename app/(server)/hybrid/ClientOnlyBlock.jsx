'use client';

import CryptoCard from '@/components/client/CryptoCard.client';
import useSWR from 'swr';
import { fetchCryptoData } from '@/lib/api-utils';

const fetcher = (fn) => fn();

export const useClientCryptoData = () =>
  useSWR('client-crypto', () => fetcher(fetchCryptoData));


export default function ClientOnlyBlock() {
    const { data: crypto, isLoading: loadingCrypto } = useClientCryptoData();

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <CryptoCard data={crypto} loading={loadingCrypto} />
        </div>
    );
}
