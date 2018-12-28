class Api::V1::VibesController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def index
    render json: Vibe.all, adapter: :json
  end

  def show
    render json: Vibe.find(params[:id])
  end

  def create

    @vibe = Vibe.new
    @vibe.name = params[:vibeName]
    @vibe.blurb = params[:vibeBlurb]
    @vibe.art = params[:vibeArt]
    @vibe.user_id = params[:currentUserId]
    @vibe.manager_id = params[:currentUserId]
    @vibe.lineup_id = 1

    @mix = Mix.new
    @mix.name = params[:mixName]
    @mix.number = 1
    @mix.blurb = params[:mixBlurb]
    @mix.bpm = params[:mixBPM]
    @mix.color = params[:mixColor]
    @mix.art = params[:mixArt]
    @mix.audio_file = params[:mixAudioFile]
    @mix.vibe_id = Vibe.all.length + 1

    @vibe.mixes << @mix

    if @mix.save! && @vibe.save!
      render json: @vibe
    else
      error = @vibe.errors.full_messages.join(', ')
      render json: error
    end
  end

  def search
    @vibes = Vibe.where("name ILIKE ? OR blurb ILIKE ?",
                        "%#{params[:search_field]}%",
                        "%#{params[:search_field]}%")
    render json: @vibes
  end

  private

  def vibe_params
    params.permit(
                  :vibeName,
                  :vibeBlurb,
                  :vibeArt,
                  :mixName,
                  :mixBlurb,
                  :mixBPM,
                  :mixColor,
                  :mixArt,
                  :mixAudioFile
                )
  end

end
