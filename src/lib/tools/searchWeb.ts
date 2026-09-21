type TavilySearchResult = {
  title: string;
  url: string;
  content: string;
  score?: number;
};

type TavilyResponse = {
  results: TavilySearchResult[];
};

export async function searchWeb(query: string) {
  const apiKey = process.env.TAVILY_API_KEY;

  if (!apiKey) {
    throw new Error("TAVILY_API_KEY is not configured.");
  }

  const response = await fetch("https://api.tavily.com/search", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      api_key: apiKey,
      query,
      search_depth: "basic",
      topic: "general",
      max_results: 5,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();

    console.error("Tavily error:", errorText);

    throw new Error("Web search failed.");
  }

  const data = (await response.json()) as TavilyResponse;

  return data.results.map((result) => ({
    title: result.title,
    url: result.url,
    content: result.content,
    score: result.score ?? null,
  }));
}