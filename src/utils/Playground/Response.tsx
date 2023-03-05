import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import clsx from "clsx";
import { Spinner } from "../Spinner";

type ResponseProps = {
  response: string;
  isLoading: boolean;
};

export default function Response({ response, isLoading }: ResponseProps) {
  return (
    <section className="mt-8">
      <h3 className="font-bold text-zinc-300 mb-4">レスポンス</h3>
      <div
        className={clsx(
          "bg-zinc-700 p-4 rounded-md shadow text-sm border border-zinc-600 relative",
          isLoading && "opacity-50"
        )}
      >
        {response ? (
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            className="prose-sm prose-li:list-disc prose-h2:font-bold prose-h3:font-semibold prose-thead:bg-gray-800 prose-thead:align-middle prose-table:w-full prose-table:border-collapse prose-tr:py-4 prose-li:text-zinc-300 prose-p:text-zinc-300 prose-headings:text-zinc-300 prose-tr:text-zinc-400"
          >
            {response}
          </ReactMarkdown>
        ) : (
          <p className="text-zinc-400">
            結果がありません。必要な値を入力して「実行する」を押してください。
          </p>
        )}
        {isLoading && (
          <div
            role="status"
            className="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2"
          >
            <Spinner />
          </div>
        )}
      </div>
    </section>
  );
}
