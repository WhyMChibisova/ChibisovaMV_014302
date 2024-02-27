require 'rails_helper'

RSpec.describe "PUT Documents", type: :request do

  before do
    @user = Account.create(email: 'a@gmail.com', password: 'a', role: "teacher")
    @student = Student.create(last_name: 'a', first_name: 'a', patronymic: 'a', group_number: '0143020')
    @document = Document.create(mark: 9, comment: 'a', student_id: @student.id)
  end

  scenario 'valid document attributes' do
    put "http://localhost:3000/documents/#{@document.id}?user_id=#{@user.id}", params: {
      document: {
        mark: 10,
        comment: 'b'
      }
    }

    expect(response.status).to eq(200)

    json = JSON.parse(response.body).deep_symbolize_keys

    expect(json[:mark]).to eq(10)
    expect(json[:comment]).to eq('b')

    expect(@document.reload.mark).to eq(10)
    expect(@document.reload.comment).to eq('b')
  end

  scenario 'invalid document attributes' do
    put "http://localhost:3000/documents/#{@document.id}?user_id=#{@user.id}", params: {
      document: {
        mark: -1,
        comment: 'a'
      }
    }

    expect(response.status).to eq(422)

    json = JSON.parse(response.body).deep_symbolize_keys
    expect(json[:mark]).to eq(["must be in 0..10"])

    expect(@document.reload.mark).to eq(9)
    expect(@document.reload.comment).to eq('a')
  end
end
