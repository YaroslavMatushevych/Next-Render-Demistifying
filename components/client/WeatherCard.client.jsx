'use client';

export default function WeatherCard({
    data,
    loading = false
}) {
    if (loading) {
        return (
            <div className="card">
                <h3 className="subheading">Weather Forecast</h3>
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
                <h3 className="subheading">Weather Forecast</h3>
                <p className="text-gray-600">No data available</p>
            </div>
        );
    }

    return (
        <div className="card">
            <h3 className="subheading">Weather Forecast</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data.slice(0, 4).map((weather) => (
                    <div key={weather.location} className="bg-gray-50 p-3 rounded-md">
                        <div className="font-medium">{weather.location}</div>
                        <div className="text-2xl font-light">{weather.temperature}°C</div>
                        <div className="text-sm text-gray-600">{weather.conditions}</div>
                        <div className="text-xs text-gray-500 mt-1">
                            Humidity: {weather.humidity}% · Wind: {weather.windSpeed} km/h
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-2 text-xs text-gray-500 text-right">
                Last updated: {data[0]?.lastUpdated || 'N/A'}
            </div>
        </div>
    );
}