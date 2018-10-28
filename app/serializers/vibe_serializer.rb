class VibeSerializer < ActiveModel::Serializer
  attributes :id, :name, :runtime, :blurb, :art

  belongs_to :user
  belongs_to :manager
  belongs_to :lineup

  has_many :collabs
  has_many :ideas
  has_many :mixes

  has_one :tree
end
