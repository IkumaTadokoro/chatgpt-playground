import { atom } from "recoil";

const openAIApiKeyState = atom({
  key: "openAIApiKeyState", // unique ID (with respect to other atoms/selectors)
  default: import.meta.env.VITE_OPENAI_API_KEY, // default value (aka initial value)
});

export default openAIApiKeyState;
