import { opinionDelete, opinionFinish } from "../api/opinion";
import { useAlertContext } from "../contexts/alert";

export function useOpinionAction() {
  const alertContext = useAlertContext();

  const deleteHandler = async (id) => {
    try {
      const res = await opinionDelete(id);

      if (res.success) {
        alertContext.setAlert("success", res.message);
      } else {
        alertContext.setAlert("error", res.message);
      }

    } catch (err) {
      alertContext.setAlert("error", err.message);
    }
  };

  const finishHandler = async (id) => {
    try {
      const res = await opinionFinish(id);

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
    finishHandler,
  }
}