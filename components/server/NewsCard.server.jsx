
export default function NewsCard({
    data,
    loading = false
}) {
    if (loading) {
        return (
            <div className="card">
                <h3 className="subheading">Latest News</h3>
                <div className="space-y-4">
                    {Array.from({ length: 3 }).map((_, index) => (
                        <div key={index}>
                            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                            <div className="h-3 bg-gray-200 rounded w-full mb-1"></div>
                            <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (!data || data.length === 0) {
        return (
            <div className="card">
                <h3 className="subheading">Latest News</h3>
                <p className="text-gray-600">No news available</p>
            </div>
        );
    }

    return (
        <div className="card">
            <h3 className="subheading">Latest News</h3>
            <div className="space-y-4">
                {data.slice(0, 3).map((news) => (
                    <div key={news.id} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                        <h4 className="font-medium text-gray-900">{news.title}</h4>
                        <p className="text-sm text-gray-600 mt-1 line-clamp-2">{news.summary}</p>
                        <div className="flex justify-between mt-2 text-xs text-gray-500">
                            <span>{news.source}</span>
                            <span>{news.publishedAt}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
