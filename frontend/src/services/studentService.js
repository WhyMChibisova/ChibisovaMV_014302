async function fetchAllStudents() {
  const response = await fetch("http://localhost:3000/students");
  if(!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
}

async function fetchStudent(id) {
  const response = await fetch(`http://localhost:3000/students/${id}`, {
    credentials: "include",
  });
  if(!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
}

async function createStudent(studentData) {
  const response = await fetch('http://localhost:3000/students', {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(studentData)
  });
  if(!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
}

async function updateStudent(id, studentData) {
  const response = await fetch(`http://localhost:3000/students/${id}`, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(studentData)
  })
  if(!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
}

async function deleteStudent(id) {
  const response = await fetch(`http://localhost:3000/students/${id}`, {
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

export { createStudent, updateStudent, deleteStudent, fetchStudent, fetchAllStudents };
