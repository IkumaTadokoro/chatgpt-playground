import { useNavigate, useLocation } from "react-router-dom";
import clsx from "clsx";

type Menu = {
  name: string;
  path: string;
};

export default function Navigation() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const menus: Menu[] = [
    { name: "文章補完", path: "/complete-sentence" },
    { name: "CSVのカラム補完", path: "/column-mapping" },
    { name: "CSVの縦横変換", path: "/transform-csv" },
    { name: "文字起こし", path: "/whisper" },
    { name: "文字起こしして要約", path: "/whisper-with-summary" },
  ];

  return (
    <nav>
      <ul className="flex flex-col gap-y-2 font-semibold">
        {menus.map((menu) => (
          <li key={menu.path}>
            <button
              type="button"
              onClick={() => navigate(menu.path)}
              className={clsx(
                "flex items-center text-zinc-400 rounded-md text-sm hover:bg-zinc-700 px-4 py-2 w-full",
                pathname === menu.path && "bg-zinc-700"
              )}
            >
              {menu.name}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
