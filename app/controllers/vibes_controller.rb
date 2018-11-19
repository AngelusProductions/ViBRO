class VibesController < ApplicationController

  def index
    @vibes = Vibe.all
    @chillVibes = @vibes.sort_by(&:ice).reverse
    @waveyVibes = @vibes.sort_by(&:waves).reverse
    @fireVibes = @vibes.sort_by(&:fire).reverse
  end

  def show
    @vibe = Vibe.find(params[:id])
    @user = @vibe.user
  end

  def new
    @vibe = Vibe.new
  end

  def create
    @vibe = Vibe.new(vibe_params)
    @vibe.user = current_user

    if @vibe.save
      flash[:notice] = "vibe alive"
      redirect_to vibe_path(@vibe.id)
    else
      render new_vibe_path
    end
  end

  private

  def vibe_params
    params.require(:vibe).permit(:name, :blurb, :art, :audio_file)
  end
end
