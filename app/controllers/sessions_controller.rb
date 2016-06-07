class SessionsController < ApplicationController

  def create
    @user = User.find_by(username: params[:username])
    if !!@user && @user.authenticate(params[:password])
      log_in(@user)
      redirect_to feed_path, notice: "Welcome back!"
    else
      redirect_to feed_path, alert: "Login failed."
    end
  end

  def destroy
    log_out(current_user)
    redirect_to feed_path
  end
end
