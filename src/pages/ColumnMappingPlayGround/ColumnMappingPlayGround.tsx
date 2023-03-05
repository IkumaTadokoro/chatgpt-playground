/* eslint-disable react/jsx-props-no-spreading */
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { parse } from "csv-parse/browser/esm/sync";
import { Button } from "../../utils/Button/Button";
import { Header, Response, SimpleTable } from "../../utils/Playground";
import FilePreview from "../../utils/Form/FilePreview";
import InputSection from "../../utils/Playground/InputSection";
import { readFileAsText } from "../../utils/Form";
import useChatGpt from "../../utils/ChatGpt/useChatGpt";

export default function ColumnMappingPlayGround() {
  const [input, setInput] = useState("");
  const [file, setFile] = useState<File | undefined>(undefined);
  const [content, setContent] = useState<string[][] | undefined>(undefined);
  const [response, setResponse] = useState("");
  const [isLoading, setLoading] = useState(false);
  const { askChatGpt } = useChatGpt();

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const acceptedFile = acceptedFiles[0];
    const newContent = await readFileAsText(acceptedFile);
    const csvData: string[][] = parse(newContent, { columns: false });
    setContent(csvData);
    setFile(acceptedFile);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "text/csv": [".csv"] },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleClick = async () => {
    try {
      setLoading(true);
      const fileContent = await readFileAsText(file as File);
      const messages = [
        {
          role: "system",
          content: `出力は以下の形式で返してください。
        ## 推測した内容
    
        ### <推測対象の内容>
    
        - <推測対象のカラム1>
        - <推測対象のカラム2>
        - ...
        `,
        },
        {
          role: "user",
          content: `以下に渡すCSVのデータを読み取って、その中から${input}にそれぞれ合致する列を推測し、教えてください。複数ある場合は該当するすべての列を返してください。
          ${fileContent}
          `,
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
        title="CSVカラム補完の実験室"
        description="与えられたCSVのカラムから、指定した内容に合致する列を推測します。"
      />
      <InputSection>
        <>
          <p className="text-sm text-zinc-400">
            1. 推測させたいカラム名をカンマ区切りで入力してください。
          </p>
          <input
            id="message"
            onChange={handleChange}
            value={input}
            className="block p-2.5 w-full font-medium text-sm text-zinc-400 border border-zinc-600 rounded-lg focus:ring-zinc-600 focus:border-zinc-600 bg-zinc-700"
            placeholder="例: 費目、利用者名"
          />
          <p className="text-sm text-zinc-400">
            2. カラムを推測したいCSVファイルをドラッグ&ドロップしてください。
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
              setContent(undefined);
            }}
          />
          {content && <SimpleTable data={content} />}
          <Button type="submit" onClick={handleClick} isLoading={isLoading}>
            実行する
          </Button>
        </>
      </InputSection>
      <Response response={response} isLoading={isLoading} />
    </>
  );
}
