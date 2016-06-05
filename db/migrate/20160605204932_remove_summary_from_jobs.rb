class RemoveSummaryFromJobs < ActiveRecord::Migration
  def change
    remove_column :jobs, :summary
  end
end
