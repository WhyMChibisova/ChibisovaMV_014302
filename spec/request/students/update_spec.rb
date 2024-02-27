require 'rails_helper'

RSpec.describe "PUT Students", type: :request do

  let!(:student) { Student.create(last_name: 'a', first_name: 'a', patronymic: 'a', group_number: '014302') }

  scenario 'valid student attributes' do
    put "http://localhost:3000/students/#{student.id}", params: {
      student: {
        last_name: 'b',
        first_name: 'b',
        patronymic: 'b',
        group_number: '014302'
      }
    }

    expect(response.status).to eq(200)

    json = JSON.parse(response.body).deep_symbolize_keys

    expect(json[:last_name]).to eq('b')
    expect(json[:first_name]).to eq('b')
    expect(json[:patronymic]).to eq('b')
    expect(json[:group_number]).to eq('014302')

    expect(student.reload.last_name).to eq('b')
    expect(student.reload.first_name).to eq('b')
    expect(student.reload.patronymic).to eq('b')
    expect(student.reload.group_number).to eq('014302')
  end

  scenario 'invalid student attributes' do
    put "http://localhost:3000/students/#{student.id}", params: {
      student: {
        last_name: '',
        first_name: 'b',
        patronymic: 'b',
        group_number: '014302'
      }
    }

    expect(response.status).to eq(422)

    json = JSON.parse(response.body).deep_symbolize_keys
    expect(json[:last_name]).to eq(["can't be blank"])

    expect(student.reload.last_name).to eq('a')
    expect(student.reload.first_name).to eq('a')
    expect(student.reload.patronymic).to eq('a')
    expect(student.reload.group_number).to eq('014302')
  end
end
