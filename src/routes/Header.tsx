export default function Header({ siteName }: { siteName: string }) {
  return (
    <div className="fixed top-0 z-50 w-full bg-zinc-800 border-b border-zinc-900 shadow p-3 flex items-center gap-x-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="28"
        viewBox="0 0 24 24"
        className="text-green-600 hover:animate-spin"
      >
        <path
          fill="currentColor"
          d="M22 14h-1c0-3.87-3.13-7-7-7h-1V5.73A2 2 0 1 0 10 4c0 .74.4 1.39 1 1.73V7h-1c-3.87 0-7 3.13-7 7H2c-.55 0-1 .45-1 1v3c0 .55.45 1 1 1h1v1a2 2 0 0 0 2 2h14c1.11 0 2-.89 2-2v-1h1c.55 0 1-.45 1-1v-3c0-.55-.45-1-1-1M9.7 15.45l-.73.73l-1.47 1.47l-2.2-2.2c-.4-.4-.4-1.06 0-1.45c.41-.42 1.06-.42 1.47 0l.73.72l.73-.72c.41-.42 1.06-.42 1.47 0c.4.39.4 1.05 0 1.45m9 0l-.73.73l-1.47 1.47l-2.2-2.2c-.4-.4-.4-1.06 0-1.45c.41-.42 1.06-.42 1.47 0l.73.72l.73-.72c.41-.42 1.06-.42 1.47 0c.4.39.4 1.05 0 1.45Z"
        />
      </svg>
      <h2 className="font-extrabold text-transparent text-2xl bg-clip-text bg-gradient-to-r from-green-600 via-green-500 to-green-300">
        {siteName}
      </h2>
    </div>
  );
}
