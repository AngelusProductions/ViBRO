class Manager < ApplicationRecord
  validates :stake, presence: true, numericality: true
  validates_inclusion_of :stake, :in => 0..100

  belongs_to :user

  has_one :vibe
  has_many :collabs
end
