class Teacher < ApplicationRecord
  belongs_to :account
  has_many :students

  validates :last_name, :first_name, :quantity_of_hours, presence: true
end
