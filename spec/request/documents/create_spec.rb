require 'rails_helper'

RSpec.describe "POST Documents", type: :request do

  before do
    @user = Account.create(email: 'a@gmail.com', password: 'a', role: "student")
    @practice = Practice.create(kind: 'a', duration: 1, hours_per_student: 1, group_number: '014302', start_date: '01.01.2024', end_date: '01.02.2024')
    @student = Student.new(last_name: 'a', first_name: 'a', patronymic: 'a', group_number: '014302')
    @student.account_id = @user.id
    @student.practice_id = @practice.id
    @student.save
  end

  scenario 'valid document attributes' do
    post 'http://localhost:3000/documents', params: {
      document: {
        mark: 9,
        comment: 'a',
        student_id: @user.id
      }
    }

    expect(response.status).to eq(201)

    json = JSON.parse(response.body).deep_symbolize_keys

    expect(json[:mark]).to eq(9)
    expect(json[:comment]).to eq('a')

    expect(Document.count).to eq(1)
  end

  scenario 'invalid document attributes' do
    post 'http://localhost:3000/documents', params: {
      document: {
        mark: 11,
        comment: 'a',
        student_id: @user.id
      }
    }

    expect(response.status).to eq(422)

    json = JSON.parse(response.body).deep_symbolize_keys
    expect(json[:mark]).to eq(["must be in 0..10"])

    expect(Document.count).to eq(0)
  end
end
