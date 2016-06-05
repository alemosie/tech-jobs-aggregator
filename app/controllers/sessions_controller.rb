class SessionsController < ApplicationController

  def create
    @user = User.find_by(username: params[:username])
    return head(:forbidden) unless @user.authenticate(params[:password])
    log_in(@user)
    redirect_to feed_path
  end

  def destroy
    log_out(current_user)
    redirect_to feed_path
  end
end
