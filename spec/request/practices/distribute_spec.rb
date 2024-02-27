require "rails_helper"

RSpec.describe "GET Practices", type: :request do

  before do
    @user = Account.create(email: 'a@gmail.com', password: 'a', role: 'teacher_report')
    @teacher = Teacher.create(last_name: 'a', first_name: 'a', patronymic: 'a', quantity_of_hours: 1, account_id: @user.id)
    @practice = Practice.create(kind: 'a', duration: 1, hours_per_student: 1, group_number: '014302', start_date: '01.01.2024', end_date: '01.02.2024')
    @studentA = Student.create(last_name: 'a', first_name: 'a', patronymic: 'a', group_number: '014302', status: 'Не прибыл на предприятие', practice_id: @practice.id)
    @studentB = Student.create(last_name: 'b', first_name: 'b', patronymic: 'b', group_number: '014302', status: 'Опоздал на предприятие', practice_id: @practice.id)
    @studentC = Student.create(last_name: 'c', first_name: 'c', patronymic: 'c', group_number: '014302', status: 'Прибыл на предприятие', practice_id: @practice.id)
  end

  scenario "Distribute the load with valid hours" do
      @teacher = Teacher.create(last_name: 'b', first_name: 'b', patronymic: 'b', quantity_of_hours: 10, account_id: @user.id)
      get "http://localhost:3000/practices/distribute"
      expect(response).to have_http_status(:success)
      json = JSON.parse(response.body)
      expect(json["status"]).to eq(200)
  end

  scenario "Distribute the load with invalid hours" do
      get "http://localhost:3000/practices/distribute"
      expect(response).to have_http_status(:success)
      json = JSON.parse(response.body)
      expect(json["status"]).to eq(500)
  end
end
