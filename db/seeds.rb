
users_seeds = [
  {id: 1, email: "angelusproductions@gmail.com", password: 123456, first_name: "Corey", last_name: "Angelus", username: "Angelus", remote_pro_pic_url: "https://s3.amazonaws.com/vibro-development/Art/angelus.jpg", bio: "Hi, I\'m Corey. I developed this site and produced a number of songs. Please DM me if you\'re intersted in collaborating. Let\'s make this music better!"},
  {id: 2, email: "cca257@nyu.edu", password: 123456, first_name: "Shmlorey", last_name: "Shmlangelus", username: "Shmlangelus", remote_pro_pic_url: "https://s3.amazonaws.com/vibro-development/Art/velvetopia pixelated.jpg", bio: "Hi, I\'m Corey\'s alter ego."}
]

managers_seeds = [
  {id: 1, stake: 100, vibe_id: 1, user_id: 1},
  {id: 2, stake: 100, vibe_id: 2, user_id: 1},
  {id: 3, stake: 100, vibe_id: 3, user_id: 1},
  {id: 4, stake: 100, vibe_id: 4, user_id: 1},
  {id: 5, stake: 100, vibe_id: 5, user_id: 1},
  {id: 6, stake: 100, vibe_id: 6, user_id: 1}
]

lineups_seeds = [
  {id: 1, name: "Don\'t Phunq Up!", blurb: "Funk/disco album.", art: "https://i.pinimg.com/474x/fa/84/ac/fa84ac45b38fb8a44a8987d73d9c9fbb.jpg", waves: 7, user_id: 1},
  {id: 2, name: "Blue Kangaroo", blurb: "Electronic R&B.", art: "http://pixelartmaker.com/art/983eebd1c0805ad.png", waves: 35, user_id: 1},
  {id: 3, name: "The Rest", blurb: "Miscellaneous.", art: "/assets/therest.gif", waves: 12, user_id: 1}
]

vibes_seeds = [
  {id: 1, name: "Pretty Good", blurb: "My mom loves this one. Needs live violin.", remote_art_url: "https://rlv.zcache.com/3d_ape_monkey_club_electro_motive_headphones_t_shirt-raa0d14f6bf4c470b861f62207c91f467_k2gr0_307.jpg?rvtype=content", fire: 0, ice: 0, user_id: 1, manager_id: 1, lineup_id: 1},
  {id: 2, name: "Mary Louisa", blurb: "Off the project \"Blue Kangaroo\". Been working on the album for 5+ years! Someone help!!", remote_art_url: "http://www.octobergalleries.com/wp-content/uploads/2018/08/Wall-Art-African-American-Black-Abstract-Portrait-Art-Canvas-Afro-Women-Poster-Canvas-Painting-for-Room-9.jpg_640x640-9.jpg", fire: 0, ice: 0, user_id: 1, manager_id: 1, lineup_id: 2},
  {id: 3, name: "Recursion", blurb: "Quick loop with potential methinks.", remote_art_url: "https://i.pinimg.com/474x/b6/83/78/b683780882e8225f6014ab21f91434ed--motion-design-animated-gif.jpg", fire: 0, ice: 0, user_id: 1, manager_id: 1, lineup_id: 3},
  {id: 4, name: "Digital Prayer", blurb: "That\'s my old voice! Recorded badly. Dubstep by Summer Like The Season.", remote_art_url: "https://cms-assets.tutsplus.com/uploads/users/1381/posts/26562/image/FINAL%20IMAGE-min.jpg", fire: 0, ice: 0, user_id: 1, manager_id: 1, lineup_id: 3},
  {id: 5, name: "Don\'t Phunq Up!", blurb: "Possible title track from new funk/disco project. Need to flesh out.", remote_art_url: "https://i.pinimg.com/474x/fa/84/ac/fa84ac45b38fb8a44a8987d73d9c9fbb.jpg", fire: 0, ice: 0, user_id: 1, manager_id: 1, lineup_id: 1},
  {id: 6, name: "Tasty", blurb: "Steel drums all day baby.", remote_art_url: "https://i.pinimg.com/474x/45/c8/4a/45c84a6d8c3d23d184e590d6a09c35eb--january--black-heart.jpg", fire: 0, ice: 0, user_id: 1, manager_id: 1, lineup_id: 2}
]

mixes_seeds = [
  {id: 1, number: 1, name: "The beat I started with", blurb: "I really like this one. Help me out guys.", bpm: 86, color: "red", remote_audio_file_url: "https://s3.amazonaws.com/vibro-development/Vibes/Pretty+Good+Mix+1.wav", runtime: 55, vibe_id: 1 },
  {id: 2, number: 2, name: "Added draft of new bridge. IDK.", blurb: "Do you think the violin pluck idea fits?", bpm: 86, color: "red", remote_audio_file_url: "https://s3.amazonaws.com/vibro-development/Vibes/Pretty+Good+Mix+2.wav", runtime: 175, vibe_id: 1 },
  {id: 3, number: 3, name: "Extended version without bridge", blurb: "I really want a goofy rapper like Beck on here.", bpm: 86, color: "red", remote_audio_file_url: "https://s3.amazonaws.com/vibro-development/Vibes/Pretty+Good+Mix+3.wav", runtime: 220, vibe_id: 1 },
  {id: 4, number: 1, name: "Way back in 2015. First take.", blurb: "Do I progress from part to part too quickly?", bpm: 128, color: "yellow", remote_audio_file_url: "https://s3.amazonaws.com/vibro-development/Vibes/Mary+Louisa+Mix+1.wav", runtime: 89, vibe_id: 2 },
  {id: 6, number: 2, name: "Bad mix, I know. But you get the idea.", blurb: "Can someone play upright bass?", bpm: 128, color: "yellow", remote_audio_file_url: "https://s3.amazonaws.com/vibro-development/Vibes/Mary+Louisa+Mix+2.wav", runtime: 176, vibe_id: 2 },
  {id: 7, number: 3, name: "Latest bounce of this track.", blurb: "Does anyone mix/master for cheap?", bpm: 128, color: "yellow", remote_audio_file_url: "https://s3.amazonaws.com/vibro-development/Vibes/Mary+Louisa+Mix+3.m4a", runtime: 176, vibe_id: 2 },
  {id: 8, number: 1, name: "Just 32 bars. Can make more if needed.", blurb: "Any guitarist want to contribute?", bpm: 114, color: "turquoise", remote_audio_file_url: "https://s3.amazonaws.com/vibro-development/Vibes/NeverOver.mp3", runtime: 16, vibe_id: 3 },
  {id: 9, number: 1, name: "Chopped up recording of my voice and reverb.", blurb: "I\'ll re-record eventually.", bpm: 150, color: "black", remote_audio_file_url: "https://s3.amazonaws.com/vibro-development/Vibes/Digital+Prayer+Mix+1.wav", runtime: 177, vibe_id: 4 },
  {id: 10, number: 2, name: "I love the synths Summer added on the chorus.", blurb: "I\'m wondering if the new lines make the rest of the song sound out of place.", bpm: 150, color: "black", remote_audio_file_url: "https://s3.amazonaws.com/vibro-development/Vibes/Digital+Prayer+Mix+2.wav", runtime: 323, vibe_id: 4 },
  {id: 11, number: 1, name: "First bounce. Going for chromatic intervals in chord changes.", blurb: "I would love to record school children for the chorus.", bpm: 76, color: "LightCoral", remote_audio_file_url: "https://s3.amazonaws.com/vibro-development/Vibes/Don't+Phunq+Up!+1.m4a", runtime: 91, vibe_id: 5 },
  {id: 12, number: 2, name: "Added bridge with guitar and bass.", blurb: "In the bridge, let me know if the synthesizer is too much. I like it, but I may tame it some more.", bpm: 76, color: "LightCoral", remote_audio_file_url: "https://s3.amazonaws.com/vibro-development/Vibes/Don't+Phunq+Up!+2.mp3", runtime: 404, vibe_id: 5 },
  {id: 13, number: 1, name: "Wrapped up the ending with tempo increase. IDK about it.", blurb: "My friend hates the steel drums— what do you guys think?", bpm: 83, color: "orange", remote_audio_file_url: "https://s3.amazonaws.com/vibro-development/Vibes/Shadang.mp3", runtime: 157, vibe_id: 6 }
]

# ideas_seeds = [
#   {title: "Maybe a breakdown?", description: "I think you should try out some new chords and do something completely different here", time: 73, vibe_id: 1, mix_id: 1, user_id: 2},
#   {title: "Love that idea!!", description: "Lemme try it. Be honest when you hear it okay?", time: 81, vibe_id: 1, mix_id: 1, user_id: 1},
#   {title: "Bad bassline", description: "The chords you play here don\'t sync well with the bassline", time: 34, vibe_id: 1, mix_id: 2, user_id: 2}
# ]

# reactions_seeds = [
#   {kind: "fire", user_id: 2, vibe_id: 1},
#   {kind: "ice", user_id: 2, vibe_id: 1},
#   {kind: "ice", user_id: 2, vibe_id: 1}
# ]

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

# ideas_seeds.each do |seed|
#   Idea.create!(seed)
# end

# reactions_seeds.each do |seed|
#   Reaction.create!(seed)
# end


# I Wonder
# All my life
# Elements
