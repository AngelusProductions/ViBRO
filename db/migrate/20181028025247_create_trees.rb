class CreateTrees < ActiveRecord::Migration[5.2]
  def change
    create_table :trees do |t|
      t.belongs_to :vibe, null: false

      t.timestamps null: false
    end
  end
end
