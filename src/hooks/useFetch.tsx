import axios from "axios";
import { useEffect, useState } from "react";
function useFetch(url: string) {
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const base_url = process.env.REACT_APP_API_URL;
  const token = process.env.REACT_APP_ACCESS_TOKEN;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(base_url + url, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        setData(response.data);
        setError(null);
      } catch (err: any) {
        setError(err?.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, token]);

  return { data, loading, error };
}

export default useFetch;
