import { toast } from "react-hot-toast";
import axios from "axios";
import { useRecoilState } from "recoil";
import openAIApiKeyState from "./openAIApiKeyState";

type ChatGptMessages = {
  role: string;
  content: string;
}[];

export default function useOpenAI() {
  const [apiKey, setApiKey] = useRecoilState(openAIApiKeyState);
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

  const askWhisper = async (audio: File) => {
    if (!apiKey) {
      toast.error("OpenAI API Keyが設定されていません。");
      return "";
    }

    const formData = new FormData();
    formData.append("file", audio);
    formData.append("model", "whisper-1");
    const response = await axios.post(
      "https://api.openai.com/v1/audio/transcriptions",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    return response.data.text;
  };

  return {
    apiKey,
    setApiKey,
    askChatGpt,
    askWhisper,
  };
}
