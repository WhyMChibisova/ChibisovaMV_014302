class CreateDocuments < ActiveRecord::Migration[7.0]
  def change
    create_table :documents do |t|
      t.integer :mark
      t.string :comment
      t.references :student, null: false, foreign_key: true

      t.timestamps
    end
  end
end
