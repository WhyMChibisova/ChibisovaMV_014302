require "rails_helper"

RSpec.describe "GET Students", type: :request do

  before do
    @studentA = Student.create(last_name: 'a', first_name: 'a', patronymic: 'a', group_number: '014302')
    @studentB = Student.create(last_name: 'b', first_name: 'b', patronymic: 'b', group_number: '014302')
    @studentC = Student.create(last_name: 'c', first_name: 'c', patronymic: 'c', group_number: '014302')
  end

    scenario "gets the first student" do
        get "http://localhost:3000/students/#{@studentA.id}"

        expect(response).to have_http_status(:success)
        json = JSON.parse(response.body).deep_symbolize_keys
        expect(json[:last_name]).to eq('a')
        expect(json[:first_name]).to eq('a')
        expect(json[:patronymic]).to eq('a')
        expect(json[:group_number]).to eq('014302')
    end

    scenario "gets the second student" do
      get "http://localhost:3000/students/#{@studentB.id}"

      expect(response).to have_http_status(:success)
      json = JSON.parse(response.body).deep_symbolize_keys
      expect(json[:last_name]).to eq('b')
      expect(json[:first_name]).to eq('b')
      expect(json[:patronymic]).to eq('b')
      expect(json[:group_number]).to eq('014302')
    end
end
