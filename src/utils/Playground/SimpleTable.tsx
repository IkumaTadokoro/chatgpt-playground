export default function SimpleTable({ data }: { data: string[][] }) {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg max-h-[40rem]">
      <table className="w-full text-sm text-left text-gray-400 table-fixed">
        <thead className="text-xs uppercase  bg-gray-800 text-gray-400">
          <tr>
            {data[0].map((row, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <th key={i} scope="col" className="px-6 py-3">
                {row}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.slice(1).map((row, i) => (
            <tr
              // eslint-disable-next-line react/no-array-index-key
              key={i}
              className="border-b bg-zinc-700 border-zinc-600 hover:bg-zinc-600 text-xs"
            >
              {row.map((col, j) => (
                // eslint-disable-next-line react/no-array-index-key
                <td key={j} className="px-6 py-2">
                  {col}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
