class UsersController < ApplicationController

  def create
    @user = User.new(user_params)
    if @user.save
      log_in(@user)
      redirect_to feed_path, notice: "Welcome!"
    else
      redirect_to feed_path, alert: "Invalid submission."
    end
  end

  private

    def user_params
      params.require(:user).permit(:username, :name, :email, :password, :password_confirmation)
    end

end
