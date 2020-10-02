import { useEffect, useState } from "react";

export class Api {
  baseURL: string;
  defaultOptions: RequestInit;
  constructor(baseURL: string, defaultOptions: RequestInit = {}) {
    this.baseURL = baseURL;
    this.defaultOptions = defaultOptions;
  }
  call<T>(path: string, request: RequestInit = {}): Promise<T> {
    return fetch(this.baseURL + path, {
      ...this.defaultOptions,
      ...request,
    }).then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    });
  }
}

export const useAsync = <T>(
  asyncMehtod: () => Promise<T>
): { loading: boolean; data: T | null; error: Error | null } => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  useEffect(() => {
    setLoading(true);
    asyncMehtod()
      .then(setData)
      .catch(setError)
      .then(() => setLoading(false));
  }, [asyncMehtod]);
  return {
    loading,
    data,
    error,
  };
};
