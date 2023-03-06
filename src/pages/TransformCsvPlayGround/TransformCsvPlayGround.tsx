/* eslint-disable react/jsx-props-no-spreading */
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";
import { parse } from "csv-parse/browser/esm/sync";
import useOpenAI from "../../utils/OpenAI/useOpenAI";
import { Header, Response, SimpleTable } from "../../utils/Playground";
import InputSection from "../../utils/Playground/InputSection";
import { Button } from "../../utils/Button/Button";
import { FilePreview, readFileAsText } from "../../utils/Form";

export default function TransformCsv() {
  const [input, setInput] = useState("");
  const [file, setFile] = useState<File | undefined>(undefined);
  const [response, setResponse] = useState<string | undefined>("");
  const [content, setContent] = useState<string[][] | undefined>(undefined);
  const [isLoading, setLoading] = useState(false);
  const { askChatGpt } = useOpenAI();

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const acceptedFile = acceptedFiles[0];
    const newContent = await readFileAsText(acceptedFile);
    const csvData: string[][] = parse(newContent, { columns: false });
    setResponse(undefined);
    setContent(csvData);
    setFile(acceptedFile);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "text/csv": [".csv"] },
  });

  const handleClick = async () => {
    try {
      setResponse(undefined);
      setLoading(true);
      const fileContent = await readFileAsText(file as File);
      const messages = [
        {
          role: "system",
          content: `これから渡すCSVのデータを読み取って、その中から${input}である列をすべて抽出し、横持ちのテーブルとして返してください。出力は1列目がもとのCSVのカラム名、2列目がもとのCSVの値となるテーブル形式で返してください。
          例えば、以下のようなCSVが渡された場合、
          | id | 名前 | 給食費 | 請求金額 |
          | 1 | Alice | 300 | 1000 |
          | 2 | Bob | 300 | 2000 |
          | 3 | Carol | 300 | 3000 |
          
          以下のようなテーブルを返してください。
          | id | 名前 | 費目 | 金額 |
          | 1 | Alice | 給食費 | 300 |
          | 2 | Bob | 給食費 | 300 |
          | 3 | Carol | 給食費 | 300 |
          | 1 | Alice | 請求金額 | 1000 |
          | 2 | Bob | 請求金額 | 2000 |
          | 3 | Carol | 請求金額 | 3000 |

          注意事項
          - 各プログラミング言語での実装例ではなく、あくまでこのようなテーブルを推測した結果を返してください。
          - ${input}である可能性が少しでもある列はすべて変換してください。
          - 推測したテーブル以外の内容は返答に含めないでください。
          - ${input}と判断されなかった列はそのまま返してください。
          `,
        },
        {
          role: "user",
          content: fileContent,
        },
      ];

      setResponse(await askChatGpt(messages));
    } catch (error) {
      console.error(error);
    } finally {
      toast.success("終了しました。");
      setLoading(false);
    }
  };

  return (
    <>
      <Header
        title="CSV縦横変換の実験室"
        description="与えられたCSVのカラムから、指定した内容に合致する全ての列を横持ちに変換します。たぶん"
      />
      <InputSection>
        <>
          <p className="text-sm text-gray-500">
            1. 縦横変換したい内容を含む列の内容を入力してください。
          </p>
          <input
            id="message"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setInput(e.target.value)
            }
            value={input}
            className="block p-2.5 w-full font-medium text-sm text-zinc-400 bg-zinc-700 rounded-lg border border-zinc-600 focus:ring-blue-500 focus:border-blue-500"
            placeholder="例: 金額っぽい列"
          />
          <p className="text-sm text-gray-500">
            2. 変換したいCSVファイルをドラッグ&ドロップしてください。
          </p>
          <div
            className="flex items-center justify-center w-full"
            {...getRootProps()}
          >
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-32 border-2 border-zinc-600 border-dashed rounded-lg cursor-pointer bg-zinc-700 hover:opacity-80"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  aria-hidden="true"
                  className="w-10 h-10 mb-3 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                <div className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </div>
              </div>
              <input
                id="dropzone-file"
                className="hidden"
                {...getInputProps()}
              />
            </label>
          </div>
          <FilePreview
            file={file}
            onClearClick={() => {
              setFile(undefined);
            }}
          />
          {content && <SimpleTable data={content} />}
          <Button type="submit" onClick={handleClick} isLoading={isLoading}>
            実行する
          </Button>
        </>
      </InputSection>
      {response && <Response response={response} isLoading={isLoading} />}
    </>
  );
}
