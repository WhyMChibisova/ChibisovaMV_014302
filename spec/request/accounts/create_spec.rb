require 'rails_helper'

RSpec.describe "POST Accounts", type: :request do

  scenario 'valid account attributes with student role' do
    post 'http://localhost:3000/accounts', params: {
      account: {
        email: 'a@gmail.com',
        password: 'a',
        role: 'student'
      }
    }

    expect(response.status).to eq(201)

    json = JSON.parse(response.body).deep_symbolize_keys

    expect(json[:email]).to eq('a@gmail.com')
    expect(json[:role]).to eq('student')

    expect(Account.count).to eq(1)
  end

  scenario 'valid account attributes with teacher role' do
    post 'http://localhost:3000/accounts', params: {
      account: {
        email: 'a@gmail.com',
        password: 'a',
        role: 'teacher'
      }
    }

    expect(response.status).to eq(201)

    json = JSON.parse(response.body).deep_symbolize_keys

    expect(json[:email]).to eq('a@gmail.com')
    expect(json[:role]).to eq('teacher')

    expect(Account.count).to eq(1)
  end

  scenario 'valid account attributes with teacher_report role' do
    post 'http://localhost:3000/accounts', params: {
      account: {
        email: 'a@gmail.com',
        password: 'a',
        role: 'teacher_report'
      }
    }

    expect(response.status).to eq(201)

    json = JSON.parse(response.body).deep_symbolize_keys

    expect(json[:email]).to eq('a@gmail.com')
    expect(json[:role]).to eq('teacher_report')

    expect(Account.count).to eq(1)
  end

  scenario 'invalid account attributes' do
    post "http://localhost:3000/accounts", params: {
      account: {
        email: '',
        password: 'a',
        role: 'student'
      }
    }

    expect(response.status).to eq(422)

    json = JSON.parse(response.body).deep_symbolize_keys
    expect(json[:email]).to eq(["can't be blank", "is too short (minimum is 4 characters)"])

    expect(Account.count).to eq(0)
  end
end
