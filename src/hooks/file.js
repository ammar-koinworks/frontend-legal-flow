import { useCallback, useEffect, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import { fileConfig, fileDelete, fileStore } from "../api/file";
import { useAlertContext } from "../contexts/alert";
import { dropZone } from "../styles/_dropzone";

export function useFile(name, data = null) {
  const [file, setFile] = useState([]);
  const [loading, setLoading] = useState(false);
  const { multiple } = fileConfig(name);
  const alertContext = useAlertContext();

  useEffect(() => {
    const localFile = localStorage.getItem(name);

    if (data !== null) {
      multiple ? setFile(data) : setFile([data]);
    } else if (localFile) {
      setFile(JSON.parse(localFile));
    }
  }, [])

  const onDrop = useCallback(acceptedFiles => {
    const storeFile = async () => {
      try {
        setLoading(true);

        const res = await fileStore(name, acceptedFiles)

        setLoading(false);

        if (res.success) {
          setFile(multiple ? res.data : [res.data])
          localStorage.setItem(name, JSON.stringify(res.data))
        } else {
          alertContext.setAlert("error", res.message);
        }
      } catch (err) {
        setLoading(false);
        alertContext.setAlert("error", err.message);
      }
    }

    storeFile();
  }, [])

  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
  } = useDropzone({ onDrop, multiple });

  const style = useMemo(() => ({
    ...dropZone.baseStyle,
    ...(isFocused ? dropZone.focusedStyle : {}),
    ...(isDragAccept ? dropZone.acceptStyle : {}),
    ...(isDragReject ? dropZone.rejectStyle : {})
  }), [
    isFocused,
    isDragAccept,
    isDragReject
  ]);

  async function delFileHandler(id) {
    // update state & local
    if (multiple) {
      const newFiles = file.filter((data) => data.id !== id)
      setFile(newFiles)
      localStorage.setItem(name, JSON.stringify(newFiles))
    } else {
      setFile(null)
      localStorage.removeItem(name)
    }

    const res = await fileDelete(name, id)
    if (res.success) {
      alertContext.setAlert("success", res.message);
    }
  }

  function validateFile() {
    let id = null;

    if (multiple) {
      id = file.map((val) => val.id);
      if (id.length !== 0) return id;
    } else {
      id = file[0].id;
      if (id[0]?.id) return id;
    }

    return null;
  }

  return {
    getRootProps,
    getInputProps,
    style,
    delFileHandler,
    file,
    setFile,
    loading,
    name,
    validateFile,
  };
}