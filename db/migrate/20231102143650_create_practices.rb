class CreatePractices < ActiveRecord::Migration[7.0]
  def change
    create_table :practices do |t|
      t.string :kind
      t.integer :duration
      t.float :hours_per_student

      t.timestamps
    end
  end
end
