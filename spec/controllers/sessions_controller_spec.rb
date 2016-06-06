require 'rails_helper'

RSpec.describe SessionsController, :type => :controller do

  before do
    User.destroy_all
  end

  let(:user) { User.create(username: "chacha", name: "cha", email: "cha@chacha.com", password: "password")}

  describe '#create' do
    it 'logs you in with the correct password' do
      post :create, { username: user.username, password: user.password}
      expect(session[:user_id]).to eq(user.id)
    end

    it 'rejects invalid passwords' do
      post :create, { username: user.username, password: user.password + "x"}
      expect(session[:user_id]).to be_nil
    end

    it 'rejects empty passwords' do
      post :create, { username: user.username, password:""}
      expect(session[:user_id]).to be_nil
    end
  end

  describe "#destroy" do
    it "logs out the current user" do
      allow(controller).to receive(:current_user).and_return(user)
      delete :destroy
      expect(session[:user_id]).to be_nil
    end
  end
end
