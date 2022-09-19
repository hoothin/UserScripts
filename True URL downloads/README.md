[[Chrome Batch Download Extension]](https://chrome.google.com/webstore/detail/dbheplacgeefjnhdacijldhfliehnhka)

Decryption and Display the real URL of the download links and then manage them.(thunder,flashget,qqdl)

Can cooperate with [[Multi-Select Checkbox Companion]](https://greasyfork.org/scripts/22587) to facilitate checkbox selection


Test ALT+X：[MP4](http://a.a/h.mp4) [MP3](http://a.a/o.mp3) [RAR](http://a.a/o.rar) [7Z](http://a.a/t.7z) [ZIP](http://a.a/h.zip) [TXT](http://a.a/i.txt) [PDF](http://a.a/n.pdf)



<img src='https://greasyfork.s3.us-east-2.amazonaws.com/88zgngnu8cviax6txwj39162gej0' alt="Download sniffing" width=250>


[![img](https://img.shields.io/github/stars/hoothin/UserScripts?style=social)](https://github.com/hoothin/UserScripts)
Forked from [http://userscripts-mirror.org/scripts/show/157556](http://userscripts-mirror.org/scripts/show/157556 "Xunlei, Express, QQ Tornado dedicated link decoding by yulei")


---
change content
-
+ Add batch copy function, which can copy magnetic links, compressed files, videos, music, e-books, torrent files, eMule resources, apk, etc. in the current page for batch download, press **`Alt + x`** or Click **`True url links copy`** in the user script command menu
(You can add the prefix yourself, such as `"aria2c"` to facilitate batch offline download of aria2, you can use %i to represent the incremental number and %n to represent the file name)

+ Link item judgment optimization, exclude non-proprietary link items such as thunder:

+ Hold **`CTRL`** to decipher the private chain

+ Right click to decrypt the link to reset the bug fix

+ Fix the Chinese garbled problem of some websites, for example: http://www.80s.tw/movie/18912

+ Based on performance considerations, lock for 0.5 seconds after page change detection is triggered

+ Other modifications and optimizations
