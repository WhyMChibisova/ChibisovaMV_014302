class SearchController < ApplicationController
  def organizations
    @organizations = Organization.where('name LIKE ? OR address LIKE ? OR description LIKE ?', "%#{params[:q]}%", "%#{params[:q]}%", "%#{params[:q]}%")

    render json: @organizations
  end
end
