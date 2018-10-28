class Mix < ApplicationRecord
  validates :number, presence: true, numericality: true
  validates :audio_file, presence: true

  belongs_to :vibe
end
