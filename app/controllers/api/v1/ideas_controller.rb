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
    @idea = Idea.new
    @idea.title = params[:title]
    @idea.description = params[:description]
    @idea.time = params[:time]
    @idea.mix_id = params[:mix_id_copy]
    @idea.vibe_id = params[:vibe_id]
    @idea.user_id = params[:user_id]
    
    if @idea.save!
      render json: @idea
    else
      error = @idea.errors.full_messages.join(', ')
      render json: error
    end
  end

end
