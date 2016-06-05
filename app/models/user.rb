class User < ActiveRecord::Base
  has_secure_password

  has_many :jobs
  
end
