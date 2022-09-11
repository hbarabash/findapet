const apiKey = "7d630837b6d0442e9dd50eb059343d02";
const access_token = "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIycDhHc3l6NWtTbnlLRk5wNHc3WHFtTldENVVESGdQSjVRa245Z0xwOVhIYmtYT3A2OCIsImp0aSI6IjAwNTk5MGQ5YTllZWUxNzNlODQ2OWI3NGIzZmZlOTRhZmY0MjQ4ZDhiZTBjZDZkYjkxZmNiMTc5ZjNjYmFiZTcxNzJiNjMxYTk5MzI5MzUyIiwiaWF0IjoxNjYyNTQ1MTczLCJuYmYiOjE2NjI1NDUxNzMsImV4cCI6MTY2MjU0ODc3Mywic3ViIjoiIiwic2NvcGVzIjpbXX0.eFqZoqc6sYY5ilJ08OsJ6PzKkwxixQIeasG9bMdIHLHkvyaRU8pQafTCqJi2dwqY81EQV509xT6s_UK7sqghxYCJ3PXqk8VLGaPfV4QsOnDx7k3Y_o3cZz-MZ4dMVFPZfM019iCywWe7ZKumIMclqCECVuxs_8r4C7R9YAp7dABNt4dV1Xm3ovwdNcrjVprkyRHPR5kkIbS0AVXWiaPvHZZP-2R7hlfA0Ossy4IV_iyzZjgAdq-v1NnviFQ6YpSnnrnD17LPxsAlBP-G7ngSQnKSs69CJgrL29UajiJ5KziTxYNNvKBwF8egukDMFDnrtWy-4VoclRBYbt8RLp6LPA";
export const getBreeds = async () => {
  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set("Authorization", access_token);
  //requestHeaders.set("Access-Control-Allow-Origin", '*')
  const baseUrl = `https://api.petfinder.com/v2/types/cat/breeds`
  const request = await fetch(baseUrl, {
    method: "GET",
    headers: requestHeaders
  });
  const response = request.json();
  console.log(response);
  return response;
};



export const getPetSearchResults = async (
  input: string,
  number: number,
  offset: number
) => {
  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set("Content-Type", "application/json");
  const baseUrl = `https://api.spoonacular.com/recipes/complexSearch?query=${input}&apiKey=${apiKey}&number=${number}&offset=${offset}`;
  const request = await fetch(baseUrl, {
    method: "GET",
    headers: requestHeaders
  });
  const response = request.json();
  console.log("RESPONSE: " + response);
  return response;
};

export const getRecipeById = async (id: number) => {
  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set("Content-Type", "application/json");

  const baseUrl = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`;
  const request = await fetch(baseUrl, {
    method: "GET",
    headers: requestHeaders
  });
  const response = request.json();
  console.log(response);
  return response;
};

// gmail key apiKey=7d630837b6d0442e9dd50eb059343d02
// icloud key apiKey=5e05934218654335a5b09ae804a8e0fb
