import enchant

d = enchant.Dict("en_US")
valid_words = []
def generate_words(curr, ):
     if len(curr) == 5:
          if d.check(curr):
               valid_words.append(curr)
     else:
          for i in range(26):
               generate_words(curr + chr(ord('a') + i))

generate_words('')
with open('game_words.txt', 'w') as f:
     f.write(','.join(valid_words))
valid_words.sort()

