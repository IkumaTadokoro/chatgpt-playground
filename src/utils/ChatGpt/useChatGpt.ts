import { toast } from "react-hot-toast";
import axios from "axios";
import { useRecoilState } from "recoil";
import openApiKeyState from "./openApiKeyState";

type ChatGptMessages = {
  role: string;
  content: string;
}[];

export default function useChatGpt() {
  const [apiKey, setApiKey] = useRecoilState(openApiKeyState);
  const askChatGpt = async (messages: ChatGptMessages) => {
    if (!apiKey) {
      toast.error("OpenAI API Keyが設定されていません。");
      return "";
    }

    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        messages,
        model: "gpt-3.5-turbo",
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    return response.data.choices[0].message.content;
  };

  return {
    apiKey,
    setApiKey,
    askChatGpt,
  };
}
