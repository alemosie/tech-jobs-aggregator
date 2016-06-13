require 'rails_helper'

describe UsersController, type: :controller do

  let(:request_params) do
    { user:
      {
        username: "dunxtand",
        name: "Duncan",
        email: "duncan@jobpostsapp.com",
        password: "password",
        password_confirmation: "password"
      }
    }
  end

  context "#create" do
    it "creates a new user" do
      expect{post :create, request_params}.to change {User.count}.from(0).to(1)
    end

    it "logs in the new user" do
      post :create, request_params
      expect(session[:user_id]).to eq(User.first.id)
    end

    it "redirects back to the feed page" do
      post :create, request_params
      expect(response).to redirect_to feed_path
    end
  end

end