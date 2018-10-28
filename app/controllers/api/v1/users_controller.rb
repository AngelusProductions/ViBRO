class Api::V1::UsersController < ApplicationController

  def index
    render json: User.all, adapter: :json
  end

  def show
    render json: User.find(params[:id])
  end

end
