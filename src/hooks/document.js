import { documentDelete } from "../api/document";
import { useAlertContext } from "../contexts/alert";

export function useDocumentAction() {
  const alertContext = useAlertContext();

  const deleteHandler = async (id) => {
    try {
      const res = await documentDelete(id);

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