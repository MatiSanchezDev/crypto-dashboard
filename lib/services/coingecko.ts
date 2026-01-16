export async function getMarketCoins(page = 1, per_page = 20) {
  const res = await fetch(
    `${process.env.BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${per_page}&page=${page}`,
    {
      next: { revalidate: 60 },
      headers: {
        "x-cg-demo-api-key": process.env.API_KEY || "",
      },
    }
  );

  if (!res.ok) {
    throw new Error("Error fetching CoinGecko data");
  }

  return res.json();
}

export async function searchCoins(query: string) {
  const res = await fetch(
    `${process.env.BASE_URL}/search?query=${encodeURIComponent(query)}`,
    {
      next: { revalidate: 300 }, // Cache search results longer
      headers: {
        "x-cg-demo-api-key": process.env.API_KEY || "",
      },
    }
  );

  if (!res.ok) {
    throw new Error("Error searching coins");
  }

  return res.json();
}

export async function getCoinDetails(id: string) {
  const res = await fetch(
    `${process.env.BASE_URL}/coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`,
    {
      next: { revalidate: 60 },
      headers: {
        "x-cg-demo-api-key": process.env.API_KEY || "",
      },
    }
  );

  if (!res.ok) {
    throw new Error("Error fetching coin details");
  }

  return res.json();
}

export async function getCoinHistory(id: string, days = 7) {
  const res = await fetch(
    `${process.env.BASE_URL}/coins/${id}/market_chart?vs_currency=usd&days=${days}`,
    {
      next: { revalidate: 300 },
      headers: {
        "x-cg-demo-api-key": process.env.API_KEY || "",
      },
    }
  );

  if (!res.ok) {
    throw new Error("Error fetching coin history");
  }

  return res.json();
}
