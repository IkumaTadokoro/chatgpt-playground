import { atom } from "recoil";

const openApiKeyState = atom({
  key: "openApiKeyState", // unique ID (with respect to other atoms/selectors)
  default: import.meta.env.VITE_OPENAI_API_KEY, // default value (aka initial value)
});

export default openApiKeyState;
