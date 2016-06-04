class HomeController < ApplicationController
  
  def feed
    @user = current_user || User.new
  end

end
