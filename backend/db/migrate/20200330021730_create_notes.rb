class CreateNotes < ActiveRecord::Migration[6.0]
  def change
    create_table :notes do |t|
      t.belongs_to :user
      t.string :title
      t.string :description

      t.timestamps
    end
  end
end
