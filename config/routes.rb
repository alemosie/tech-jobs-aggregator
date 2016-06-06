Rails.application.routes.draw do
  root "home#feed", as: "feed"

  post "/users"      => "users#create"
  post "/login"      => "sessions#create", as: "login"
  delete "/logout"   => "sessions#destroy", as: "logout"
  post "/jobs"       => "jobs#create"
  delete "/jobs/:id" => "jobs#destroy"
end
