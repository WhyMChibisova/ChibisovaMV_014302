class AccountsController < ApplicationController
  before_action :set_account, only: %i[ show update destroy ]

  # GET /accounts
  def index
    @accounts = Account.all

    accounts_with_photo = @accounts.map do |account|
      if account.photo.attached?
        account.as_json.merge(photo_url: url_for(account.photo))
      else
        account.as_json.merge(photo_url: nil)
      end
    end

    render json: accounts_with_photo
  end

  # GET /accounts/1
  def show
    if @account.photo.attached?
      render json: {
        account: @account.as_json.merge(photo_url: url_for(@account.photo)),
        student: @account.student,
        teacher: @account.teacher
        }
    else
      render json: {
        account: @account.as_json.merge(photo_url: nil),
        student: @account.student,
        teacher: @account.teacher
        }
    end
  end

  # POST /accounts
  def create
    @account = Account.new(account_params)
    if @account.valid?
      if @account.role == "student"
        @account.student!
      elsif @account.role == "teacher"
        @account.teacher!
      else
        @account.teacher_report!
      end
    end

    if @account.save
      session[:account_id] = @account.id
      render json: @account, status: :created, location: @account
    else
      render json: @account.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /accounts/1
  def update
    if @account.update(account_params)
      render json: @account
    else
      render json: @account.errors, status: :unprocessable_entity
    end
  end

  # DELETE /accounts/1
  def destroy
    session.delete(:account_id)
    @account.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_account
      @account = Account.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def account_params
      params.require(:account).permit(:email, :password, :password_confirmation, :role, :photo)
    end
end
