require "rails_helper"

RSpec.describe "GET Accounts", type: :request do

  before do
      Account.create(email: 'a@gmail.com', password: 'a', role: 'student')
      Account.create(email: 'b@gmail.com', password: 'b', role: 'student')
      Account.create(email: 'c@gmail.com', password: 'c', role: 'student')
  end

  scenario "Get all accounts" do
      get "http://localhost:3000/accounts"
      expect(response).to have_http_status(:success)
      json = JSON.parse(response.body)
      expect(json.length).to eq(3)
  end
end
