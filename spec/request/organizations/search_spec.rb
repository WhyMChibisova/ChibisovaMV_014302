require "rails_helper"

RSpec.describe "GET Organizations", type: :request do

  before do
    Organization.create(name: 'a', email: 'a@gmail.com', address: 'a', description: 'a')
    Organization.create(name: 'a', email: 'b@gmail.com', address: 'b', description: 'b')
    Organization.create(name: 'a', email: 'c@gmail.com', address: 'c', description: 'c')
  end

    scenario "search organizations" do
        get "http://localhost:3000/search/organizations/?q=a"

        expect(response).to have_http_status(:success)
        json = JSON.parse(response.body)
        expect(json.length).to eq(3)
    end

    scenario "search no organization" do
      get "http://localhost:3000/search/organizations/?q=rr"

      expect(response).to have_http_status(:success)
      json = JSON.parse(response.body)
      expect(json.length).to eq(0)
    end
end
