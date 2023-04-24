const axios = require('axios');

const openai = axios.create({
  baseURL: 'https://api.openai.com/v1',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer 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',
  },
});


async function createChatCompletion(messages, options = {}) {
  try {
    const response = await openai.post('/chat/completions', {
      model: options.model || 'gpt-4',
      messages,
      ...options,
    });

    return response.data.choices;
  } catch (error) {
    console.error('Error creating chat completion:', error);
  }
}

async function generateResponse(keywords) {
  const messages = [
    {
      role: 'user',
      content: `Write a meta description for keywords: [${keywords}, free, pdf].
      Make sure output text targets teachers as the audience.
      Make sure output text is SEO Friendly.
      Try to put the keywords in the first half of the output.
      Make sure output is in context of worksheet pages.
      Make sure the output provides high intent to click.
      Make sure output text is less than 160 characters. 
      Make sure the output text generated is with the context of worksheets on Quizizz.
      Make sure that output does not have exact sentences or phrases from the internet.
      The first sentence should talk about keywords, and second one should concentrate on providing high intent to click.
      Do not use words: [Discover, SEO, Boost].
      `,
    },
  ];
  


  const options = {
    temperature: 0.3,
    max_tokens: 1000,
  };

  try {
    const choices = await createChatCompletion(messages, options);
    return choices[0].message.content;
    // return null;
  } catch (error) {
    return {};
  }
}

module.exports = {
  generateResponse,
};
