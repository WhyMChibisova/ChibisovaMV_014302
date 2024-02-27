require "rails_helper"

RSpec.describe "GET Practices", type: :request do

  before do
    @practiceA = Practice.create(kind: 'a', duration: 1, hours_per_student: 1, group_number: '014302', start_date: '2024-01-01', end_date: '2024-02-01')
    @practiceB = Practice.create(kind: 'b', duration: 1, hours_per_student: 1, group_number: '014302', start_date: '2024-01-01', end_date: '2024-02-01')
    @practiceC = Practice.create(kind: 'c', duration: 1, hours_per_student: 1, group_number: '014302', start_date: '2024-01-01', end_date: '2024-02-01')
  end

    scenario "gets the first practice" do
        get "http://localhost:3000/practices/#{@practiceA.id}"

        expect(response).to have_http_status(:success)
        json = JSON.parse(response.body).deep_symbolize_keys
        expect(json[:practice][:kind]).to eq('a')
        expect(json[:practice][:duration]).to eq(1)
        expect(json[:practice][:hours_per_student]).to eq(1)
        expect(json[:practice][:group_number]).to eq('014302')
        expect(json[:practice][:start_date]).to eq('2024-01-01')
        expect(json[:practice][:end_date]).to eq('2024-02-01')
    end

    scenario "gets the second practice" do
      get "http://localhost:3000/practices/#{@practiceB.id}"

      expect(response).to have_http_status(:success)
      json = JSON.parse(response.body).deep_symbolize_keys
      expect(json[:practice][:kind]).to eq('b')
      expect(json[:practice][:duration]).to eq(1)
      expect(json[:practice][:hours_per_student]).to eq(1)
      expect(json[:practice][:group_number]).to eq('014302')
      expect(json[:practice][:start_date]).to eq('2024-01-01')
      expect(json[:practice][:end_date]).to eq('2024-02-01')
    end
end
