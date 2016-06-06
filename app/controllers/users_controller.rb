class UsersController < ApplicationController

  def create
    @user = User.new(user_params)
    if @user.save
      log_in(@user)
      redirect_to feed_path
    else
      # redirect with a flash error message
      redirect_to feed_path
    end
  end

  private

    def user_params
      params.require(:user).permit(:username, :name, :email, :password, :password_confirmation)
    end

end
