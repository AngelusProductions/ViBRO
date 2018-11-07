class MixesController < ApplicationController

  def index
    @mixes = Mix.all
  end

  def show
    @mix = Mix.find(params[:id])
  end

  def new
  end

end
