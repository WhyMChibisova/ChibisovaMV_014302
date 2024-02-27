require "rails_helper"

RSpec.describe "DELETE Students", type: :request do

  before do
    @studentA = Student.create(last_name: 'a', first_name: 'a', patronymic: 'a', group_number: '014302')
    @studentB = Student.create(last_name: 'b', first_name: 'b', patronymic: 'b', group_number: '014302')
  end

    scenario "Delete a student" do
        delete "http://localhost:3000/students/#{@studentA.id}"
        expect(response).to have_http_status(:no_content)

        get "http://localhost:3000/students"
        expect(response).to have_http_status(:success)

        json = JSON.parse(response.body)
        expect(json.length).to eq(1)
    end
end
