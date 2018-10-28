class Stem < ApplicationRecord
  validates :name, presence: true
  validates :audio_file, presence: true

  belongs_to :vibe
  belongs_to :tree
end
