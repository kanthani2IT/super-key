export function addQueryParams(baseUrl, params = {}) {
  const query = new URLSearchParams(params).toString();
  return query ? `${baseUrl}?${query}` : baseUrl;
}
