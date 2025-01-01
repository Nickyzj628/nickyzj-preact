import { toast } from "@/components/Toaster";
import { request } from "@/utils/network";
import { Inputs, useCallback, useEffect, useState } from "preact/hooks";

type Options = {
  reloadDeps?: Inputs;
};

const cache = new Map();

/** 封装`/utils/request`，一边使用旧数据，一边请求新数据 */
export const useRequest = <T>(
  path: string,
  options: Options = {},
) => {
  const {
    reloadDeps = [],
  } = options;

  const [data, setData] = useState<T | null>(cache.get(path) ?? null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(!data);

  const reload = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await request<T>(path);
      setData(response);
      cache.set(path, response);
    }
    catch (err) {
      if (err instanceof Error) setError(err);
      else setError(new Error("Unknown error when fetch data using SWR"));
    }
    finally {
      setLoading(false);
    }
  }, []);

  // 根据依赖项发送请求
  useEffect(() => {
    reload();
  }, [...reloadDeps]);

  // 报错处理
  useEffect(() => {
    if (!error) return;
    toast.error(error.message);
  }, [error]);

  return { data, error, loading, reload };
};