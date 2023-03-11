export async function getCurrency() {
  const res = await fetch(
    "https://api.fastforex.io/fetch-multi?from=UAH&to=EUR%2C%20USD%2C%20UAH%2C%20PLN&api_key=d1a6b1fab6-b0ecfe346e-rrd5h1"
  );

  const json = await res.json();

  return json.results;
}
