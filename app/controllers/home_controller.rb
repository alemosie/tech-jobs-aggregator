class HomeController < ApplicationController
  def feed
    @user = current_user || User.new
  end

  def get_data
  end
end
