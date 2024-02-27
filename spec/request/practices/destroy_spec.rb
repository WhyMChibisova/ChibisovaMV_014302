require "rails_helper"

RSpec.describe "DELETE Practices", type: :request do

  before do
    @practiceA = Practice.create(kind: 'a', duration: 1, hours_per_student: 1, group_number: '014302', start_date: '2024-01-01', end_date: '2024-02-01')
    @practiceB = Practice.create(kind: 'b', duration: 1, hours_per_student: 1, group_number: '014302', start_date: '2024-01-01', end_date: '2024-02-01')
  end

    scenario "Delete a practice" do
        delete "http://localhost:3000/practices/#{@practiceA.id}"
        expect(response).to have_http_status(:no_content)

        get "http://localhost:3000/practices"
        expect(response).to have_http_status(:success)

        json = JSON.parse(response.body)
        expect(json["practices"].length).to eq(1)
    end
end
