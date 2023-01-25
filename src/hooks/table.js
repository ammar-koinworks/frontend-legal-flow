import { useEffect, useState } from "react";
import { useAlertContext } from "../contexts/alert";

export function useGetDatasTable(query, data) {
  const [datas, setDatas] = useState([]);
  const [totalDatas, setTotalDatas] = useState(0);
  const { setAlert } = useAlertContext();

  useEffect(() => {
    const getDocuments = async () => {
      try {
        const res = await data;

        if (res.success) {
          setDatas(res.data);
          setTotalDatas(res.count);
        } else {
          setAlert("error", res.message);
        }
      } catch (err) {
        setAlert("error", err.message);
      }
    }

    getDocuments();
  }, [query]);

  return {
    datas,
    totalDatas,
  }
}