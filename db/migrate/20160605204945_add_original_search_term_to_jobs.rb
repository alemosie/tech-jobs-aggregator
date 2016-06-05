class AddOriginalSearchTermToJobs < ActiveRecord::Migration
  def change
    add_column :jobs, :original_search_term, :string
  end
end
