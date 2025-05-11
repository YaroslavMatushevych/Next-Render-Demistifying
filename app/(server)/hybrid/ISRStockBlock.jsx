import { fetchStockData } from '@/lib/api-utils';
import StockCard from '@/components/server/StockCard.server';

export const revalidate = 60; // ✅ only this block uses ISR

export default async function ISRStockBlock() {
  const stocks = await fetchStockData();
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <StockCard data={stocks} />
    </div>
  );
}
