require 'rails_helper'

RSpec.describe "DELETE Sessions", type: :request do

  before do
    @user = Account.create(email: 'a@gmail.com', password: 'a')
    post 'http://localhost:3000/sessions', params: {
      account: {
        email: 'a@gmail.com',
        password: 'a'
      }
    }
  end

  scenario 'delete session' do
    delete "http://localhost:3000/logout"

    json = JSON.parse(response.body).deep_symbolize_keys
    expect(json[:status]).to eq(200)
    expect(json[:logged_out]).to eq(true)
  end
end
