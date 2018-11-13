class Api::V1::MixesController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def index
    render json: Mix.all, adapter: :json
  end

  def show
    @vibe = Vibe.find(params[:id])
    @mixes = @vibe.mixes

    render json: @mixes
  end

  def create
    binding.pry
    @vibe = Vibe.find(params[:vibe_id])
    @mix = Mix.new(mix_params)
    @mix.number = @vibe.mixes.length + 1

    if @mix.save
      binding.pry
      render json: @mix
    else
      error = @mix.errors.full_messages.join(', ')
      render json: error
    end
  end

  private

  def mix_params
    params.permit(:name, :blurb, :color, :audio_file, :art, :bpm, :vibe_id)
  end

end
