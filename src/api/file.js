import { MEMBER_URL, TOKEN } from "./config";

export function fileConfig(type) {
  let url, key, multiple;

  switch (type) {
    case 'agreement':
      url = 'agreement-upload'
      key = 'agreement_file'
      multiple = true
      break;
    case 'pdf':
      url = 'pdf-file'
      key = 'pdf_file'
      multiple = true
      break;
    case 'excel':
      url = 'xlsx-file'
      key = 'xlsx_file'
      multiple = false
      break;
    case 'additional':
      url = 'additional-documents'
      key = 'additional_documents'
      multiple = true
      break;
  }

  return {
    url,
    key,
    multiple,
  }
}

export const fileStore = async (type, data) => {

  const { url, key, multiple } = fileConfig(type);

  const body = new FormData();
  if (multiple) {
    data.map(val => body.append(key, val))
  } else {
    body.append(key, data[0]);
  }

  const options = {
    method: 'POST',
    headers: {
      'Authorization': TOKEN(),
    },
    body: body
  };

  const response = await fetch(`${MEMBER_URL}/${url}`, options);

  return await response.json();
}

export const fileDelete = async (type, id) => {

  const { url } = fileConfig(type);

  const response = await fetch(`${MEMBER_URL}/${url}/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': TOKEN(),
    },
  });

  return await response.json();
}