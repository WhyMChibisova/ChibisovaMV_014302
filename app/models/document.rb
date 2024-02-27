class Document < ApplicationRecord
  belongs_to :student
  has_one_attached :document

  validates :mark, numericality: {allow_nil: true, in: (0..10)}
end
