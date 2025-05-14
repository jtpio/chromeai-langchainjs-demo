import { ChromeAI } from "@langchain/community/experimental/llms/chrome_ai";

const model = new ChromeAI({
  temperature: 0.5,
  topK: 40,
});

document.getElementById('generate').addEventListener('click', async () => {
  const resultDiv = document.getElementById('result');
  resultDiv.textContent = 'Generating poem...';

  try {
    const response = await model.invoke("Write me a short poem please");
    resultDiv.textContent = response;
  } catch (error) {
    resultDiv.textContent = `Error: ${error.message}`;
  }
});
