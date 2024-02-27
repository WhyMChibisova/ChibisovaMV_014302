require "rails_helper"

RSpec.describe "GET Teachers", type: :request do

  before do
    @user = Account.create(email: 'a@gmail.com', password: 'a')
    @teacherA = Teacher.create(last_name: 'a', first_name: 'a', patronymic: 'a', quantity_of_hours: 1, account_id: @user.id)
    @teacherB = Teacher.create(last_name: 'b', first_name: 'b', patronymic: 'b', quantity_of_hours: 2, account_id: @user.id)
    @teacherC = Teacher.create(last_name: 'c', first_name: 'c', patronymic: 'c', quantity_of_hours: 3, account_id: @user.id)
  end

    scenario "gets the first teacher" do
        get "http://localhost:3000/teachers/#{@teacherA.id}"

        expect(response).to have_http_status(:success)
        json = JSON.parse(response.body).deep_symbolize_keys
        expect(json[:last_name]).to eq('a')
        expect(json[:first_name]).to eq('a')
        expect(json[:patronymic]).to eq('a')
        expect(json[:quantity_of_hours]).to eq(1)
    end

    scenario "gets the second teacher" do
      get "http://localhost:3000/teachers/#{@teacherB.id}"

      expect(response).to have_http_status(:success)
      json = JSON.parse(response.body).deep_symbolize_keys
      expect(json[:last_name]).to eq('b')
      expect(json[:first_name]).to eq('b')
      expect(json[:patronymic]).to eq('b')
      expect(json[:quantity_of_hours]).to eq(2)
    end
end
