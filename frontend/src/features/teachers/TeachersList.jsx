import React, { useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import { fetchAllTeachers } from "../../services/teacherService";

import SearchBar from "../../components/SearchBar";
import useTeachersData from "../../hooks/useTeachersData";
import useURLSearchParam from "../../hooks/useURLSearchParam";

function TeachersList() {
  const [teachers, setTeachers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useURLSearchParam("search");

  const {
    teachers: fetchedTeachers,
    loading,
    error,
  } = useTeachersData(debouncedSearchTerm);

  useEffect(() => {
    if (fetchedTeachers) {
      setTeachers(fetchedTeachers);
    }
  }, [fetchedTeachers]);

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
      <h2 className="title-lg mb">Преподаватели</h2>
      <div className="item-container">
        {teachers.map((teacher) => (
          <div key={teacher.id} className="item mb">
            <h2 className="text-bold">
              <Link to={`/teachers/${teacher.id}`}>
                {teacher.last_name}
              </Link>
            </h2>
            <div className="item-footer">
              <p className="mt-sm">Имя: {teacher.first_name}</p>
              <p className="mt-sm">Отчество: {teacher.patronymic}</p>
            </div>
          </div>
        ))}
      </div>
      <Link to={'/teachers/new'} className="button button-main mt">Добавить преподавателя</Link>
    </div>
  )
}

export default TeachersList
