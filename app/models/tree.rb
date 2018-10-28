class Tree < ApplicationRecord
  belongs_to :vibe

  has_many :stems
end
