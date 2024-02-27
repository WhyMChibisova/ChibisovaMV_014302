require "rails_helper"

RSpec.describe "GET Documents", type: :request do

  before do
    @student = Student.create(last_name: 'a', first_name: 'a', patronymic: 'a', group_number: '0143020')
    Document.create(mark: 9, comment: 'a', student_id: @student.id)
    Document.create(mark: 8, comment: 'b', student_id: @student.id)
    Document.create(mark: 7, comment: 'c', student_id: @student.id)
  end

  scenario "Get all documents" do
      get "http://localhost:3000/documents"
      expect(response).to have_http_status(:success)
      json = JSON.parse(response.body)
      expect(json.length).to eq(3)
  end
end
