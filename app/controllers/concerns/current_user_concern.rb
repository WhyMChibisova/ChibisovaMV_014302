module CurrentUserConcern
  extend ActiveSupport::Concern

  included do
    before_action :set_current_user
  end

  def set_current_user
    if session[:account_id]
      @current_user = Account.find(session[:account_id])
    end
  end
end
