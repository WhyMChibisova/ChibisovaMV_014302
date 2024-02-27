require 'rails_helper'

RSpec.describe "PUT Teachers", type: :request do

  let!(:user) { Account.create(email: 'a@gmail.com', password: 'a') }
  let!(:teacher) { Teacher.create(last_name: 'a', first_name: 'a', patronymic: 'a', quantity_of_hours: 1, account_id: user.id) }

  scenario 'valid teacher attributes' do
    put "http://localhost:3000/teachers/#{teacher.id}", params: {
      teacher: {
        last_name: 'b',
        first_name: 'b',
        patronymic: 'b',
        quantity_of_hours: 2,
        account_id: user.id
      }
    }

    expect(response.status).to eq(200)

    json = JSON.parse(response.body).deep_symbolize_keys

    expect(json[:last_name]).to eq('b')
    expect(json[:first_name]).to eq('b')
    expect(json[:patronymic]).to eq('b')
    expect(json[:quantity_of_hours]).to eq(2)

    expect(teacher.reload.last_name).to eq('b')
    expect(teacher.reload.first_name).to eq('b')
    expect(teacher.reload.patronymic).to eq('b')
    expect(teacher.reload.quantity_of_hours).to eq(2)
  end

  scenario 'invalid teacher attributes' do
    put "http://localhost:3000/teachers/#{teacher.id}", params: {
      teacher: {
        last_name: '',
        first_name: 'b',
        patronymic: 'b',
        quantity_of_hours: 2,
        account_id: user.id
      }
    }

    expect(response.status).to eq(422)

    json = JSON.parse(response.body).deep_symbolize_keys
    expect(json[:last_name]).to eq(["can't be blank"])

    expect(teacher.reload.last_name).to eq('a')
    expect(teacher.reload.first_name).to eq('a')
    expect(teacher.reload.patronymic).to eq('a')
    expect(teacher.reload.quantity_of_hours).to eq(1)
  end
end
