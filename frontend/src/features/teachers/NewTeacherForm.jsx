import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createAccount } from "../../services/accountService";
import { createTeacher } from "../../services/teacherService";
import TeacherForm from "./TeacherForm";

function NewTeacherForm() {
  const navigate = useNavigate();

  const handleCreateSubmit = async (formData, teacherData) => {
    const accountData = new FormData();

    accountData.append("account[email]", formData.account.email);
    accountData.append("account[password]", formData.account.password);
    accountData.append("account[password_confirmation]", formData.account.password_confirmation);
    accountData.append("account[role]", "teacher");
    accountData.append("account[photo]", formData.account.photo);

    const teacherFormData = new FormData();

    teacherFormData.append("teacher[last_name]", teacherData.teacher.last_name);
    teacherFormData.append("teacher[first_name]", teacherData.teacher.first_name);
    teacherFormData.append("teacher[patronymic]", teacherData.teacher.patronymic);
    teacherFormData.append("teacher[quantity_of_hours]", teacherData.teacher.quantity_of_hours);

    try {
      const response = await createAccount(accountData);
      teacherFormData.append("teacher[account_id]", response.id);
      const response2 = await createTeacher(teacherFormData);
      navigate("/teachers");
    } catch (e) {
      console.error("An error occured: ", e);
    }
  };

  return (
    <TeacherForm
      headerText="Добавление преподавателя"
      onSubmit={handleCreateSubmit}
      buttonText="Добавить" />
  );
}

export default NewTeacherForm;
