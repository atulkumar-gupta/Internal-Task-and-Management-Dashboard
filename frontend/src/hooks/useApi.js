import { useEffect, useState } from "react";

export function useApi(fetcher, deps = []) {
  const [state, setState] = useState({ data: null, loading: true, error: "" });
  const reload = async () => {
    setState(s => ({ ...s, loading: true, error: "" }));
    try { setState({ data: await fetcher(), loading: false, error: "" }); }
    catch (e) { setState({ data: null, loading: false, error: e.message }); }
  };
  useEffect(() => { reload(); }, deps);
  return { ...state, reload };
}
