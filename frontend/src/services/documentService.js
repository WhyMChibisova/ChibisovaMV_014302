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
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(documentData)
  });
  if(!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
}

async function updateDocument(id, documentData) {
  const response = await fetch(`http://localhost:3000/documents/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(documentData)
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

export { createDocument, updateDocument, deleteDocument,  fetchAllDocuments, fetchDocument };
