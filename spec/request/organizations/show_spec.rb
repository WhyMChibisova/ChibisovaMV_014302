require "rails_helper"

RSpec.describe "GET Organizations", type: :request do

  before do
    @organizationA = Organization.create(name: 'a', email: 'a@gmail.com', address: 'a', description: 'a')
    @organizationB = Organization.create(name: 'b', email: 'b@gmail.com', address: 'b', description: 'b')
    @organizationC = Organization.create(name: 'c', email: 'c@gmail.com', address: 'c', description: 'c')
  end

    scenario "gets the first organization" do
        get "http://localhost:3000/organizations/#{@organizationA.id}"

        expect(response).to have_http_status(:success)
        json = JSON.parse(response.body).deep_symbolize_keys
        expect(json[:name]).to eq('a')
        expect(json[:email]).to eq('a@gmail.com')
        expect(json[:address]).to eq('a')
        expect(json[:description]).to eq('a')
    end

    scenario "gets the second organization" do
      get "http://localhost:3000/organizations/#{@organizationB.id}"

      expect(response).to have_http_status(:success)
      json = JSON.parse(response.body).deep_symbolize_keys
      expect(json[:name]).to eq('b')
      expect(json[:email]).to eq('b@gmail.com')
      expect(json[:address]).to eq('b')
      expect(json[:description]).to eq('b')
    end
end
