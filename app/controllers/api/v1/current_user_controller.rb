class Api::V1::CurrentUserController < ApplicationController

  def index
    render json: current_user, adapter: :json
  end

end
