class VibesController < ApplicationController

  def index
    @vibes = Vibe.all
  end

  def show
    @vibe = Vibe.find(params[:id])
    @user = @vibe.user
  end

  def new
    @vibe = Vibe.new
  end

  def create
    # @vibe = Vibe.new(vibe_params)
    @vibe.user = current_user

    if @vibe.save
      flash[:notice] = "vibe alive"
      redirect_to vibe_path(@vibe.id)
    else
      render new_vibe_path
    end
  end
end
