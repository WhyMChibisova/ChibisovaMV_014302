class Practice < ApplicationRecord
  has_many :students

  validates :kind, :duration, :hours_per_student, :group_number, :start_date, :end_date, presence: true
end
