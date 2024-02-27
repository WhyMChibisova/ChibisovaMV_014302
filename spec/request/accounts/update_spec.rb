require 'rails_helper'

RSpec.describe "PUT Accounts", type: :request do

  let!(:account) { Account.create(email: 'a@gmail.com', password: 'a', role: 'student') }

  scenario 'valid account attributes' do
    put "http://localhost:3000/accounts/#{account.id}", params: {
      account: {
        email: 'b@gmail.com',
        role: 'student'
      }
    }

    expect(response.status).to eq(200)

    json = JSON.parse(response.body).deep_symbolize_keys
    expect(json[:email]).to eq('b@gmail.com')
    expect(json[:role]).to eq('student')

    expect(account.reload.email).to eq('b@gmail.com')
    expect(account.reload.role).to eq('student')
  end

  scenario 'invalid account attributes' do
    put "http://localhost:3000/accounts/#{account.id}", params: {
      account: {
        email: '',
        role: 'student'
      }
    }

    expect(response.status).to eq(422)

    json = JSON.parse(response.body).deep_symbolize_keys
    expect(json[:email]).to eq(["can't be blank", "is too short (minimum is 4 characters)"])

    expect(account.reload.email).to eq('a@gmail.com')
    expect(account.reload.role).to eq('student')
  end
end
