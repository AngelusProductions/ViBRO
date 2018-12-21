class ReactionsController < ApplicationController
  before_action :authenticate_user!

  def index
    @reactions = Reaction.all
  end

  def show
    @reaction = Reaction.find(params[:id])
  end

end
