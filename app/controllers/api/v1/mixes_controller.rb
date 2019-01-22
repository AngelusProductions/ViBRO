# require 'taglib'

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
    @vibe = Vibe.find(params[:vibe_id])
    @mix = Mix.new(mix_params)
    @mix.number = @vibe.mixes.length + 1

    # set_duration(@mix)

    if @mix.save
      render json: @mix
    else
      error = @mix.errors.full_messages.join(', ')
      render json: error
    end
  end
  #
  # def set_duration(mix)
  #   TagLib::FileRef.open(mix.audio_file.path) do |file|
  #     properties = file.audio_properties
  #     mix.runtime = properties.length
  #   end
  # end

  private

  def mix_params
    params.permit(:name,
                  :blurb,
                  :color,
                  :audio_file,
                  :bpm,
                  :vibe_id)
  end

end
