import React, { useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import { fetchAllStudents } from "../../services/studentService";

import SearchBar from "../../components/SearchBar";
import useStudentsData from "../../hooks/useStudentsData";
import useURLSearchParam from "../../hooks/useURLSearchParam";

function StudentsList() {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useURLSearchParam("search");

  const {
    students: fetchedStudents,
    loading,
    error,
  } = useStudentsData(debouncedSearchTerm);

  useEffect(() => {
    if (fetchedStudents) {
      setStudents(fetchedStudents);
    }
  }, [fetchedStudents]);

  const handleImmediateSearchChange = (searchValue) => {
    setSearchTerm(searchValue);
  };

  const handleDebouncedSearchChange = (searchValue) => {
    setDebouncedSearchTerm(searchValue);
  };

  return (
    <div className="container">
      <SearchBar
        value={searchTerm}
        onSearchChange={handleDebouncedSearchChange}
        onImmediateChange={handleImmediateSearchChange}
      />
      <h2 className="title-lg mb">Студенты</h2>
      <div className="item-container">
        {students.map((student) => (
          <div key={student.id} className="item mb">
            <h2 className="text-bold">
              <Link to={`/students/${student.id}`}>
                {student.last_name}
              </Link>
            </h2>
            <div className="item-footer">
              <p className="mt-sm">Имя: {student.first_name}</p>
              <p className="mt-sm">Отчество: {student.patronymic}</p>
              <p className="mt-sm">Номер группы: {student.group_number}</p>
              <p className="mt-sm">Статус: {student.status}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default StudentsList
