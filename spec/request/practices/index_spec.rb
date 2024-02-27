require "rails_helper"

RSpec.describe "GET Practices", type: :request do

  before do
    Student.create(last_name: 'a', first_name: 'a', patronymic: 'a', group_number: '014302')
    Practice.create(kind: 'a', duration: 1, hours_per_student: 1, group_number: '014302', start_date: '01.01.2024', end_date: '01.02.2024')
    Practice.create(kind: 'b', duration: 1, hours_per_student: 1, group_number: '014302', start_date: '01.01.2024', end_date: '01.02.2024')
    Practice.create(kind: 'c', duration: 1, hours_per_student: 1, group_number: '014302', start_date: '01.01.2024', end_date: '01.02.2024')
  end

  scenario "Get all practices" do
      get "http://localhost:3000/practices"
      expect(response).to have_http_status(:success)
      json = JSON.parse(response.body)
      expect(json["practices"].length).to eq(3)
      expect(json["groups"]).to eq(['014302'])
  end
end
