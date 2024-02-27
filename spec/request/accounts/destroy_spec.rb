require "rails_helper"

RSpec.describe "DELETE Accounts", type: :request do

  before do
    @accountA = Account.create(email: 'a@gmail.com', password: 'a', role: 'student')
    @accountB = Account.create(email: 'b@gmail.com', password: 'b', role: 'student')
  end

    scenario "Delete an account" do
        delete "http://localhost:3000/accounts/#{@accountA.id}"
        expect(response).to have_http_status(:no_content)

        get "http://localhost:3000/accounts"
        expect(response).to have_http_status(:success)

        json = JSON.parse(response.body)
        expect(json.length).to eq(1)
    end
end
