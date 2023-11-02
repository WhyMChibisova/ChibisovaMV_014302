require "test_helper"

class StudentsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @student = students(:one)
  end

  test "should get index" do
    get students_url
    assert_response :success
  end

  test "should get new" do
    get new_student_url
    assert_response :success
  end

  test "should create student" do
    assert_difference("Student.count") do
      post students_url, params: { student: { account_id: @student.account_id, first_name: @student.first_name, group_number: @student.group_number, last_name: @student.last_name, organization_id: @student.organization_id, patronymic: @student.patronymic, practice_id: @student.practice_id, status: @student.status, teacher_id: @student.teacher_id } }
    end

    assert_redirected_to student_url(Student.last)
  end

  test "should show student" do
    get student_url(@student)
    assert_response :success
  end

  test "should get edit" do
    get edit_student_url(@student)
    assert_response :success
  end

  test "should update student" do
    patch student_url(@student), params: { student: { account_id: @student.account_id, first_name: @student.first_name, group_number: @student.group_number, last_name: @student.last_name, organization_id: @student.organization_id, patronymic: @student.patronymic, practice_id: @student.practice_id, status: @student.status, teacher_id: @student.teacher_id } }
    assert_redirected_to student_url(@student)
  end

  test "should destroy student" do
    assert_difference("Student.count", -1) do
      delete student_url(@student)
    end

    assert_redirected_to students_url
  end
end
