class Api::V1::ReactionsController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def index
    render json: Reaction.all, adapter: :json
  end

  def show
    @vibe = Vibe.find(params[:id])
    @reactions = @vibe.reactions

    render json: @reactions
  end

  def create
    @reaction = Reaction.new(reaction_params)
    @vibe = Vibe.find(params[:vibe_id])

    if @reaction.save!
      if params[:kind] === "fire"
        @vibe.fire += 1
      elsif params[:kind] === "ice"
        @vibe.ice += 1
      end
      render json: @reaction
    else
      error = @reaction.errors.full_messages.join(', ')
      render json: error
    end
  end

  def destroy
    @reaction = Reaction.find(params[:id])
    @reaction.destroy
    @vibe = Vibe.find(params[:vibe_id])

    if params[:kind] === "fire"
      @vibe.fire -= 1
    elsif params[:kind] === "ice"
      @vibe.ice -= 1
    end

    @vibe.save!
    render json: @reaction
  end

  private

  def reaction_params
    params.permit(:kind, :vibe_id, :user_id)
  end
end
