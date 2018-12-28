class Api::V1::UsersController < ApplicationController

  def index
    render json: User.all, adapter: :json
  end

  def show
    render json: User.find(params[:id])
  end

  def search
    if params[:search_field] != ""
      @users = User.where("username ILIKE ? OR bio ILIKE ?",
                          "%#{params[:search_field]}%",
                          "%#{params[:search_field]}%")
    else
      @users = User.all.limit(10).order(:created_at)
    end
    
    render json: @users
  end
end
