async function fetchAllTeachers() {
  const response = await fetch("http://localhost:3000/teachers");
  if(!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
}

async function fetchTeacher(id) {
  const response = await fetch(`http://localhost:3000/teachers/${id}`, {
    credentials: "include",
  });
  if(!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
}

async function createTeacher(teacherData) {
  const response = await fetch('http://localhost:3000/teachers', {
    method: "POST",
    credentials: "include",
    body: teacherData
  });
  if(!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
}

async function updateTeacher(id, teacherData) {
  const response = await fetch(`http://localhost:3000/teachers/${id}`, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(teacherData)
  })
  if(!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
}

async function deleteTeacher(id) {
  const response = await fetch(`http://localhost:3000/teachers/${id}`, {
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

export { createTeacher, updateTeacher, deleteTeacher, fetchTeacher, fetchAllTeachers };
