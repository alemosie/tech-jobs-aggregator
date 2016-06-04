class SessionsController < ApplicationController

  def create
    user = User.find_by(name: params[:username])
    return head(:forbidden) unless user.authenticate(params[:password])
    log_in(user)
    redirect_to profile_path(user)
  end

  def destroy
    log_out(current_user)
    redirect_to feed_path
  end
end
