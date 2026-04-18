const axios = require("axios");

exports.generateQuestions = async (topic) => {
  const response = await axios.post(
    "https://api.openai.com/v1/chat/completions",
    {
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: `Generate 5 MCQ questions on ${topic} in JSON format:
          [{question:"", options:["","","",""], answer:""}]`
        }
      ]
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
      }
    }
  );

  return JSON.parse(response.data.choices[0].message.content);
};