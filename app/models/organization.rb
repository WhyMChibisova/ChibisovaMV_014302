class Organization < ApplicationRecord
  has_many :students

  validates :name, :email, :address, :description, presence: true
  validates :email, uniqueness: true
end
