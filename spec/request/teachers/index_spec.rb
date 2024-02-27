require "rails_helper"

RSpec.describe "GET Teachers", type: :request do

  before do
    @user = Account.create(email: 'a@gmail.com', password: 'a')
    Teacher.create(last_name: 'a', first_name: 'a', patronymic: 'a', quantity_of_hours: 1, account_id: @user.id)
    Teacher.create(last_name: 'b', first_name: 'b', patronymic: 'b', quantity_of_hours: 2, account_id: @user.id)
    Teacher.create(last_name: 'c', first_name: 'c', patronymic: 'c', quantity_of_hours: 3, account_id: @user.id)
  end

  scenario "Get all teachers" do
      get "http://localhost:3000/teachers"
      expect(response).to have_http_status(:success)
      json = JSON.parse(response.body)
      expect(json.length).to eq(3)
  end
end
