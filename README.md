# Nextcloud Video Player
![screenshot](screenshot.jpg)

A responsive video player for Nextcloud using a skinned version of Video.js.

# Modified info

Simplified Chinese language support

Play .flv  file support

Multi-language subtitles support <sup>*</sup>

Hotkeys support

Up/down file and auto play next file

Youtube skin

Show file name in header



### *Note:

WebVTT subtitles file suppored,file name format is:

**a.b._c.vtt** 

***a***:*video file name*;

***b***:*video file extension name*;

***c*** :*lang code(like en,ja,zh)*;

***Example***:

Video file:*[Blu-raws] Stand By Me Doraemon - MOVIE (BD 1920x1080 x264 Hi10P FLAC).mkv*

Subtitles file:*[Blu-raws] Stand By Me Doraemon - MOVIE (BD 1920x1080 x264 Hi10P FLAC).mkv_zh.vtt*

## Installation
**Precondition:** disable ***Video player*** and ***Viewer*** app.

*Install step(A or B):*

**A:**:Clone this repository to **$nextcloud/apps/** and enable the app.

**B**:Simply copy the contents of this repository to **$nextcloud/apps/nextcloud-videoplayer** and enable the app.

## Credits
The player is a modified version of [official version](<https://github.com/nextcloud/files_videoplayer>) to make it responsive and improve the UI.

## License
GPLv3
