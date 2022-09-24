export default async function parseJsonResponse(response: Response){
  // Got a response, no request pending
  if(!response.body) {
    throw new Error("Could not read search response body");
  }
  const buff = response.body.getReader();
  const chunks = [];
  let chunk;
  while(chunk = await buff.read()) {
    if(chunk.done) {
      break;
    }
    const decoder = new TextDecoder();
    const decodedText = decoder.decode(chunk.value);
    chunks.push(decodedText);
  }
  const responseText = chunks.join("");
  
  if(!response.ok) {
    console.error(responseText);
    throw new Error(responseText);
  }
  return JSON.parse(responseText);
}