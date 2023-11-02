async function fetchAccount(id) {
  const response = await fetch(`http://localhost:3000/accounts/${id}`, {
    credentials: "include",
  });
  if(!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
}

async function createAccount(accountData) {
  const response = await fetch('http://localhost:3000/accounts', {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(accountData)
  });
  if(!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
}

async function updateAccount(id, accountData) {
  const response = await fetch(`http://localhost:3000/accounts/${id}`, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(accountData)
  })
  if(!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
}

async function deleteAccount(id) {
  const response = await fetch(`http://localhost:3000/accounts/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
  if(!response.ok) {
    throw new Error(response.statusText);
  }
  if (response.status === 204) {
    return null;
  }
  return response.json();
}

export { createAccount, updateAccount, deleteAccount, fetchAccount };
