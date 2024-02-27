require "rails_helper"

RSpec.describe "GET Students", type: :request do

  before do
    Student.create(last_name: 'a', first_name: 'a', patronymic: 'a', group_number: '014302')
    Student.create(last_name: 'b', first_name: 'b', patronymic: 'b', group_number: '014302')
    Student.create(last_name: 'c', first_name: 'c', patronymic: 'c', group_number: '014302')
  end

  scenario "Get all students" do
      get "http://localhost:3000/students"
      expect(response).to have_http_status(:success)
      json = JSON.parse(response.body)
      expect(json.length).to eq(3)
  end
end
