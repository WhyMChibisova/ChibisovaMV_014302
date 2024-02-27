require 'rails_helper'

RSpec.describe "PUT Organizations", type: :request do

  let!(:organization) { Organization.create(name: 'a', email: 'a@gmail.com', address: 'a', description: 'a') }

  scenario 'valid organization attributes' do
    put "http://localhost:3000/organizations/#{organization.id}", params: {
      organization: {
        name: 'b',
        email: 'b@gmail.com',
        address: 'b',
        description: 'b'
      }
    }

    expect(response.status).to eq(200)

    json = JSON.parse(response.body).deep_symbolize_keys

    expect(json[:name]).to eq('b')
    expect(json[:email]).to eq('b@gmail.com')
    expect(json[:address]).to eq('b')
    expect(json[:description]).to eq('b')

    expect(organization.reload.name).to eq('b')
    expect(organization.reload.email).to eq('b@gmail.com')
    expect(organization.reload.address).to eq('b')
    expect(organization.reload.description).to eq('b')
  end

  scenario 'invalid organization attributes' do
    put "http://localhost:3000/organizations/#{organization.id}", params: {
      organization: {
        name: 'b',
        email: '',
        address: 'b',
        description: 'b'
      }
    }

    expect(response.status).to eq(422)

    json = JSON.parse(response.body).deep_symbolize_keys
    expect(json[:email]).to eq(["can't be blank"])

    expect(organization.reload.name).to eq('a')
    expect(organization.reload.email).to eq('a@gmail.com')
    expect(organization.reload.address).to eq('a')
    expect(organization.reload.description).to eq('a')
  end
end
