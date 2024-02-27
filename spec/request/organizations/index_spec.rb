require "rails_helper"

RSpec.describe "GET Organizations", type: :request do

  before do
      Organization.create(name: 'a', email: 'a@gmail.com', address: 'a', description: 'a')
      Organization.create(name: 'b', email: 'b@gmail.com', address: 'b', description: 'b')
      Organization.create(name: 'c', email: 'c@gmail.com', address: 'c', description: 'c')
  end

  scenario "Get all organizations" do
      get "http://localhost:3000/organizations"
      expect(response).to have_http_status(:success)
      json = JSON.parse(response.body)
      expect(json.length).to eq(3)
  end
end
