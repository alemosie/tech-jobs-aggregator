class AddDistanceToJobs < ActiveRecord::Migration
  def change
    add_column :jobs, :distance, :string
  end
end
