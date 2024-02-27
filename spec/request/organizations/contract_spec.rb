require "rails_helper"

RSpec.describe "GET Contract Organizations", type: :request do

  before do
    @user = Account.create(email: 'a@gmail.com', password: 'a', role: "student")
    @practice = Practice.create(kind: 'a', duration: 1, hours_per_student: 1, group_number: '014302', start_date: '01.01.2024', end_date: '01.02.2024')
    @student = Student.new(last_name: 'a', first_name: 'a', patronymic: 'a', group_number: '0143020')
    @student.account_id = @user.id
    @student.practice_id = @practice.id
    @student.save
    @organization = Organization.create(name: 'a', email: 'a@gmail.com', address: 'a', description: 'a')
  end

  scenario "generate contract" do
      get "http://localhost:3000/organizations/contract/?id=#{@organization.id}&user_id=#{@user.id}"
      expect(response).to have_http_status(:success)

  end
end
