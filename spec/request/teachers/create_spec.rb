require 'rails_helper'

RSpec.describe "POST Teachers", type: :request do

  let!(:user) { Account.create(email: 'a@gmail.com', password: 'a') }

  scenario 'valid teacher attributes' do

    post 'http://localhost:3000/teachers', params: {
      teacher: {
        last_name: 'a',
        first_name: 'a',
        patronymic: 'a',
        quantity_of_hours: 1,
        account_id: user.id
      }
    }

    expect(response.status).to eq(201)

    json = JSON.parse(response.body).deep_symbolize_keys

    expect(json[:last_name]).to eq('a')
    expect(json[:first_name]).to eq('a')
    expect(json[:patronymic]).to eq('a')
    expect(json[:quantity_of_hours]).to eq(1)

    expect(Teacher.count).to eq(1)
  end

  scenario 'invalid teacher attributes' do
    post 'http://localhost:3000/teachers', params: {
      teacher: {
        last_name: '',
        first_name: 'a',
        patronymic: 'a',
        quantity_of_hours: 1,
        account_id: user.id
      }
    }

    expect(response.status).to eq(422)

    json = JSON.parse(response.body).deep_symbolize_keys
    expect(json[:last_name]).to eq(["can't be blank"])

    expect(Teacher.count).to eq(0)
  end
end
