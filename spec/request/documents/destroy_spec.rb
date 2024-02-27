require "rails_helper"

RSpec.describe "DELETE Documents", type: :request do

  before do
    @student = Student.create(last_name: 'a', first_name: 'a', patronymic: 'a', group_number: '0143020')
    @documentA = Document.create(mark: 9, comment: 'a', student_id: @student.id)
    @documentB = Document.create(mark: 8, comment: 'b', student_id: @student.id)
  end

    scenario "Delete a document" do
        delete "http://localhost:3000/documents/#{@documentA.id}"
        expect(response).to have_http_status(:no_content)

        get "http://localhost:3000/documents"
        expect(response).to have_http_status(:success)

        json = JSON.parse(response.body)
        expect(json.length).to eq(1)
    end
end
