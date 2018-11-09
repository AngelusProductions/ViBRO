
vibes_seeds = [
  {name: "Don\'t Phunq Up!", blurb: "title track from new funk/disco project", remote_art_url: "https://s3.amazonaws.com/vibro-development/Art/dontphunqup.jpeg", waves: 11, fire: 3, ice: 6, user_id: 1, manager_id: 1, lineup_id: 1},
  {name: "Never Over", blurb: "quick loop that has potential", remote_art_url: "https://s3.amazonaws.com/vibro-development/Art/neverover.jpg", waves: 6, fire: 2, ice: 9, user_id: 1, manager_id: 1, lineup_id: 2},
  {name: "Shadang", blurb: "overtly sexual track", remote_art_url: "https://s3.amazonaws.com/vibro-development/Art/shadang.jpg", waves: 9, fire: 11, ice: 5, user_id: 1, manager_id: 1, lineup_id: 2}
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
  {number: 1, name: "loop for potential title track off of Vibro\'s new album: first mix", blurb: "where should I go from here?", bpm: 76, color: "blueviolet", remote_audio_file_url: "https://s3.amazonaws.com/vibro-development/Vibes/Don't+Phunq+Up!+1.m4a", vibe_id: 1 },
  {number: 2, name: "second mix: expanded the loop and added breakdown", blurb: "how do I end this?", bpm: 76, color: "aquamarine", remote_audio_file_url: "https://s3.amazonaws.com/vibro-development/Vibes/Don't+Phunq+Up!+2.mp3", vibe_id: 1 },
  {number: 1, name: "first draft loop", blurb: "where should I go with this?", bpm: 114, color: "LawnGreen", remote_audio_file_url: "https://s3.amazonaws.com/vibro-development/Vibes/NeverOver.mp3", vibe_id: 2 },
  {number: 1, name: "old favorite of mine", blurb: "should I do something different at the end?", bpm: 83, color: "LightCoral", remote_audio_file_url: "https://s3.amazonaws.com/vibro-development/Vibes/Shadang.mp3", vibe_id: 3 }
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
