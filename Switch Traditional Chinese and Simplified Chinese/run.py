import json
import re

'''
转换中文拼音字典文件到树型结构
author:hoothin
'''
inputFile = "./dict.txt"
outputFile = "./pinyinTree.json"

def add_to_dict(d, word, pinyin):
  if len(word) == 0:
    d['end'] = pinyin
    return
  c = word[0]
  if c not in d:
    d[c] = {}
  add_to_dict(d[c], word[1:], pinyin)

tree = {}

replacements = {
  'a': ['ā', 'á', 'ǎ', 'à'],
  'e': ['ē', 'é', 'ě', 'è'],
  'u': ['ū', 'ú', 'ǔ', 'ù'],
  'i': ['ī', 'í', 'ǐ', 'ì'],
  'o': ['ō', 'ó', 'ǒ', 'ò'],
  'ü': ['ǖ', 'ǘ', 'ǚ', 'ǜ']
}

medials = ['i', 'u', 'ü'];

def prettify(_str):
  _str = _str.replace('v', 'ü').replace('u:', 'ü');
  syllables = _str.split(' ');

  for i in range(0, len(syllables)):
    syllable = syllables[i];
    if len(syllable) <= 1:
      continue
    tone = syllable[len(syllable)-1]
    if re.match(r'\d', tone, re.I) == None:
      continue
    tone = int(tone)
    
    if tone <= 0 or tone > 5:
      continue;
    elif (tone == 5):
      syllables[i] = syllable[:len(syllable) - 1];
    else:
      for j in range(0, len(syllable)):
        currentLetter = syllable[j].lower();

        if replacements.get(currentLetter, "") != "":
          nextLetter = syllable[j + 1];
          letterToReplace = "";

          if replacements.get(nextLetter, "") != "" and currentLetter in medials:
            letterToReplace = nextLetter;
          else:
            letterToReplace = currentLetter;

          replaced = syllable.replace(letterToReplace, replacements[letterToReplace][tone - 1]);
          syllables[i] = replaced[0: len(replaced) - 1];
          break;
  return " ".join(syllables);

def main():
  data = []
  print("Reading input file")
  runtimes = 0
  with open(inputFile, 'r', encoding = 'utf-8') as txtfile:
    for line in txtfile:
      matchObject = re.match(r'(\S+) (\S+) \[(.*)\]', line, re.I)
      traditional = matchObject.group(1)
      simplified = matchObject.group(2)
      pinyin = prettify(matchObject.group(3))
      add_to_dict(tree, simplified, pinyin)
      add_to_dict(tree, traditional, pinyin)

  with open(outputFile, 'w', encoding='utf-8') as f:
    json.dump(tree, f, ensure_ascii=False)

if __name__ == '__main__':
  main()