import { LeftIcon, SearchIcon } from "@/assets/icons";
import { capitalize } from "@/utils/string";
import { ComponentChildren } from "preact";
import { useEffect, useState } from "preact/hooks";
import Loading from "./Loading";

type Props = {
  title?: string;
  dataKey?: string;
  request?: (params: Recordable) => Promise<Recordable>;
  postData?: (data: Recordable) => Recordable;
  actions?: (item: Recordable, fetcher: () => Promise<void>) => ComponentChildren[];
}

const Table = ({ title, request, postData, dataKey, actions }: Props) => {
  const [response, setResponse] = useState<Recordable>();
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");

  const fetcher = async (_page?: number) => {
    if (!request || !dataKey) return;
    const nextResponse = await request({
      page: _page ?? page,
      keyword
    });
    const processedData = postData ? postData(nextResponse[dataKey]) : nextResponse[dataKey];
    setResponse({ ...nextResponse, [dataKey]: processedData });
    setPage(nextResponse.page);
  };

  useEffect(() => {
    fetcher();
  }, [page, keyword]);

  if (!response) return <Loading className="static min-h-96 border rounded-xl transition dark:border-zinc-700" />;

  return (
    <div className="flex flex-col border rounded-xl transition dark:border-zinc-700">
      <div className="flex items-center justify-between p-3">
        <h4 className="text-zinc-800 dark:text-zinc-100">{title || "未命名表格"}</h4>
        <div className="relative">
          <SearchIcon className="absolute top-0 bottom-0 left-2.5 my-auto size-4 text-zinc-600 pointer-events-none transition dark:text-zinc-300" />
          <input
            type="text"
            className="pl-8 rounded-lg border-zinc-200 text-sm transition placeholder:transition dark:border-zinc-700 dark:bg-zinc-700 dark:text-white dark:placeholder:text-zinc-200"
            placeholder="搜索关键词..."
            onKeyPress={(e) => e.key === "Enter" && setKeyword(e.currentTarget.value)}
          />
        </div>
      </div>

      {response && dataKey && response[dataKey] && (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="border-y bg-zinc-50 transition dark:border-zinc-700 dark:bg-zinc-700">
                <tr>
                  {Object.keys(response[dataKey][0] ?? {}).map((key) => (
                    <th key={key} className="p-3 font-medium text-start text-sm text-zinc-500 transition dark:text-zinc-400">
                      {capitalize(key)}
                    </th>
                  ))}
                  {actions?.length && (
                    <th className="p-3 font-medium text-start text-sm text-zinc-500 transition dark:text-zinc-400">Actions</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {response[dataKey].map((item: Recordable) => (
                  <tr key={item.id} className="border-b transition hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-800">
                    {Object.values(item).map((value, i) => (
                      <td key={`${item.id}.${i}`} className="px-3 py-2 text-zinc-800 whitespace-nowrap transition dark:text-zinc-200">
                        {value ?? "-"}
                      </td>
                    ))}
                    {actions && (
                      <td className="flex gap-1.5 py-2 pr-3">{actions(item, () => fetcher(1))}</td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between gap-1.5 p-3">
            <span className="text-sm text-zinc-400 tracking-wider transition dark:text-zinc-500">
              第{page}/{response.pages}页
            </span>
            <div className="flex gap-1.5">
              <button disabled={page === 1} onClick={() => setPage(page - 1)}>
                <LeftIcon className="size-5" />
              </button>
              <button disabled={page === response.pages} onClick={() => setPage(page + 1)}>
                <LeftIcon className="size-5 rotate-180" />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
};

export default Table;