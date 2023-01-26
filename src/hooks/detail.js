import { useEffect, useState } from "react";
import { useAlertContext } from "../contexts/alert";

export function useGetDetail(data) {
  const [detail, setDetail] = useState({ id: null });
  const { setAlert } = useAlertContext();

  useEffect(() => {
    const getDocuments = async () => {
      try {
        const res = await data();

        if (res.success) {
          setDetail(res.data);
        } else {
          setAlert("error", res.message);
        }
      } catch (err) {
        setAlert("error", err.message);
      }
    }

    getDocuments();
  }, []);

  return {
    detail,
  }
}