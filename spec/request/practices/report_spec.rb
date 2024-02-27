require "rails_helper"

RSpec.describe "GET Practices", type: :request do

  before do
    @user = Account.create(email: 'a@gmail.com', password: 'a')
    @teacher = Teacher.create(last_name: 'a', first_name: 'a', patronymic: 'a', quantity_of_hours: 1, account_id: @user.id)
    @organization = Organization.create(name: 'a', email: 'a@gmail.com', address: 'a', description: 'a')
    @practice = Practice.create(kind: 'a', duration: 1, hours_per_student: 1, group_number: '014302', start_date: '01.01.2024', end_date: '01.02.2024')
    @studentA = Student.create(last_name: 'a', first_name: 'a', patronymic: 'a', group_number: '014302', status: 'Не прибыл на предприятие', practice_id: @practice.id, organization_id: @organization.id)
    @studentB = Student.create(last_name: 'b', first_name: 'b', patronymic: 'b', group_number: '014302', status: 'Опоздал на предприятие', practice_id: @practice.id, organization_id: @organization.id)
    @studentC = Student.create(last_name: 'c', first_name: 'c', patronymic: 'c', group_number: '014302', status: 'Прибыл на предприятие', practice_id: @practice.id, organization_id: @organization.id)
  end

  scenario "Get report" do
      get "http://localhost:3000/practices/report/?id=#{@practice.id}&user_id=#{@user.id}"
      expect(response).to have_http_status(:success)
  end
end
