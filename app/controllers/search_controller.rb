class SearchController < ApplicationController
  def organizations
    @organizations = Organization.where('name LIKE ? OR address LIKE ? OR description LIKE ?', "%#{params[:q]}%", "%#{params[:q]}%", "%#{params[:q]}%")

    render json: @organizations
  end

  def students
    @students = Student.where('last_name LIKE ? OR first_name LIKE ? OR patronymic LIKE ? OR status LIKE ?', "%#{params[:q]}%", "%#{params[:q]}%", "%#{params[:q]}%", "%#{params[:q]}%")

    render json: @students
  end

  def teachers
    @teachers = Teacher.where('last_name LIKE ? OR first_name LIKE ? OR patronymic LIKE ?', "%#{params[:q]}%", "%#{params[:q]}%", "%#{params[:q]}%")

    render json: @teachers
  end

  def documents
    @documents = Document.joins(:student).where('students.last_name LIKE ?', "%#{params[:q]}%")
    documents_with_student = @documents.map do |document|
      document.as_json.merge(student: document.student)
    end

    render json: documents_with_student
  end
end
