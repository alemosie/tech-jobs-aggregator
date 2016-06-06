class HomeController < ApplicationController
  
  def feed
    if logged_in?
      @user, @jobs = current_user, current_user.jobs
    else
      @user = User.new
    end
  end

end
