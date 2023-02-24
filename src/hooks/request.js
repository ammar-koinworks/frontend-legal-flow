import { requestDelete } from "../api/request";
import { useAlertContext } from "../contexts/alert";

export function useRequestAction() {
  const alertContext = useAlertContext();

  const deleteHandler = async (id) => {
    try {
      const res = await requestDelete(id);

      if (res.success) {
        alertContext.setAlert("success", res.message);
      } else {
        alertContext.setAlert("error", res.message);
      }

    } catch (err) {
      alertContext.setAlert("error", err.message);
    }
  };

  return {
    deleteHandler,
  }
}