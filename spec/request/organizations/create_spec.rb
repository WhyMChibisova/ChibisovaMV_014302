require 'rails_helper'

RSpec.describe "POST Organizations", type: :request do

  scenario 'valid organization attributes' do
    post 'http://localhost:3000/organizations', params: {
      organization: {
        name: 'a',
        email: 'a@gmail.com',
        address: 'a',
        description: 'a'
      }
    }

    expect(response.status).to eq(201)

    json = JSON.parse(response.body).deep_symbolize_keys

    expect(json[:name]).to eq('a')
    expect(json[:email]).to eq('a@gmail.com')
    expect(json[:address]).to eq('a')
    expect(json[:description]).to eq('a')

    expect(Organization.count).to eq(1)
  end

  scenario 'invalid organization attributes' do
    post "http://localhost:3000/organizations", params: {
      organization: {
        name: 'a',
        email: '',
        address: 'a',
        description: 'a'
      }
    }

    expect(response.status).to eq(422)

    json = JSON.parse(response.body).deep_symbolize_keys
    expect(json[:email]).to eq(["can't be blank"])

    expect(Organization.count).to eq(0)
  end
end
