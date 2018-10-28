class Collab < ApplicationRecord
  validates :stake, presence: true, numericality: true
  validates_inclusion_of :stake, :in => 0..100

  belongs_to :user
  belongs_to :vibe
  belongs_to :manager
end
