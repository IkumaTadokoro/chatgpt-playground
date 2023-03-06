/* eslint-disable react/jsx-props-no-spreading */
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";
import useOpenAI from "../../utils/OpenAI/useOpenAI";
import { Header, Response } from "../../utils/Playground";
import InputSection from "../../utils/Playground/InputSection";
import { Button } from "../../utils/Button/Button";
import { FilePreview } from "../../utils/Form";

export default function WhisperPlayGround() {
  const [file, setFile] = useState<File | undefined>(undefined);
  const [response, setResponse] = useState<string | undefined>("");
  const [isLoading, setLoading] = useState(false);
  const { askWhisper } = useOpenAI();

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const acceptedFile = acceptedFiles[0];
    setResponse(undefined);
    setFile(acceptedFile);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
  });

  const handleClick = async () => {
    try {
      setResponse(undefined);
      setLoading(true);
      if (!file) {
        toast.error("ファイルを選択してください。");
        return;
      }
      setResponse(await askWhisper(file));
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
        title="文字起こしの実験室"
        description="Whisper APIを使って音声を文字起こしした結果を表示します。たぶん"
      />
      <InputSection>
        <>
          <p className="text-sm text-gray-500">
            文字起こししたい音声ファイルをドラッグ&ドロップしてください。
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
          <Button type="submit" onClick={handleClick} isLoading={isLoading}>
            実行する
          </Button>
        </>
      </InputSection>
      <Response response={response} isLoading={isLoading} />
    </>
  );
}
