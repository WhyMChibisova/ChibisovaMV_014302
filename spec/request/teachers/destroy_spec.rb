require "rails_helper"

RSpec.describe "DELETE Teachers", type: :request do

  before do
    @user = Account.create(email: 'a@gmail.com', password: 'a')
    @teacherA = Teacher.create(last_name: 'a', first_name: 'a', patronymic: 'a', quantity_of_hours: 1, account_id: @user.id)
    @teacherB = Teacher.create(last_name: 'b', first_name: 'b', patronymic: 'b', quantity_of_hours: 2, account_id: @user.id)
  end

    scenario "Delete a teacher" do
        delete "http://localhost:3000/teachers/#{@teacherA.id}"
        expect(response).to have_http_status(:no_content)

        get "http://localhost:3000/teachers"
        expect(response).to have_http_status(:success)

        json = JSON.parse(response.body)
        expect(json.length).to eq(1)
    end
end
