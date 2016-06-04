Rails.application.routes.draw do
  root "home#feed", as: "feed"

  post "/users"    => "users#create"
  get "/users/:id" => "users#show", as: "profile"
  post "/login"    => "sessions#create", as: "login"
  delete "/logout" => "sessions#destroy", as: "logout"
end
