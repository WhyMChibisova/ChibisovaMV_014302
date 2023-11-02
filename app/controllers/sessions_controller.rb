class SessionsController < ApplicationController
  include CurrentUserConcern

  def create
    @account = Account.find_by(email: session_params["email"]).try(:authenticate, session_params["password"])
    if @account
      session[:account_id] = @account.id
      render json: {
        status: :created,
        logged_in: true,
        account: @account
      }
    else
      render json: { status: 401 }
    end
  end

  def logged_in
    if @current_user
      render json: {
        logged_in: true,
        account: @current_user
      }
    else
      render json: {
        logged_in: false
      }
    end
  end

  def logout
    reset_session
    render json: {
      status: 200,
      logged_out: true
    }
  end

  def session_params
      params.require(:account).permit(:email, :password)
  end
end
