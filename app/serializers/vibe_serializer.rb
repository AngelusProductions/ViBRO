class VibeSerializer < ActiveModel::Serializer
  attributes :id, :name, :blurb, :art, :fire, :ice, :mixes, :reactions

  belongs_to :user
  belongs_to :manager
  belongs_to :lineup

  has_many :collabs
  has_many :mixes
  has_many :reactions

end
