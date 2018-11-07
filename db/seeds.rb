# 
# art_file_1 = File.new("#{Rails.root}/app/assets/images/dontphunqup.jpeg")
# art_file_2 = File.new("#{Rails.root}/app/assets/images/neverover.jpg")
# art_file_3 = File.new("#{Rails.root}/app/assets/images/shadang.jpg")
#
# audio_file_1 = File.new("#{Rails.root}/app/assets/vibes/Don't Phunq Up! 1.m4a")
# audio_file_2 = File.new("#{Rails.root}/app/assets/vibes/Don't Phunq Up! 2.m4a")
# audio_file_3 = File.new("#{Rails.root}/app/assets/vibes/NeverOver.mp3")
# audio_file_4 = File.new("#{Rails.root}/app/assets/vibes/Shadang.mp3")

vibes_seeds = [
  {name: "Don\'t Phunq Up!", runtime: 206, blurb: "title track from new funk/disco project", art: art_file_1, waves: 11, fire: 3, ice: 6, user_id: 1, manager_id: 1, lineup_id: 1},
  {name: "Never Over", runtime: 34, blurb: "quick loop that has potential", art: art_file_2, waves: 6, fire: 2, ice: 9, user_id: 1, manager_id: 1, lineup_id: 2},
  {name: "Shadang", runtime: 124, blurb: "overtly sexual track", art: art_file_3, waves: 9, fire: 11, ice: 5, user_id: 1, manager_id: 1, lineup_id: 2}
]

users_seeds = [
  {email: "angelusproductions@gmail.com", password: 123456, first_name: "Corey", last_name: "Angelus", username: "Angelus", pro_pic: "#{Rails.root}/app/assets/images/angelus.jpg", bio: "human from earth"}
]

managers_seeds = [
  {stake: 100, vibe_id: 1, user_id: 1},
  {stake: 100, vibe_id: 2, user_id: 1},
  {stake: 100, vibe_id: 3, user_id: 1}
]

lineups_seeds = [
  {name: "Don\'t Phunq Up!", blurb: "funk/disco album", art: "/assets/dontphunqup.jpeg", waves: 7, user_id: 1},
  {name: "The Rest", blurb: "miscellaneous", art: "/assets/therest.gif", waves: 12, user_id: 1}
]

mixes_seeds = [
  {number: 1, name: "loop for potential title track off of Vibro\'s new album: first mix", blurb: "where should I go from here?", bpm: 76, color: "blueviolet", audio_file: audio_file_1, vibe_id: 1 },
  {number: 2, name: "second mix: expanded the loop and added breakdown", blurb: "how do I end this?", bpm: 76, color: "aquamarine", audio_file: audio_file_2, vibe_id: 1 },
  {number: 1, name: "first draft loop", blurb: "where should I go with this?", bpm: 114, color: "LawnGreen", audio_file: audio_file_3, vibe_id: 2 },
  {number: 1, name: "old favorite of mine", blurb: "should I do something different at the end?", bpm: 83, color: "LightCoral", audio_file: audio_file_4, vibe_id: 3 }
]

users_seeds.each do |seed|
  User.create!(seed)
end

managers_seeds.each do |seed|
  Manager.create!(seed)
end

lineups_seeds.each do |seed|
  Lineup.create!(seed)
end

vibes_seeds.each do |seed|
  Vibe.create!(seed)
end

mixes_seeds.each do |seed|
  Mix.create!(seed)
end
