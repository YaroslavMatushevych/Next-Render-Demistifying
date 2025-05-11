export default function CryptoCard({
    data,
    loading = false
}) {
    if (loading) {
        return (
            <div className="card">
                <h3 className="subheading">Cryptocurrency Markets</h3>
                <div className="space-y-2">
                    {Array.from({ length: 3 }).map((_, index) => (
                        <div key={index} className="data-loading"></div>
                    ))}
                </div>
            </div>
        );
    }

    if (!data || data.length === 0) {
        return (
            <div className="card">
                <h3 className="subheading">Cryptocurrency Markets</h3>
                <p className="text-gray-600">No data available</p>
            </div>
        );
    }

    return (
        <div className="card">
            <h3 className="subheading">Cryptocurrency Markets</h3>
            <div className="overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                        <tr>
                            <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Coin</th>
                            <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                            <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">24h</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {data.slice(0, 5).map((crypto) => (
                            <tr key={crypto.symbol}>
                                <td className="px-2 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {crypto.name} <span className="text-gray-500 font-normal">{crypto.symbol}</span>
                                </td>
                                <td className="px-2 py-2 whitespace-nowrap text-sm text-gray-500">
                                    ${crypto.price.toLocaleString()}
                                </td>
                                <td className={`px-2 py-2 whitespace-nowrap text-sm ${crypto.change24h >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                    {crypto.change24h >= 0 ? '+' : ''}{crypto.change24h}%
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="mt-2 text-xs text-gray-500 text-right">
                    Last updated: {data[0]?.lastUpdated || 'N/A'}
                </div>
            </div>
        </div>
    );
}