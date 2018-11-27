class IdeasController < ApplicationController
  before_action :authenticate_user!

  def index
    @ideas = Idea.all
  end

  def show
    @idea = Idea.find(params[:id])
  end

  def new
  end

end
