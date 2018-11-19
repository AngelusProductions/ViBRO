class Api::V1::IdeasController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def index
    render json: Idea.all, adapter: :json
  end

  def show
    @idea = Idea.find(params[:id])
    @mix = Mix.find(params[:mix_id])
    @ideas = @mix.ideas

    render json: @ideas
  end

  def create
    @idea = Idea.new(idea_params)

    if @idea.save
      render json: @idea
    else
      error = @idea.errors.full_messages.join(', ')
      render json: error
    end
  end

  private

  def idea_params
    params.permit(:title, :description, :time, :audio_file, :mix_id, :vibe_id, :user_id, :accepted, :fire, :ice)
  end
end
