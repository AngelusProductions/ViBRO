class Api::V1::VibesController < ApplicationController

  def index
    render json: Vibe.all, adapter: :json
  end

  def show
    render json: Vibe.find(params[:id])
  end

end
