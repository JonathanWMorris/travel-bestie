import OpenAI from "openai";

const OPENAI_API_KEY = "_";

async function sendOpenAIRequest(prompt, maxTokens = 100) {
  console.log(process.env.OPENAI_API_KEY);
  const openai = new OpenAI({
    apiKey: OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  const chatCompletion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
  });
  console.log(chatCompletion.choices[0].message.content);
  return chatCompletion.choices[0].message.content;
}

async function getAIListPlaces(cityName, numHours, maxTokens = 100) {

  // Construct prompt for gpt
  const gptPrompt = `Give me a travel itinerary for ${cityName}  for ${numHours} hours and 
  things I like are cafes and bars. 
  Return the response as a json where the key is placeName and the corresponding value is a description. 
  Limit each description to no more then 80 characters.
  Limit the response upto 8 places or less. 
  Format : [{"name": String, "description" : String}]
  `;

  const openai = new OpenAI({
    apiKey: OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  const chatCompletion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: gptPrompt }],
  });

  var placeAndDescription = chatCompletion.choices[0].message.content;
  placeAndDescription = JSON.parse(placeAndDescription);
  console.log(placeAndDescription);
  return placeAndDescription;
}

export { sendOpenAIRequest, getAIListPlaces };
