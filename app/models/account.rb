class Account < ApplicationRecord
  has_one :teacher
  has_one :student
  has_secure_password

  has_one_attached :photo

  validates :email, presence: true
  validates :email, uniqueness: true
  validates :email, length: { minimum: 4 }

  enum role: %i[student teacher admin]
end
