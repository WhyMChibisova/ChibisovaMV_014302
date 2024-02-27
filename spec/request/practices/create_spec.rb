require 'rails_helper'

RSpec.describe "POST Practices", type: :request do

  before do
    Student.create(last_name: 'a', first_name: 'a', patronymic: 'a', group_number: '014302')
  end

  scenario 'valid practice attributes' do
    post 'http://localhost:3000/practices', params: {
      practice: {
        kind: 'a',
        duration: 1,
        hours_per_student: 1,
        group_number: '014302',
        start_date: '2024-01-01',
        end_date: '2024-02-01'
      }
    }

    expect(response.status).to eq(201)

    json = JSON.parse(response.body).deep_symbolize_keys

    expect(json[:kind]).to eq('a')
    expect(json[:duration]).to eq(1)
    expect(json[:hours_per_student]).to eq(1)
    expect(json[:group_number]).to eq('014302')
    expect(json[:start_date]).to eq('2024-01-01')
    expect(json[:end_date]).to eq('2024-02-01')

    expect(Practice.count).to eq(1)
  end

  scenario 'invalid practice attributes' do
    post 'http://localhost:3000/practices', params: {
      practice: {
        kind: '',
        duration: 1,
        hours_per_student: 1,
        group_number: '014302',
        start_date: '2024-01-01',
        end_date: '2024-02-01'
      }
    }

    expect(response.status).to eq(422)

    json = JSON.parse(response.body).deep_symbolize_keys
    expect(json[:kind]).to eq(["can't be blank"])

    expect(Practice.count).to eq(0)
  end
end
