class UsersController < ApplicationController

  def index
    @users = User.all
  end

  def show
    @user = User.find(params[:id])
    @name = "#{@user.first_name} #{@user.last_name}"
  end

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      flash[:notice] = "welcome #{params[:user][:username]}"
      redirect_to user_path
    else
      flash[:notice] = @user.errors.full_messages.join("\n")
      render :new
    end
  end

  private

  def user_params
    params.require(:user).permit(:first_name, :last_name, :username, :bio, :pro_pic)
  end

end
