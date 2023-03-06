import { useState } from "react";
import { Header, Response } from "../../utils/Playground";
import InputSection from "../../utils/Playground/InputSection";
import { Button } from "../../utils/Button/Button";
import useOpenAI from "../../utils/OpenAI/useOpenAI";

export default function CompleteSentence() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setLoading] = useState(false);
  const { askChatGpt } = useOpenAI();

  const handleClick = async () => {
    try {
      setLoading(true);
      const messages = [
        {
          role: "user",
          content: `次の文章に続く文章を考えて、補完してください。${input}`,
        },
      ];
      setResponse(await askChatGpt(messages));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header
        title="文章補完の実験室"
        description="与えられた文章に対して、続きを補完します。正直ChatGPT本体でやってください。"
      />

      <InputSection>
        <>
          <p className="text-sm text-gray-500">
            補完したい文章を入力してください。
          </p>
          <textarea
            id="message"
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setInput(e.target.value)
            }
            value={input}
            rows={20}
            className="block p-2.5 w-full font-medium text-sm text-zinc-400 bg-zinc-700 rounded-lg border border-zinc-600 focus:ring-green-600 focus:border-green-600"
            placeholder="例: 今日はいい天気だ。"
          />
          <Button type="submit" onClick={handleClick}>
            実行する
          </Button>
        </>
      </InputSection>
      <Response response={response} isLoading={isLoading} />
    </>
  );
}
