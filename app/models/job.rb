class Job < ActiveRecord::Base
  belongs_to :user

  validates_presence_of :position,
                        :company,
                        :location,
                        :date_posted,
                        :url,
                        :original_search_term,
                        :user
end
