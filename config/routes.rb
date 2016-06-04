Rails.application.routes.draw do
  root "home#feed", as: "feed"

  post "/users"    => "users#create"
  post "/login"    => "sessions#create", as: "login"
  delete "/logout" => "sessions#destroy", as: "logout"
end
