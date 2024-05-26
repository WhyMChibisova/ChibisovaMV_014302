async function fetchAllDocuments() {
  const response = await fetch("http://localhost:3000/documents");
  if(!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
}

async function fetchDocument(id) {
  const response = await fetch(`http://localhost:3000/documents/${id}`);
  if(!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
}

async function createDocument(documentData) {
  const response = await fetch('http://localhost:3000/documents', {
    method: "POST",
    body: documentData
  });
  if(!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
}

async function updateDocument(id, documentData, user_id) {
  const response = await fetch(`http://localhost:3000/documents/${id}?user_id=${user_id}`, {
    method: "PUT",
    body: documentData
  })
  if(!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
}

async function deleteDocument(id) {
  const response = await fetch(`http://localhost:3000/documents/${id}`, {
    method: "DELETE",
  });
  if(!response.ok) {
    throw new Error(response.statusText);
  }
  if (response.status === 204) {
    return null;
  }
  return response.json();
}

async function searchDocuments(query) {
  const response = await fetch(`http://localhost:3000/search/documents/?q=${query}`);
  if(!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
}

export { createDocument, updateDocument, deleteDocument,  fetchAllDocuments, fetchDocument, searchDocuments };
