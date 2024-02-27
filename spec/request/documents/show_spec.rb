require "rails_helper"

RSpec.describe "GET Documents", type: :request do

  before do
    @student = Student.create(last_name: 'a', first_name: 'a', patronymic: 'a', group_number: '0143020')
    @documentA = Document.create(mark: 9, comment: 'a', student_id: @student.id)
    @documentB = Document.create(mark: 8, comment: 'b', student_id: @student.id)
    @documentC = Document.create(mark: 7, comment: 'c', student_id: @student.id)
  end

    scenario "gets the first document" do
        get "http://localhost:3000/documents/#{@documentA.id}"

        expect(response).to have_http_status(:success)
        json = JSON.parse(response.body)
        expect(json["document"]["mark"]).to eq(9)
        expect(json["document"]["comment"]).to eq('a')
    end

    scenario "gets the second document" do
      get "http://localhost:3000/documents/#{@documentB.id}"

      expect(response).to have_http_status(:success)
      json = JSON.parse(response.body)
      expect(json["document"]["mark"]).to eq(8)
      expect(json["document"]["comment"]).to eq('b')
    end
end
