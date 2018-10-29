class VibesController < ApplicationController

  def index
    @vibes = Vibe.all
    @vibes = @vibes.sort_by(&:waves).reverse
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

  def edit
    @vibe = Vibe.find(params[:id])
    @user = User.find(@vibe.user_id)
  end

  def update
    @vibe = Vibe.find(params[:id])
    if @vibe.update_attributes(vibe_params)
      redirect_to "/users/#{@vibe.user_id}", notice: "vibe updated"
    else
      render :edit
    end
  end

  def destroy
    @vibes = Vibe.all
    user_id = Vibe.find(params[:id]).user_id
    Vibe.destroy(params[:id])
    redirect_to "/users/#{user_id}", notice: "vibe gone"
  end

  private

  def vibe_params
    params.require(:vibe).permit(:name, :blurb, :art, :audio_file)
  end
end
