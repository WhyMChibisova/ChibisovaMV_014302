require "rails_helper"

RSpec.describe "DELETE Organizations", type: :request do

  before do
    @organizationA = Organization.create(name: 'a', email: 'a@gmail.com', address: 'a', description: 'a')
    @organizationB = Organization.create(name: 'b', email: 'b@gmail.com', address: 'b', description: 'b')
  end

    scenario "Delete an organization" do
        delete "http://localhost:3000/organizations/#{@organizationA.id}"
        expect(response).to have_http_status(:no_content)

        get "http://localhost:3000/organizations"
        expect(response).to have_http_status(:success)

        json = JSON.parse(response.body)
        expect(json.length).to eq(1)
    end
end
