class Reaction < ApplicationRecord
  validates :kind, presence: true

  belongs_to :user
  belongs_to :vibe
end
