require "rails_helper"

RSpec.describe "GET Teachers", type: :request do

  before do
    @account = Account.create(email: 'a@gmail.com', password: 'a', role: "teacher")
    Teacher.create(last_name: 'a', first_name: 'a', patronymic: 'a', quantity_of_hours: 1, account_id: @account.id)
    Teacher.create(last_name: 'a', first_name: 'b', patronymic: 'b', quantity_of_hours: 2, account_id: @account.id)
    Teacher.create(last_name: 'a', first_name: 'c', patronymic: 'c', quantity_of_hours: 3, account_id: @account.id)
  end

    scenario "search teachers" do
        get "http://localhost:3000/search/teachers/?q=a"

        expect(response).to have_http_status(:success)
        json = JSON.parse(response.body)
        expect(json.length).to eq(3)
    end

    scenario "search no teachers" do
      get "http://localhost:3000/search/teachers/?q=rr"

      expect(response).to have_http_status(:success)
      json = JSON.parse(response.body)
      expect(json.length).to eq(0)
    end
end
