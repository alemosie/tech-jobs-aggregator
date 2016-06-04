class CreateJobs < ActiveRecord::Migration
  def change
    create_table :jobs do |t|
      t.string :position
      t.string :company
      t.string :location
      t.text   :summary
      t.string :date_posted
      t.string :url

      t.timestamps null: false
    end
  end
end
