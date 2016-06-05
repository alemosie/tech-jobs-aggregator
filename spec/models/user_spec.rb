require 'rails_helper'

describe User do

  context "sign-up" do
    it "requires a username" do
      user = User.create(:username => "")
      user.valid?
      expect(user.errors[:username]).to include("can't be blank")
    end

    it "returns error if username already exists" do
      User.create(:username=>"chacha", name:"cha", password:"password", email:"cha@chacha.com")
      chacha = User.new(:username=>"chacha", name:"charmander", password:"password1", email:"char@chacha.com")
      expect(chacha).not_to be_valid
      expect(chacha.errors[:username]).to include("has already been taken")
    end

    it "requires a name" do
      user = User.create(:name => "")
      user.valid?
      expect(user.errors[:name]).to include("can't be blank")
    end

    it "requires an email" do
      user = User.create(:email => "")
      user.valid?
      expect(user.errors[:email]).to include("can't be blank")
    end

    it "returns error if email already exists" do
      User.create(:username=>"chacha", name:"cha", password:"password", email:"cha@chacha.com")
      chacha = User.new(:username=>"chachar", name:"char", password:"password1", email:"cha@chacha.com")
      expect(chacha).not_to be_valid
      expect(chacha.errors[:email]).to include("has already been taken")
    end

    it "requires password" do
      user = User.create(:password => "")
      user.valid?
      expect(user.errors[:password]).to include("can't be blank")
    end

  end
end
