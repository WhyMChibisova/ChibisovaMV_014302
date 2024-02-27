require "rails_helper"

RSpec.describe "GET Accounts", type: :request do

  before do
    @accountA = Account.create(email: 'a@gmail.com', password: 'a', role: 'student')
    @accountB = Account.create(email: 'b@gmail.com', password: 'b', role: 'student')
    @accountC = Account.create(email: 'c@gmail.com', password: 'c', role: 'student')
  end

    scenario "gets the first account" do
        get "http://localhost:3000/accounts/#{@accountA.id}"

        expect(response).to have_http_status(:success)
        json = JSON.parse(response.body).deep_symbolize_keys
        expect(json[:account][:email]).to eq('a@gmail.com')
        expect(json[:account][:role]).to eq('student')
    end

    scenario "gets the second account" do
      get "http://localhost:3000/accounts/#{@accountB.id}"

      expect(response).to have_http_status(:success)
      json = JSON.parse(response.body).deep_symbolize_keys
      expect(json[:account][:email]).to eq('b@gmail.com')
      expect(json[:account][:role]).to eq('student')
    end
end
