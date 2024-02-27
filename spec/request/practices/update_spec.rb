require 'rails_helper'

RSpec.describe "PUT Practices", type: :request do

  before do
    Student.create(last_name: 'a', first_name: 'a', patronymic: 'a', group_number: '014302')
    @practice = Practice.create(kind: 'a', duration: 1, hours_per_student: 1, group_number: '014302', start_date: '01.01.2024', end_date: '01.02.2024')
  end

  scenario 'valid practice attributes' do
    put "http://localhost:3000/practices/#{@practice.id}", params: {
      practice: {
        kind: 'b',
        duration: 2,
        hours_per_student: 1,
        group_number: '014302',
        start_date: '2024-01-02',
        end_date: '2024-02-02'
      }
    }

    expect(response.status).to eq(200)

    json = JSON.parse(response.body).deep_symbolize_keys

    expect(json[:kind]).to eq('b')
    expect(json[:duration]).to eq(2)
    expect(json[:hours_per_student]).to eq(1)
    expect(json[:group_number]).to eq('014302')
    expect(json[:start_date]).to eq('2024-01-02')
    expect(json[:end_date]).to eq('2024-02-02')

    expect(@practice.reload.kind).to eq('b')
    expect(@practice.reload.duration).to eq(2)
    expect(@practice.reload.hours_per_student).to eq(1)
    expect(@practice.reload.group_number).to eq('014302')
    expect(@practice.reload.start_date.to_s).to eq('2024-01-02')
    expect(@practice.reload.end_date.to_s).to eq('2024-02-02')
  end

  scenario 'invalid practice attributes' do
    put "http://localhost:3000/practices/#{@practice.id}", params: {
      practice: {
        kind: '',
        duration: 2,
        hours_per_student: 1,
        group_number: '014302',
        start_date: '2024-01-01',
        end_date: '2024-02-01'
      }
    }

    expect(response.status).to eq(422)

    json = JSON.parse(response.body).deep_symbolize_keys
    expect(json[:kind]).to eq(["can't be blank"])

    expect(@practice.reload.kind).to eq('a')
    expect(@practice.reload.duration).to eq(1)
    expect(@practice.reload.hours_per_student).to eq(1)
    expect(@practice.reload.group_number).to eq('014302')
    expect(@practice.reload.start_date.to_s).to eq('2024-01-01')
    expect(@practice.reload.end_date.to_s).to eq('2024-02-01')
  end
end
