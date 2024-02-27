require "rails_helper"

RSpec.describe "GET Students", type: :request do

  before do
    Student.create(last_name: 'a', first_name: 'a', patronymic: 'a', group_number: '014302')
    Student.create(last_name: 'a', first_name: 'b', patronymic: 'b', group_number: '014302')
    Student.create(last_name: 'a', first_name: 'c', patronymic: 'c', group_number: '014302')
  end

    scenario "search students" do
        get "http://localhost:3000/search/students/?q=a"

        expect(response).to have_http_status(:success)
        json = JSON.parse(response.body)
        expect(json.length).to eq(3)
    end

    scenario "search no students" do
      get "http://localhost:3000/search/students/?q=rr"

      expect(response).to have_http_status(:success)
      json = JSON.parse(response.body)
      expect(json.length).to eq(0)
    end
end
