class Account < ApplicationRecord
  has_secure_password

  validates :email, presence: true
  validates :email, uniqueness: true
  validates :email, length: { minimum: 4 }

  enum role: %i[student teacher admin]
end
