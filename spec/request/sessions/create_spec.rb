require 'rails_helper'

RSpec.describe "POST Sessions", type: :request do

  before do
    @user = Account.create(email: 'a@gmail.com', password: 'a')
  end

  scenario 'valid account attributes' do
    post 'http://localhost:3000/sessions', params: {
      account: {
        email: 'a@gmail.com',
        password: 'a'
      }
    }

    json = JSON.parse(response.body).deep_symbolize_keys
    expect(json[:status]).to eq("created")
    expect(json[:logged_in]).to eq(true)
    expect(json[:account][:email]).to eq('a@gmail.com')
  end

  scenario 'invalid account attributes' do
    post 'http://localhost:3000/sessions', params: {
      account: {
        email: '',
        password: 'a'
      }
    }

    json = JSON.parse(response.body).deep_symbolize_keys
    expect(json[:status]).to eq(401)
  end
end
