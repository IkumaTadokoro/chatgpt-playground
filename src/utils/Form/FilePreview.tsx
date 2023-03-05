export default function FilePreview({
  file,
  onClearClick,
}: {
  file: File | undefined;
  onClearClick: () => void;
}) {
  if (!file) return null;

  return (
    <div className="flex items-center w-full p-4 text-zinc-400 bg-zinc-700 rounded-lg shadow">
      <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-600 bg-zinc-600 rounded-lg">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11zM8 15.01l1.41 1.41L11 14.84V19h2v-4.16l1.59 1.59L16 15.01L12.01 11z"
          />
        </svg>
      </div>
      <div className="ml-3 text-sm font-normal">
        {file.name}
        <div className="text-xs text-zinc-400">{file.size} KB</div>
      </div>
      <button
        type="button"
        className="ml-auto -mx-1.5 -my-1.5 bg-zinc-600 text-gray-400 hover:text-zinc-400 rounded-lg focus:ring-2 focus:ring-zinc-600 p-1.5 hover:opacity-50 inline-flex h-8 w-8"
        onClick={onClearClick}
        aria-label="Close"
      >
        <svg
          aria-hidden="true"
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
}
