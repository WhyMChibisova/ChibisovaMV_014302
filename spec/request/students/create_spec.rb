require 'rails_helper'

RSpec.describe "POST Students", type: :request do

  before do
    @user = Account.create(email: 'a@gmail.com', password: 'a')
    post 'http://localhost:3000/sessions', params: {
      account: {
        email: 'a@gmail.com',
        password: 'a'
      }
    }
  end

  scenario 'valid student attributes' do

    post 'http://localhost:3000/students', params: {
      student: {
        last_name: 'a',
        first_name: 'a',
        patronymic: 'a',
        group_number: '014302'
      }
    }

    expect(response.status).to eq(201)

    json = JSON.parse(response.body).deep_symbolize_keys

    expect(json[:last_name]).to eq('a')
    expect(json[:first_name]).to eq('a')
    expect(json[:patronymic]).to eq('a')
    expect(json[:group_number]).to eq('014302')

    expect(Student.count).to eq(1)
  end

  scenario 'invalid student attributes' do
    post 'http://localhost:3000/students', params: {
      student: {
        last_name: '',
        first_name: 'a',
        patronymic: 'a',
        group_number: '014302'
      }
    }

    expect(response.status).to eq(422)

    json = JSON.parse(response.body).deep_symbolize_keys
    expect(json[:last_name]).to eq(["can't be blank"])

    expect(Student.count).to eq(0)
  end
end
