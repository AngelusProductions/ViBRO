
vibes_seeds = [
  {name: "Don\'t Phunq Up!", runtime: 206, blurb: "title track from new funk/disco project", art: "#{Rails.root}/app/assets/images/dontphunqup.jpg", waves: 11, user_id: 1, manager_id: 1, lineup_id: 1},
  {name: "Never Over", runtime: 34, blurb: "quick loop that has potential", art: "#{Rails.root}/app/assets/images/neverover.jpg", waves: 6, user_id: 1, manager_id: 1, lineup_id: 2},
  {name: "Shadang", runtime: 124, blurb: "overtly sexual track", art: "#{Rails.root}/app/assets/images/shadang.jpg", waves: 9, user_id: 1, manager_id: 1, lineup_id: 2}
]

users_seeds = [
  {email: "angelusproductions@gmail.com", password: 123456, first_name: "Corey", last_name: "Angelus", username: "Angelus", pro_pic: "#{Rails.root}/app/assets/images/angelus.jpg", bio: "human from earth"}
]

managers_seeds = [
  {stake: 100, vibe_id: 1, user_id: 1}
]

lineups_seeds = [
  {name: "Don\'t Phunq Up!", blurb: "funk/disco album", art: "#{Rails.root}/app/assets/images/dontphunqup.jpg", waves: 7, user_id: 1},
  {name: "The Rest", blurb: "miscellaneous", art: "#{Rails.root}/app/assets/images/therest.jpg", waves: 12, user_id: 1}
]

# users_seeds.each do |seed|
#   User.create(seed)
# end
#
# managers_seeds.each do |seed|
#   Manager.create(seed)
# end
#
# lineups_seeds.each do |seed|
#   Lineup.create(seed)
# end
#
# vibes_seeds.each do |seed|
#   Vibe.create(seed)
# end
