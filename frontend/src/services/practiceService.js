async function fetchAllPractices() {
  const response = await fetch("http://localhost:3000/practices");
  if(!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
}

async function fetchPractice(id) {
  const response = await fetch(`http://localhost:3000/practices/${id}`);
  if(!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
}

async function createPractice(practiceData) {
  const response = await fetch('http://localhost:3000/practices', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(practiceData)
  });
  if(!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
}

async function updatePractice(id, practiceData) {
  const response = await fetch(`http://localhost:3000/practices/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(practiceData)
  })
  if(!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
}

async function deletePractice(id) {
  const response = await fetch(`http://localhost:3000/practices/${id}`, {
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

export { createPractice, updatePractice, deletePractice,  fetchAllPractices, fetchPractice };
