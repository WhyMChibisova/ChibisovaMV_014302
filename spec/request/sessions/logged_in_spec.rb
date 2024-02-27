require 'rails_helper'

RSpec.describe "GET Sessions", type: :request do

  scenario 'valid account' do
    @user = Account.create(email: 'a@gmail.com', password: 'a')
    post 'http://localhost:3000/sessions', params: {
      account: {
        email: 'a@gmail.com',
        password: 'a'
      }
    }
    get "http://localhost:3000/logged_in"

    json = JSON.parse(response.body).deep_symbolize_keys

    expect(json[:logged_in]).to eq(true)
    expect(json[:account][:email]).to eq('a@gmail.com')
  end

  scenario 'invalid account' do
    get "http://localhost:3000/logged_in"

    json = JSON.parse(response.body).deep_symbolize_keys

    expect(json[:logged_in]).to eq(false)
  end
end
