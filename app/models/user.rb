class User < ActiveRecord::Base
  has_secure_password

  has_many :jobs
  validates_presence_of :name, :username, :email, :password
  validates_uniqueness_of :username, :email
end
