/* CLB Nghe thuat - build 2.3.0. Readable, dependency-free bundle. */
window.ClubModuleErrors=[];

/* ===== js/i18n.js ===== */
try {
/* Author-controlled translation strings. External content is never rendered as HTML. */
(()=>{'use strict';
const copy = {
  "vi": {
    "retrySpotify":"K\u1ebft n\u1ed1i l\u1ea1i Spotify",
    "navAbout": "V\u1ec1 CLB",
    "navGallery": "T\u00e1c ph\u1ea9m",
    "navActivities": "Ho\u1ea1t \u0111\u1ed9ng",
    "navMusic": "\u00c2m nh\u1ea1c",
    "navContact": "Li\u00ean h\u1ec7",
    "heroTitle": "V\u1ebc \u0110I\u1ec0U C\u1eacU TH\u1ea4Y.<br><em>L\u00c0M \u0110I\u1ec0U C\u1eacU M\u01a0.</em>",
    "heroBody": "M\u1ed9t g\u00f3c nh\u1ecf \u1edf B\u1ea3o L\u1ed9c, m\u1ed9t kho\u1ea3ng tr\u1eddi cho \u00fd t\u01b0\u1edfng. C\u00f9ng t\u1ee5i m\u00ecnh v\u1ebd, th\u1eed, kh\u00e1m ph\u00e1 v\u00e0 t\u1ea1o n\u00ean nh\u1eefng \u0111i\u1ec1u mang m\u00e0u s\u1eafc c\u1ee7a ri\u00eang c\u1eadu.",
    "explore": "Kh\u00e1m ph\u00e1 t\u00e1c ph\u1ea9m",
    "meetUs": "G\u1eb7p ch\u00fang t\u1edb",
    "mascotTitle": "C\u00e1o nh\u00e0 CLB Ngh\u1ec7 thu\u1eadt",
    "mascotBody": "M\u1ed9t chi\u1ebfc mascot h\u01a1i tinh ngh\u1ecbch, m\u00ea m\u00e0u s\u1eafc, nh\u1ea1c hay v\u00e0 lu\u00f4n s\u1eb5n s\u00e0ng k\u00e9o m\u1ed9t \u00fd t\u01b0\u1edfng nh\u1ecf th\u00e0nh chuy\u1ec7n l\u1edbn.",
    "aboutLabel": "CH\u00daNG T\u1eda L\u00c0 AI?",
    "aboutTitle": "H\u01a1n m\u1ed9t c\u00e2u l\u1ea1c b\u1ed9.<br><em>M\u1ed9t n\u01a1i \u0111\u1ec3 l\u00e0 c\u1eadu.</em>",
    "aboutLead": "Ch\u00fang t\u1edb tin r\u1eb1ng m\u1ed7i ng\u01b0\u1eddi \u0111\u1ec1u c\u00f3 m\u1ed9t c\u00e1ch ri\u00eang \u0111\u1ec3 k\u1ec3 c\u00e2u chuy\u1ec7n c\u1ee7a m\u00ecnh \u2014 b\u1eb1ng tranh, \u1ea3nh, thi\u1ebft k\u1ebf ho\u1eb7c m\u1ed9t \u00fd t\u01b0\u1edfng ch\u01b0a t\u1eebng \u0111\u01b0\u1ee3c th\u1eed.",
    "aboutBody": "CLB Ngh\u1ec7 thu\u1eadt l\u00e0 n\u01a1i \u0111\u1ec3 c\u1eadu h\u1ecdc h\u1ecfi, th\u1eed nghi\u1ec7m, m\u1eafc l\u1ed7i, l\u00e0m l\u1ea1i v\u00e0 c\u00f9ng nhau t\u1ea1o n\u00ean nh\u1eefng th\u1ee9 c\u00f3 \u00fd ngh\u0129a. Ngh\u1ec7 thu\u1eadt kh\u00f4ng c\u1ea7n ho\u00e0n h\u1ea3o. Ch\u1ec9 c\u1ea7n b\u1eaft \u0111\u1ea7u.",
    "value1Title": "T\u1ef1 do th\u1eed",
    "value1Body": "Th\u1eed nh\u1eefng \u0111i\u1ec1u ch\u01b0a t\u1eebng th\u1eed.",
    "value2Title": "Tho\u1ea3i m\u00e1i s\u00e1ng t\u1ea1o",
    "value2Body": "Bi\u1ebfn \u00fd t\u01b0\u1edfng th\u00e0nh h\u00ecnh h\u00e0i.",
    "value3Title": "C\u00f9ng nhau l\u1edbn l\u00ean",
    "value3Body": "G\u1eb7p nh\u1eefng ng\u01b0\u1eddi c\u00f9ng nh\u1ecbp.",
    "galleryLabel": "G\u00d3C TRI\u1ec2N L\u00c3M",
    "galleryTitle": "M\u1ed9t ch\u00fat m\u00e0u<br><em>c\u1ee7a t\u1ee5i m\u00ecnh.</em>",
    "galleryBody": "M\u1ed7i t\u00e1c ph\u1ea9m, m\u1ed9t c\u00e2u chuy\u1ec7n ri\u00eang. Nh\u1eefng khung tranh \u0111\u01b0\u1ee3c treo nh\u01b0 m\u1ed9t b\u1ee9c t\u01b0\u1eddng tri\u1ec3n l\u00e3m nh\u1ecf.",
    "galleryHint": "B\u1ea5m v\u00e0o m\u1ed9t khung \u0111\u1ec3 xem t\u00e1c ph\u1ea9m l\u1edbn h\u01a1n.",
    "activityLabel": "T\u1ee4I M\u00ccNH L\u00c0M G\u00cc?",
    "activityTitle": "Kh\u00f4ng ch\u1ec9<br><em>ng\u1ed3i v\u1ebd.</em>",
    "act1": "C\u00f9ng h\u1ecdc k\u1ef9 thu\u1eadt, m\u00e0u s\u1eafc, b\u1ed1 c\u1ee5c v\u00e0 kh\u00e1m ph\u00e1 phong c\u00e1ch c\u00e1 nh\u00e2n.",
    "act2": "Kh\u00f4ng \u0111\u1ec1 b\u00e0i. Kh\u00f4ng \u00e1p l\u1ef1c. Ch\u1ec9 c\u1ea7n m\u1ed9t c\u00e2y b\u00fat v\u00e0 m\u1ed9t \u00fd t\u01b0\u1edfng.",
    "act3": "\u0110\u01b0a nh\u1eefng t\u00e1c ph\u1ea9m c\u1ee7a th\u00e0nh vi\u00ean \u0111\u1ebfn g\u1ea7n h\u01a1n v\u1edbi m\u1ecdi ng\u01b0\u1eddi.",
    "act4": "C\u00f9ng th\u1ef1c hi\u1ec7n nh\u1eefng d\u1ef1 \u00e1n ngh\u1ec7 thu\u1eadt v\u00e0 k\u1ebft h\u1ee3p v\u1edbi c\u00e1c CLB kh\u00e1c.",
    "musicLabel": "G\u00d3C \u00c2M NH\u1ea0C",
    "musicTitle": "M\u1ed9t ch\u00fat nh\u1ea1c.<br><em>M\u1ed9t tr\u1eddi c\u1ea3m h\u1ee9ng.</em>",
    "musicBody": "Ch\u1ecdn m\u1ed9t chi\u1ebfc \u0111\u0129a, nh\u1ea5n ph\u00e1t v\u00e0 \u0111\u1ec3 \u00fd t\u01b0\u1edfng tr\u00f4i theo nh\u1ea1c. M\u1ed9t g\u00f3c nghe d\u00e0nh ri\u00eang cho nh\u1eefng t\u00e2m h\u1ed3n th\u00edch s\u00e1ng t\u1ea1o.",
    "joinLabel": "H\u1eb8N C\u1eacU \u1ede CLB NGH\u1ec6 THU\u1eacT",
    "joinTitle": "Ch\u1ed7 n\u00e0y c\u00f2n thi\u1ebfu<br><em>m\u00e0u s\u1eafc c\u1ee7a c\u1eadu.</em>",
    "joinBody": "C\u1eadu kh\u00f4ng c\u1ea7n ph\u1ea3i l\u00e0 ng\u01b0\u1eddi v\u1ebd gi\u1ecfi nh\u1ea5t. Ch\u1ec9 c\u1ea7n mu\u1ed1n h\u1ecdc, mu\u1ed1n th\u1eed v\u00e0 mu\u1ed1n t\u1ea1o ra \u0111i\u1ec1u g\u00ec \u0111\u00f3 c\u00f9ng t\u1ee5i m\u00ecnh.",
    "joinButton": "\u0110i\u1ec1n form tham gia CLB",
    "contactLabel": "GI\u1eee K\u1ebeT N\u1ed0I",
    "contactTitle": "T\u00ecm ch\u00fang t\u1edb<br><em>\u1edf \u0111\u00e2y.</em>",
    "contactBody": "M\u1ed9t tin nh\u1eafn, m\u1ed9t email, ho\u1eb7c gh\u00e9 qua tr\u01b0\u1eddng \u2014 t\u1ee5i m\u00ecnh lu\u00f4n vui khi g\u1eb7p nh\u1eefng ng\u01b0\u1eddi c\u00f3 c\u00f9ng ni\u1ec1m y\u00eau th\u00edch ngh\u1ec7 thu\u1eadt.",
    "footerLine": "V\u1ebd \u0111i\u1ec1u c\u1eadu th\u1ea5y. L\u00e0m \u0111i\u1ec1u c\u1eadu m\u01a1.",
    "clubName": "CLB Ngh\u1ec7 thu\u1eadt",
    "clubFull": "CLB Ngh\u1ec7 thu\u1eadt \u00b7 THPT B\u1ea3o L\u1ed9c",
    "schoolName": "THPT B\u1ea2O L\u1ed8C",
    "pageTitle": "CLB Ngh\u1ec7 thu\u1eadt \u2014 THPT B\u1ea3o L\u1ed9c",
    "skip": "\u0110\u1ebfn n\u1ed9i dung ch\u00ednh",
    "brandHome": "CLB Ngh\u1ec7 thu\u1eadt \u2014 Trang ch\u1ee7",
    "logoAlt": "Logo CLB Ngh\u1ec7 thu\u1eadt THPT B\u1ea3o L\u1ed9c",
    "mascotAlt": "Linh v\u1eadt c\u00e1o c\u1ee7a CLB Ngh\u1ec7 thu\u1eadt",
    "mascotOpen": "M\u1edf c\u00e2u chuy\u1ec7n v\u1ec1 linh v\u1eadt CLB Ngh\u1ec7 thu\u1eadt",
    "menu": "M\u1edf ho\u1eb7c \u0111\u00f3ng menu",
    "navigation": "\u0110i\u1ec1u h\u01b0\u1edbng ch\u00ednh",
    "close": "\u0110\u00f3ng",
    "heroNote": "Kh\u00f4ng c\u1ea7n ho\u00e0n h\u1ea3o. Ch\u1ec9 c\u1ea7n l\u00e0 c\u1eadu.",
    "joinShort": "Tham gia CLB",
    "creativeCorner": "G\u00d3C S\u00c1NG T\u1ea0O",
    "tapLogo": "B\u1ea4M TH\u1eec! \u2199",
    "drawTag": "V\u1ebc!",
    "playTag": "CH\u01a0I!",
    "makeTag": "T\u1ea0O!",
    "wow": "B\u00d9M!",
    "createTag": "S\u00c1NG T\u1ea0O!",
    "ticker": "V\u1ebc \u00b7 TH\u1eec \u00b7 M\u01a0 \u00b7 S\u00c1NG T\u1ea0O \u00b7 C\u00d9NG NHAU \u00b7 ",
    "actTitle1": "WORKSHOP",
    "actTitle2": "V\u1ebc T\u1ef0 DO",
    "actTitle3": "TRI\u1ec2N L\u00c3M",
    "actTitle4": "D\u1ef0 \u00c1N S\u00c1NG T\u1ea0O",
    "makeStuff": "C\u00d9NG<br>L\u00c0M \u0110I\u1ec0U<br>HAY HO!",
    "filterLabel": "L\u1ecdc t\u00e1c ph\u1ea9m",
    "filterAll": "T\u1ea5t c\u1ea3",
    "filterPainting": "H\u1ed9i h\u1ecda",
    "filterDigital": "Ngh\u1ec7 thu\u1eadt s\u1ed1",
    "filterPhoto": "Nhi\u1ebfp \u1ea3nh",
    "filterEvents": "Ho\u1ea1t \u0111\u1ed9ng",
    "comingSoon": "T\u00e1c ph\u1ea9m m\u1edbi \u0111ang \u0111\u01b0\u1ee3c \u01b0\u01a1m m\u1ea7m.",
    "moreArt": "TH\u00caM<br>M\u00c0U<br>S\u1edaM TH\u00d4I!",
    "viewArt": "Xem t\u00e1c ph\u1ea9m",
    "soundEdition": "PH\u00d2NG NGHE \u00b7 HAI S\u1eaeC M\u00c0U",
    "deckLabel": "M\u00e1y \u0111\u0129a c\u1ee7a CLB Ngh\u1ec7 thu\u1eadt",
    "soundSelect": "TUY\u1ec2N CH\u1eccN \u00c2M NH\u1ea0C",
    "playDisc": "Ph\u00e1t ho\u1eb7c t\u1ea1m d\u1eebng \u0111\u0129a \u0111ang ch\u1ecdn",
    "play": "Ph\u00e1t nh\u1ea1c",
    "pause": "T\u1ea1m d\u1eebng",
    "standby": "CH\u1edc PH\u00c1T",
    "playing": "\u0110ANG PH\u00c1T",
    "paused": "T\u1ea0M D\u1eeaNG",
    "openSpotify": "M\u1edf \u0111\u0129a n\u00e0y tr\u00ean Spotify",
    "playerIdle": "Ch\u1ecdn \u0111\u0129a r\u1ed3i nh\u1ea5n Ph\u00e1t nh\u1ea1c.",
    "playerLoading": "\u0110ang k\u1ebft n\u1ed1i tr\u00ecnh ph\u00e1t Spotify\u2026",
    "playerReady": "\u0110\u0129a \u0111\u00e3 s\u1eb5n s\u00e0ng. Nh\u1ea5n Ph\u00e1t nh\u1ea1c ho\u1eb7c ch\u1ea1m v\u00e0o \u0111\u0129a.",
    "playerStarting": "\u0110\u00e3 g\u1eedi l\u1ec7nh ph\u00e1t t\u1edbi Spotify. \u0110ang ch\u1edd nh\u1ea1c\u2026",
    "playerPlaying": "Nh\u1ea1c \u0111ang ph\u00e1t t\u1eeb Spotify.",
    "playerPaused": "\u0110\u00e3 t\u1ea1m d\u1eebng nh\u1ea1c.",
    "playerBuffering": "Spotify \u0111ang t\u1ea3i nh\u1ea1c\u2026",
    "playerUnlock": "Spotify ch\u01b0a x\u00e1c nh\u1eadn ph\u00e1t nh\u1ea1c. H\u00e3y b\u1ea5m Play tr\u1ef1c ti\u1ebfp trong khung Spotify b\u00ean d\u01b0\u1edbi.",
    "playerError": "Ch\u01b0a k\u1ebft n\u1ed1i \u0111\u01b0\u1ee3c \u0111i\u1ec1u khi\u1ec3n. H\u00e3y d\u00f9ng khung Spotify b\u00ean d\u01b0\u1edbi ho\u1eb7c m\u1edf \u0111\u0129a tr\u00ean Spotify.",
    "embedLoading": "Tr\u00ecnh ph\u00e1t Spotify s\u1ebd hi\u1ec7n \u1edf \u0111\u00e2y.",
    "playbackNote": "Spotify c\u00f3 th\u1ec3 y\u00eau c\u1ea7u b\u1ea5m Play tr\u1ef1c ti\u1ebfp ho\u1eb7c ch\u1ec9 cho nghe th\u1eed. Trang kh\u00f4ng t\u1ef1 ph\u00e1t nh\u1ea1c khi v\u1eeba m\u1edf.",
    "chooseRecord": "H\u00f4m nay, nghe \u0111\u0129a n\u00e0o?",
    "recordChoices": "Ch\u1ecdn \u0111\u0129a nh\u1ea1c",
    "crateNote": "Hai chi\u1ebfc \u0111\u0129a, hai kho\u1ea3ng tr\u1eddi. \u0110\u1ed5i \u0111\u0129a \u0111\u1ec3 \u0111\u1ed5i playlist.",
    "selected": "\u0110ang ch\u1ecdn",
    "choose": "Ch\u1ecdn \u0111\u0129a",
    "lyrics": "L\u1edcI B\u00c0I H\u00c1T",
    "waiting": "\u0110ANG CH\u1edc",
    "trackWaiting": "B\u00e0i nh\u1ea1c c\u1ee7a c\u1eadu s\u1ebd hi\u1ec7n \u1edf \u0111\u00e2y.",
    "trackHint": "Ph\u00e1t m\u1ed9t b\u00e0i trong tr\u00ecnh ph\u00e1t b\u00ean c\u1ea1nh.",
    "trackFallback": "B\u00e0i \u0111ang ph\u00e1t",
    "trackOnSpotify": "B\u00e0i tr\u00ean Spotify \u2197",
    "progress": "Ti\u1ebfn \u0111\u1ed9 ph\u00e1t nh\u1ea1c",
    "lyricsWaiting": "L\u1eddi s\u1ebd \u0111\u01b0\u1ee3c t\u00ecm theo b\u00e0i \u0111ang ph\u00e1t. C\u1eadu c\u0169ng c\u00f3 th\u1ec3 d\u00f9ng file .lrc c\u1ee7a m\u00ecnh.",
    "lyricsScroll": "L\u1eddi b\u00e0i h\u00e1t, c\u00f3 th\u1ec3 cu\u1ed9n",
    "lyricsEmpty": "M\u1ed9t giai \u0111i\u1ec7u. M\u1ed9t kho\u1ea3ng ri\u00eang.",
    "lyricsTools": "T\u00ecm l\u1ea1i l\u1eddi / Th\u00eam file .lrc",
    "songTitle": "T\u00ean b\u00e0i h\u00e1t",
    "artist": "Ngh\u1ec7 s\u0129",
    "artistOptional": "Ngh\u1ec7 s\u0129 (n\u00ean \u0111i\u1ec1n)",
    "searchLyrics": "T\u00ecm l\u1eddi tr\u00ean LRCLIB",
    "importLrc": "Ch\u1ecdn file .lrc cho b\u00e0i \u0111ang ph\u00e1t",
    "lyricsPrivacy": "File .lrc ch\u1ec9 \u0111\u01b0\u1ee3c l\u01b0u tr\u00ean tr\u00ecnh duy\u1ec7t n\u00e0y, kh\u00f4ng t\u1ea3i l\u00ean m\u00e1y ch\u1ee7. Ch\u1ec9 s\u1eed d\u1ee5ng l\u1eddi c\u1eadu c\u00f3 quy\u1ec1n chia s\u1ebb.",
    "forgetLyrics": "X\u00f3a l\u1eddi \u0111\u00e3 gh\u00e9p cho b\u00e0i n\u00e0y",
    "lyricsLoading": "\u0110ang t\u00ecm l\u1eddi ph\u00f9 h\u1ee3p v\u1edbi b\u00e0i \u0111ang ph\u00e1t\u2026",
    "lyricsChoose": "Ch\u1ecdn \u0111\u00fang b\u1ea3n thu \u0111\u1ec3 gh\u00e9p l\u1eddi. Trang s\u1ebd nh\u1edb l\u1ef1a ch\u1ecdn cho b\u00e0i n\u00e0y.",
    "lyricsUnavailable": "Ch\u01b0a t\u00ecm th\u1ea5y l\u1eddi ph\u00f9 h\u1ee3p. C\u1eadu c\u00f3 th\u1ec3 nh\u1eadp t\u00ean b\u00e0i v\u00e0 ngh\u1ec7 s\u0129, ho\u1eb7c th\u00eam file .lrc.",
    "lyricsNetwork": "Ch\u01b0a t\u1ea3i \u0111\u01b0\u1ee3c l\u1eddi. \u00c2m nh\u1ea1c v\u1eabn ho\u1ea1t \u0111\u1ed9ng; th\u1eed l\u1ea1i ho\u1eb7c d\u00f9ng file .lrc.",
    "lyricsSynced": "L\u1eddi ch\u1ea1y theo th\u1eddi gian Spotify cung c\u1ea5p.",
    "lyricsInferred": "\u0110\u00e3 kh\u1edbp theo t\u00ean b\u00e0i v\u00e0 th\u1eddi l\u01b0\u1ee3ng. Ki\u1ec3m tra ngh\u1ec7 s\u0129; c\u00f3 th\u1ec3 ch\u1ecdn l\u1ea1i b\u00ean d\u01b0\u1edbi.",
    "lyricsPlain": "B\u1ea3n l\u1eddi n\u00e0y ch\u01b0a c\u00f3 m\u1ed1c th\u1eddi gian, n\u00ean ch\u1ec9 hi\u1ec3n th\u1ecb \u0111\u1ec3 \u0111\u1ecdc.",
    "lyricsPreview": "\u0110ang nghe th\u1eed ho\u1eb7c th\u1eddi l\u01b0\u1ee3ng kh\u00f4ng kh\u1edbp: t\u1ea1m t\u1eaft cu\u1ed9n l\u1eddi t\u1ef1 \u0111\u1ed9ng \u0111\u1ec3 tr\u00e1nh sai \u0111o\u1ea1n.",
    "lyricsInstrumental": "B\u1ea3n thu n\u00e0y \u0111\u01b0\u1ee3c \u0111\u00e1nh d\u1ea5u l\u00e0 nh\u1ea1c kh\u00f4ng l\u1eddi.",
    "lyricsNeedTrack": "H\u00e3y ph\u00e1t m\u1ed9t b\u00e0i tr\u00ean Spotify tr\u01b0\u1edbc khi gh\u00e9p l\u1eddi.",
    "lyricsBadFile": "File kh\u00f4ng h\u1ee3p l\u1ec7. D\u00f9ng file .lrc t\u1ed1i \u0111a 200 KB c\u00f3 m\u1ed1c [ph\u00fat:gi\u00e2y].",
    "lyricsImported": "\u0110\u00e3 gh\u00e9p file .lrc v\u1edbi b\u00e0i \u0111ang ph\u00e1t tr\u00ean tr\u00ecnh duy\u1ec7t n\u00e0y.",
    "lyricsNoMetadata": "Ch\u01b0a \u0111\u1ecdc \u0111\u01b0\u1ee3c t\u00ean b\u00e0i t\u1eeb Spotify. Nh\u1eadp t\u00ean b\u00e0i v\u00e0 ngh\u1ec7 s\u0129 \u1edf ph\u1ea7n T\u00ecm l\u1ea1i l\u1eddi.",
    "lyricsRateLimit": "Ngu\u1ed3n l\u1eddi \u0111ang gi\u1edbi h\u1ea1n y\u00eau c\u1ea7u. Vui l\u00f2ng ch\u1edd m\u1ed9t l\u00fac tr\u01b0\u1edbc khi th\u1eed l\u1ea1i.",
    "lyricsDisabled": "T\u00ecm l\u1eddi tr\u1ef1c tuy\u1ebfn \u0111ang t\u1eaft. C\u1eadu v\u1eabn c\u00f3 th\u1ec3 d\u00f9ng file .lrc.",
    "lyricsLocal": "Ngu\u1ed3n: file .lrc c\u1ee7a c\u1eadu",
    "lyricsLibrary": "Ngu\u1ed3n: file .lrc c\u1ee7a CLB",
    "lyricsProvider": "Ngu\u1ed3n l\u1eddi: LRCLIB (kh\u00f4ng ph\u1ea3i Spotify)",
    "synced": "\u0110\u1ed2NG B\u1ed8",
    "plain": "B\u1ea2N \u0110\u1eccC",
    "chooseLyrics": "CH\u1eccN B\u1ea2N THU",
    "instrumental": "KH\u00d4NG L\u1edcI",
    "localSaved": "Ch\u1ec9 l\u01b0u tr\u00ean thi\u1ebft b\u1ecb n\u00e0y",
    "belong": "C\u1eacU<br>THU\u1ed8C V\u1ec0<br>N\u01a0I N\u00c0Y!",
    "visit": "GH\u00c9 CH\u01a0I",
    "schoolAddress": "Tr\u01b0\u1eddng THPT B\u1ea3o L\u1ed9c \u2014 C\u01a1 s\u1edf 1",
    "motionOn": "Chuy\u1ec3n \u0111\u1ed9ng: B\u1eadt",
    "motionOff": "Chuy\u1ec3n \u0111\u1ed9ng: T\u1eaft",
    "motionSystem": "Chuy\u1ec3n \u0111\u1ed9ng: Gi\u1ea3m theo thi\u1ebft b\u1ecb",
    "backTop": "\u2191 L\u00ean \u0111\u1ea7u trang",
    "selectLyrics": "D\u00f9ng b\u1ea3n n\u00e0y",
    "searching": "\u0110ANG T\u00ccM",
    "metaDescription": "CLB Ngh\u1ec7 thu\u1eadt \u2014 THPT B\u1ea3o L\u1ed9c. Kh\u00f4ng gian s\u00e1ng t\u1ea1o, tri\u1ec3n l\u00e3m v\u00e0 \u00e2m nh\u1ea1c c\u1ee7a h\u1ecdc sinh.",
    "tryMotion": "Th\u1eed chuy\u1ec3n \u0111\u1ed9ng \u00b7 kh\u00f4ng ph\u00e1t nh\u1ea1c",
    "stopMotionDemo": "D\u1eebng th\u1eed chuy\u1ec3n \u0111\u1ed9ng",
    "motionDemoNotice": "\u0110ang th\u1eed chuy\u1ec3n \u0111\u1ed9ng trong 6,5 gi\u00e2y. Kh\u00f4ng ph\u00e1t nh\u1ea1c, kh\u00f4ng ph\u1ea3i tr\u1ea1ng th\u00e1i Spotify.",
    "motionDemoDisabled": "Chuy\u1ec3n \u0111\u1ed9ng \u0111ang t\u1eaft. Ch\u1ecdn \u0110\u1ea7y \u0111\u1ee7 \u1edf n\u00fat g\u00f3c d\u01b0\u1edbi \u0111\u1ec3 th\u1eed.",
    "motionDemoPlaying": "\u0110\u0129a \u0111ang ch\u1ea1y theo Spotify; kh\u00f4ng c\u1ea7n b\u1eadt ch\u1ebf \u0111\u1ed9 th\u1eed.",
    "motionControl": "Chuy\u1ec3n \u0111\u1ed9ng tr\u00ean trang",
    "motionAuto": "Theo thi\u1ebft b\u1ecb",
    "motionFull": "\u0110\u1ea7y \u0111\u1ee7",
    "motionDisabled": "T\u1eaft chuy\u1ec3n \u0111\u1ed9ng",
    "motionHelp": "Ch\u1ebf \u0111\u1ed9 Theo thi\u1ebft b\u1ecb t\u00f4n tr\u1ecdng c\u00e0i \u0111\u1eb7t gi\u1ea3m chuy\u1ec3n \u0111\u1ed9ng. Ch\u1ecdn \u0110\u1ea7y \u0111\u1ee7 \u0111\u1ec3 ch\u1ee7 \u0111\u1ed9ng b\u1eadt hi\u1ec7u \u1ee9ng."
  },
  "en": {
    "retrySpotify":"Reconnect Spotify",
    "navAbout": "About",
    "navGallery": "Gallery",
    "navActivities": "Activities",
    "navMusic": "Music",
    "navContact": "Contact",
    "heroTitle": "DRAW WHAT YOU SEE.<br><em>MAKE WHAT YOU DREAM.</em>",
    "heroBody": "A little corner in B\u1ea3o L\u1ed9c with plenty of room for ideas. Draw, experiment, explore, and make something that feels unmistakably yours.",
    "explore": "Explore the gallery",
    "meetUs": "Meet the club",
    "mascotTitle": "Meet our Art Club fox",
    "mascotBody": "A playful mascot who loves color, good music, and turning a tiny idea into something unexpectedly big.",
    "aboutLabel": "WHO ARE WE?",
    "aboutTitle": "More than a club.<br><em>A place to be yourself.</em>",
    "aboutLead": "We believe everyone has a different way to tell a story \u2014 through a painting, a photo, a design, or an idea nobody has tried yet.",
    "aboutBody": "Art Club is where you can learn, experiment, make mistakes, start over, and create things that matter together. Art does not need perfection. It only needs a beginning.",
    "value1Title": "Try freely",
    "value1Body": "Try what you have never tried before.",
    "value2Title": "Create comfortably",
    "value2Body": "Give shape to an idea.",
    "value3Title": "Grow together",
    "value3Body": "Meet people on the same wavelength.",
    "galleryLabel": "EXHIBITION WALL",
    "galleryTitle": "A little color<br><em>from our world.</em>",
    "galleryBody": "Every piece has its own story, pinned and hung like a small studio exhibition wall.",
    "galleryHint": "Tap a frame to view the artwork.",
    "activityLabel": "WHAT WE DO",
    "activityTitle": "More than just<br><em>sitting and drawing.</em>",
    "act1": "Learn techniques, color, composition and discover your own visual style.",
    "act2": "No prompt. No pressure. Just a pen and an idea.",
    "act3": "Bring member artworks closer to everyone.",
    "act4": "Build creative projects together and collaborate with other clubs.",
    "musicLabel": "MUSIC CORNER",
    "musicTitle": "A little music.<br><em>A lot of inspiration.</em>",
    "musicBody": "Choose a record, press play, and let your ideas drift with the music. A little listening room for creative souls.",
    "joinLabel": "SEE YOU AT ART CLUB",
    "joinTitle": "This place still needs<br><em>your color.</em>",
    "joinBody": "You do not need to be the best artist in the room. You only need to want to learn, try and make something with us.",
    "joinButton": "Fill in the membership form",
    "contactLabel": "STAY CONNECTED",
    "contactTitle": "Find us<br><em>right here.</em>",
    "contactBody": "Send a message, an email, or stop by school \u2014 we are always happy to meet people who love making things.",
    "footerLine": "Draw what you see. Make what you dream.",
    "clubName": "Art Club",
    "clubFull": "Art Club \u00b7 B\u1ea3o L\u1ed9c High School",
    "schoolName": "B\u1ea2O L\u1ed8C HIGH SCHOOL",
    "pageTitle": "Art Club \u2014 B\u1ea3o L\u1ed9c High School",
    "skip": "Skip to main content",
    "brandHome": "Art Club \u2014 Home",
    "logoAlt": "B\u1ea3o L\u1ed9c High School Art Club logo",
    "mascotAlt": "The Art Club fox mascot",
    "mascotOpen": "Meet the Art Club mascot",
    "menu": "Open or close menu",
    "navigation": "Main navigation",
    "close": "Close",
    "heroNote": "Not perfect. Just completely you.",
    "joinShort": "Join the club",
    "creativeCorner": "THE CREATIVE CORNER",
    "tapLogo": "TAP ME! \u2199",
    "drawTag": "DRAW!",
    "playTag": "PLAY!",
    "makeTag": "MAKE!",
    "wow": "POP!",
    "createTag": "CREATE!",
    "ticker": "DRAW \u00b7 TRY \u00b7 DREAM \u00b7 CREATE \u00b7 TOGETHER \u00b7 ",
    "actTitle1": "WORKSHOP",
    "actTitle2": "FREE DRAWING",
    "actTitle3": "EXHIBITION",
    "actTitle4": "CREATIVE PROJECT",
    "makeStuff": "LET\u2019S<br>MAKE<br>STUFF!",
    "filterLabel": "Filter artworks",
    "filterAll": "All",
    "filterPainting": "Painting",
    "filterDigital": "Digital art",
    "filterPhoto": "Photography",
    "filterEvents": "Activities",
    "comingSoon": "New artworks are growing here.",
    "moreArt": "MORE<br>ART<br>SOON!",
    "viewArt": "View artwork",
    "soundEdition": "THE LISTENING ROOM \u00b7 TWO MOODS",
    "deckLabel": "Art Club record player",
    "soundSelect": "SOUND SELECT",
    "playDisc": "Play or pause the selected record",
    "play": "Play music",
    "pause": "Pause",
    "standby": "STANDBY",
    "playing": "PLAYING",
    "paused": "PAUSED",
    "openSpotify": "Open this record on Spotify",
    "playerIdle": "Choose a record, then press Play music.",
    "playerLoading": "Connecting to the Spotify player\u2026",
    "playerReady": "Your record is ready. Press Play music or tap the record.",
    "playerStarting": "Play requested. Waiting for Spotify\u2026",
    "playerPlaying": "Music is playing from Spotify.",
    "playerPaused": "Music is paused.",
    "playerBuffering": "Spotify is buffering\u2026",
    "playerUnlock": "Spotify has not confirmed playback. Press Play directly in the Spotify player below.",
    "playerError": "The controller could not connect. Use the Spotify player below or open this record on Spotify.",
    "embedLoading": "The Spotify player will appear here.",
    "playbackNote": "Spotify may require a direct Play tap or offer previews only. This page never plays music on its own.",
    "chooseRecord": "What\u2019s on your turntable?",
    "recordChoices": "Choose a record",
    "crateNote": "Two records, two little worlds. Switch records to switch playlists.",
    "selected": "Selected",
    "choose": "Choose record",
    "lyrics": "THE LYRICS",
    "waiting": "WAITING",
    "trackWaiting": "Your next song belongs here.",
    "trackHint": "Play a song in the Spotify player.",
    "trackFallback": "Current track",
    "trackOnSpotify": "Track on Spotify \u2197",
    "progress": "Playback progress",
    "lyricsWaiting": "Lyrics are matched to the current track. You can also use your own .lrc file.",
    "lyricsScroll": "Lyrics, scrollable",
    "lyricsEmpty": "A melody. A little space of your own.",
    "lyricsTools": "Find lyrics / Add an .lrc file",
    "songTitle": "Song title",
    "artist": "Artist",
    "artistOptional": "Artist (recommended)",
    "searchLyrics": "Find lyrics on LRCLIB",
    "importLrc": "Choose an .lrc file for the current track",
    "lyricsPrivacy": "Your .lrc stays in this browser and is not uploaded. Only use lyrics you have permission to share.",
    "forgetLyrics": "Forget lyrics matched to this track",
    "lyricsLoading": "Looking for lyrics for the current song\u2026",
    "lyricsChoose": "Choose the correct recording. This browser will remember your choice for this track.",
    "lyricsUnavailable": "No suitable lyrics found. Enter a title and artist, or add your own .lrc file.",
    "lyricsNetwork": "Lyrics could not load. Music is unaffected; try again or use an .lrc file.",
    "lyricsSynced": "Lyrics follow the playback time reported by Spotify.",
    "lyricsInferred": "Matched by title and duration. Check the artist; you can choose another version below.",
    "lyricsPlain": "These lyrics have no timestamps, so they are displayed for reading only.",
    "lyricsPreview": "Preview or duration mismatch: automatic lyric scrolling is paused to avoid incorrect timing.",
    "lyricsInstrumental": "This recording is marked as instrumental.",
    "lyricsNeedTrack": "Play a Spotify track before matching lyrics.",
    "lyricsBadFile": "Use an .lrc file under 200 KB with [minutes:seconds] timestamps.",
    "lyricsImported": "Your .lrc is matched to the current track in this browser.",
    "lyricsNoMetadata": "Spotify did not provide a usable title. Enter the song and artist under Find lyrics.",
    "lyricsRateLimit": "The lyrics provider is rate-limiting requests. Please wait before trying again.",
    "lyricsDisabled": "Online lyrics are disabled. You can still use an .lrc file.",
    "lyricsLocal": "Source: your .lrc file",
    "lyricsLibrary": "Source: the club\u2019s .lrc file",
    "lyricsProvider": "Lyrics source: LRCLIB (not Spotify)",
    "synced": "SYNCED",
    "plain": "READ ALONG",
    "chooseLyrics": "CHOOSE VERSION",
    "instrumental": "INSTRUMENTAL",
    "localSaved": "Saved on this device only",
    "belong": "YOU<br>BELONG<br>HERE!",
    "visit": "STOP BY",
    "schoolAddress": "B\u1ea3o L\u1ed9c High School \u2014 Campus 1",
    "motionOn": "Motion: On",
    "motionOff": "Motion: Off",
    "motionSystem": "Motion: Device preference",
    "backTop": "\u2191 Back to top",
    "selectLyrics": "Use these lyrics",
    "searching": "SEARCHING",
    "metaDescription": "Art Club \u2014 B\u1ea3o L\u1ed9c High School. A creative space for student artworks, exhibitions and music.",
    "tryMotion": "Try motion \u00b7 no audio",
    "stopMotionDemo": "Stop motion preview",
    "motionDemoNotice": "6.5-second motion preview. No audio; this is not Spotify playback.",
    "motionDemoDisabled": "Motion is off. Choose Full motion in the bottom corner to try it.",
    "motionDemoPlaying": "The record is already following Spotify; no preview is needed.",
    "motionControl": "Website motion",
    "motionAuto": "Follow device setting",
    "motionFull": "Full motion",
    "motionDisabled": "Motion off",
    "motionHelp": "Device mode respects reduced-motion settings. Select Full motion to explicitly enable animations."
  }
};

Object.assign(copy.vi,{
 motionQuiet:'Nh\u1eb9',motionQuietLabel:'Chuy\u1ec3n \u0111\u1ed9ng: Nh\u1eb9',
 motionReasonSystem:'Thi\u1ebft b\u1ecb \u0111ang y\u00eau c\u1ea7u gi\u1ea3m chuy\u1ec3n \u0111\u1ed9ng. Ch\u1ecdn \u0110\u1ea7y \u0111\u1ee7 \u0111\u1ec3 ch\u1ee7 \u0111\u1ed9ng b\u1eadt l\u1ea1i.',
 motionReasonOff:'Hi\u1ec7u \u1ee9ng \u0111ang t\u1eaft theo l\u1ef1a ch\u1ecdn \u0111\u00e3 l\u01b0u tr\u00ean tr\u00ecnh duy\u1ec7t n\u00e0y.',
 motionReasonQuiet:'Chuy\u1ec3n \u0111\u1ed9ng nh\u1eb9, b\u1ecf nghi\u00eang theo chu\u1ed9t. Ph\u00f9 h\u1ee3p \u0111\u1ecdc n\u1ed9i dung.',
 motionReasonOn:'Hi\u1ec7u \u1ee9ng \u0111ang b\u1eadt. R\u00ea chu\u1ed9t tr\u00ean th\u1ebb ho\u1eb7c ch\u1ea1m v\u00e0o mascot \u0111\u1ec3 th\u1eed.',
 motionHelp:'Theo thi\u1ebft b\u1ecb t\u00f4n tr\u1ecdng c\u00e0i \u0111\u1eb7t gi\u1ea3m chuy\u1ec3n \u0111\u1ed9ng. \u0110\u1ea7y \u0111\u1ee7 v\u00e0 Nh\u1eb9 l\u00e0 l\u1ef1a ch\u1ecdn ch\u1ee7 \u0111\u1ed9ng c\u1ee7a c\u1eadu.'
});
Object.assign(copy.en,{
 motionQuiet:'Gentle',motionQuietLabel:'Motion: Gentle',
 motionReasonSystem:'Your device requests reduced motion. Choose Full to explicitly enable animation.',
 motionReasonOff:'Animation is off according to the saved preference in this browser.',
 motionReasonQuiet:'Gentle movement without pointer tilt, for comfortable reading.',
 motionReasonOn:'Animation is enabled. Hover over a card or tap the mascot to try it.',
 motionHelp:'System follows reduced-motion preferences. Full and Gentle explicitly enable animation.'
});
const storage = {
  get(key, fallback = null) { try { return localStorage.getItem(key) ?? fallback; } catch { return fallback; } },
  set(key, value) { try { localStorage.setItem(key, value); return true; } catch { return false; } },
  remove(key) { try { localStorage.removeItem(key); } catch {} }
};
let language = storage.get('artclub-lang', 'vi') === 'en' ? 'en' : 'vi';
function local(value) {
  if (value && typeof value === 'object') return value[language] ?? value.vi ?? value.en ?? '';
  return value == null ? '' : String(value);
}
function t(key) { return copy[language][key] ?? key; }
function apply(root = document) {
  root.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = t(el.dataset.i18n); });
  root.querySelectorAll('[data-i18n-html]').forEach(el => { el.innerHTML = t(el.dataset.i18nHtml); });
  ['aria', 'alt', 'placeholder', 'title'].forEach(type => {
    root.querySelectorAll(`[data-i18n-${type}]`).forEach(el => {
      el.setAttribute(type === 'aria' ? 'aria-label' : type, t(el.getAttribute(`data-i18n-${type}`)));
    });
  });
}
function setLanguage(lang) {
  language = lang === 'en' ? 'en' : 'vi';
  storage.set('artclub-lang', language);
  document.documentElement.lang = language;
  document.title = t('pageTitle');
  document.querySelector('meta[name="description"]')?.setAttribute('content', t('metaDescription'));
  apply();
  document.querySelectorAll('[data-lang-option]').forEach(el => el.classList.toggle('is-current', el.dataset.langOption === language));
  document.querySelector('.lang-toggle')?.setAttribute('aria-label', language === 'vi' ? 'Switch to English' : 'Chuyển sang tiếng Việt');
  document.dispatchEvent(new CustomEvent('club:language', { detail: language }));
}
window.Club = { t, local, storage, apply, setLanguage, get language() { return language; } };
document.querySelector('.lang-toggle')?.addEventListener('click', () => setLanguage(language === 'vi' ? 'en' : 'vi'));
setLanguage(language);
})();

} catch(error) { window.ClubModuleErrors.push('js/i18n.js'); console.error('js/i18n.js', error); }


/* ===== js/motion.js ===== */
try {
/* Motion 2.3: dependency-free, progressive enhancement; no network dependency.
   Reveal uses translate. Hover uses transform. Ambient effects run on children.
   This separation prevents one animation from overwriting another. */
(() => {
  'use strict';
  const root = document.documentElement;
  const $ = id => document.getElementById(id);
  const t = key => window.Club?.t(key) || key;
  const mq = query => window.matchMedia?.(query) || { matches: false };
  const reduce = mq('(prefers-reduced-motion: reduce)');
  const fine = mq('(any-hover: hover) and (any-pointer: fine)');
  const listenMedia = (m, fn) => m.addEventListener ? m.addEventListener('change', fn) : m.addListener?.(fn);
  const store = { get(k) { try { return localStorage.getItem(k); } catch { return null; } }, set(k,v) { try { localStorage.setItem(k,v); } catch {} } };
  let choice = store.get('artclub-motion-v23') || root.dataset.motionChoice || 'auto';
  if (!['auto','full','quiet','off'].includes(choice)) choice='auto';
  let enabled = true;
  const transient = new Set();
  const visible = new Set();
  const registered = new WeakSet();
  const observedNodes = new Set();
  const hovered = new Map();
  const bound = new WeakSet();
  const layer = $('fxLayer');
  let raf = 0, prev = 0;
  const stage = document.querySelector('[data-parallax-root]');
  const parallax = { x:0, y:0, tx:0, ty:0 };
  const clamp = (v,min,max) => Math.min(max,Math.max(min,v));

  function animate(el, frames, options, remove=false) {
    if (!enabled || !el?.animate || document.hidden) { if(remove) el?.remove(); return null; }
    let a;
    try { a = el.animate(frames, options); } catch { if(remove)el.remove(); return null; }
    const item = { a, el, remove }; transient.add(item);
    const clean = () => { transient.delete(item); if(remove) el.remove(); };
    a.finished.then(clean,clean);
    return a;
  }
  function resetPointer() {
    hovered.forEach((s,el) => { el.style.setProperty('--mx','0px'); el.style.setProperty('--my','0px'); el.style.setProperty('--rx','0deg'); el.style.setProperty('--ry','0deg'); });
    hovered.clear();
    Object.assign(parallax,{x:0,y:0,tx:0,ty:0});
    stage?.querySelectorAll('[data-depth]').forEach(el => el.style.translate='0px 0px');
  }
  function syncPreference() {
    enabled = choice==='full' || choice==='quiet' || (choice==='auto' && !reduce.matches);
    root.dataset.motion=enabled?'full':'off';
    root.dataset.motionChoice=choice;
    root.dataset.motionLevel=choice;
    $('motionDock')?.setAttribute('data-state',enabled?'on':'off');
    if($('motionReason')) $('motionReason').textContent=t(!enabled && choice==='auto'?'motionReasonSystem':!enabled?'motionReasonOff':choice==='quiet'?'motionReasonQuiet':'motionReasonOn');
    const label = t(enabled?(choice==='quiet'?'motionQuietLabel':'motionOn'):choice==='auto'?'motionSystem':'motionOff');
    if($('motionText')) $('motionText').textContent=label;
    if($('motionDockStatus')) $('motionDockStatus').textContent=label;
    if($('motionMode')) $('motionMode').value=choice;
    $('motionToggle')?.setAttribute('aria-pressed',String(enabled));
    if(choice==='quiet')resetPointer();
    if(!enabled) {
      transient.forEach(({a})=>a.cancel());
      resetPointer();
      document.querySelectorAll('.js-reveal').forEach(el=>{el.classList.add('in-view');el.classList.remove('js-reveal');});
      cancelAnimationFrame(raf);raf=0;
    }
    document.dispatchEvent(new CustomEvent('club:motion',{detail:enabled}));
  }
  function setChoice(value) { if(!['auto','full','quiet','off'].includes(value))return; choice=value;store.set('artclub-motion-v23',choice);syncPreference(); }
  $('motionMode')?.addEventListener('change',e=>setChoice(e.target.value));
  $('motionToggle')?.addEventListener('click',()=>setChoice(enabled?'off':'full'));
  listenMedia(reduce,syncPreference);
  listenMedia(fine,resetPointer);
  document.addEventListener('club:language',syncPreference);
  document.addEventListener('visibilitychange',()=>{
    root.dataset.pageHidden=String(document.hidden);
    if(document.hidden){cancelAnimationFrame(raf);raf=0;prev=0;resetPointer();transient.forEach(({a})=>a.finish());}
  });

  const observer = 'IntersectionObserver' in window ? new IntersectionObserver(entries=>{
    entries.forEach(({target,isIntersecting})=>{
      target.classList.toggle('ambient-active',isIntersecting);
      target.classList.toggle('ambient-paused',!isIntersecting);
      if(isIntersecting)visible.add(target);else visible.delete(target);
      if(isIntersecting && target.classList.contains('js-reveal')) {
        target.classList.add('in-view');
        const direction=target.dataset.reveal;
        const from=direction==='left'?'-42px 0px':direction==='right'?'42px 0px':'0px 36px';
        animate(target,[{opacity:0,translate:from},{opacity:1,translate:'0px 0px'}],{duration:900,delay:Number(target.dataset.stagger)||0,easing:'cubic-bezier(.16,1,.3,1)'});
        target.classList.remove('js-reveal');
      }
    });
  },{threshold:0.04,rootMargin:'35px 0px 20px'}) : null;

  function register(scope=document) {
    observedNodes.forEach(el=>{if(!el.isConnected){observer?.unobserve(el);visible.delete(el);hovered.delete(el);observedNodes.delete(el);}});
    scope.querySelectorAll('.reveal,[data-ambient],.gallery-card').forEach((el,index)=>{
      if(registered.has(el))return;
      registered.add(el);observedNodes.add(el);
      if(el.matches('.reveal,.gallery-card') && enabled && observer) {
        el.classList.add('js-reveal');el.dataset.stagger=String((index%3)*75);
      }
      if(observer)observer.observe(el);else el.classList.add('ambient-active','in-view');
    });
    scope.querySelectorAll('.gallery-card,.activity-card,.values article,.record-option').forEach(el=>bindPointer(el,'card'));
    scope.querySelectorAll('.comic-button,.header-join,.play-vinyl,.filter,.preview-motion').forEach(el=>bindPointer(el,'button'));
  }
  function bindPointer(el,type) {
    if(bound.has(el))return;
    bound.add(el);el.classList.add(type==='card'?'motion-card':'motion-button');
    el.addEventListener('pointerenter',e=>{
      if(!enabled||choice==='quiet'||e.pointerType==='touch')return;
      const s={x:0,y:0,tx:0,ty:0,type,rect:el.getBoundingClientRect()};
      hovered.set(el,s);move(e,s);wake();
    });
    el.addEventListener('pointermove',e=>{const s=hovered.get(el);if(s){move(e,s);wake();}},{passive:true});
    el.addEventListener('pointerleave',()=>{const s=hovered.get(el);if(s){s.tx=s.ty=0;s.leaving=true;wake();}});
    function move(e,s) {
      s.tx=clamp((e.clientX-s.rect.left)/s.rect.width-.5,-.5,.5)*2;
      s.ty=clamp((e.clientY-s.rect.top)/s.rect.height-.5,-.5,.5)*2;
      s.leaving=false;
    }
  }
  function wake() {if(!raf&&enabled&&!document.hidden){prev=0;raf=requestAnimationFrame(tick);}}
  function tick(now) {
    raf=0;if(!enabled||document.hidden)return;
    const dt=prev?Math.min(40,now-prev):16.7;prev=now;
    const easing=1-Math.exp(-dt/100);let unfinished=false;
    hovered.forEach((s,el)=>{
      if(!el.isConnected){hovered.delete(el);return;}
      s.x+=(s.tx-s.x)*easing;s.y+=(s.ty-s.y)*easing;
      if(s.type==='card') {
        el.style.setProperty('--rx',`${(-s.y*3.8).toFixed(3)}deg`);
        el.style.setProperty('--ry',`${(s.x*4.8).toFixed(3)}deg`);
        el.style.setProperty('--shine-x',`${50+s.x*25}%`);
        el.style.setProperty('--shine-y',`${50+s.y*25}%`);
      } else {
        el.style.setProperty('--mx',`${(s.x*4).toFixed(3)}px`);
        el.style.setProperty('--my',`${(s.y*3).toFixed(3)}px`);
      }
      if(Math.abs(s.tx-s.x)+Math.abs(s.ty-s.y)>.001)unfinished=true;
      else if(s.leaving)hovered.delete(el);
    });
    parallax.x+=(parallax.tx-parallax.x)*easing;
    parallax.y+=(parallax.ty-parallax.y)*easing;
    stage?.querySelectorAll('[data-depth]').forEach(el=>{
      const d=Number(el.dataset.depth)||.5;
      el.style.translate=`${(parallax.x*d).toFixed(2)}px ${(parallax.y*d).toFixed(2)}px`;
    });
    if(Math.abs(parallax.tx-parallax.x)+Math.abs(parallax.ty-parallax.y)>.02)unfinished=true;
    if(unfinished)raf=requestAnimationFrame(tick);else prev=0;
  }
  stage?.addEventListener('pointermove',e=>{
    if(!enabled||choice==='quiet'||e.pointerType==='touch')return;
    const r=stage.getBoundingClientRect();
    parallax.tx=((e.clientX-r.left)/r.width-.5)*46;
    parallax.ty=((e.clientY-r.top)/r.height-.5)*36;wake();
  },{passive:true});
  stage?.addEventListener('pointerleave',()=>{parallax.tx=parallax.ty=0;wake();});
  let scrollRaf=0;
  window.addEventListener('scroll',()=>{
    if(scrollRaf)return;
    scrollRaf=requestAnimationFrame(()=>{
      scrollRaf=0;
      const max=document.documentElement.scrollHeight-innerHeight;
      $('scrollProgress')?.style.setProperty('--progress',max?String(scrollY/max):'0');
      if(enabled&&!fine.matches&&visible.has(stage)){
        parallax.ty=clamp((stage.getBoundingClientRect().top-innerHeight*.3)*.035,-15,15);wake();
      }
    });
  },{passive:true});
  window.addEventListener('resize',resetPointer,{passive:true});

  function burst(target,word='',count=10) {
    if(!enabled||document.hidden||!target||!layer||transient.size>65)return;
    count=Math.min(count,innerWidth<801?8:14);
    const r=target.getBoundingClientRect(),x=r.left+r.width/2,y=r.top+r.height/2;
    if(y<0||y>innerHeight)return;
    const colors=['#e0bb58','#a44331','#355972','#d990a4','#536b48'];
    const radius=clamp(r.width*.38,45,150);
    for(let i=0;i<Math.min(count,16);i++) {
      const el=document.createElement('span');el.className='fx-particle'+(i%3===0?' is-star':'');
      Object.assign(el.style,{left:`${x}px`,top:`${y}px`,background:colors[i%5]});layer.append(el);
      const a=i/count*Math.PI*2-Math.PI/2,d=radius+30+Math.random()*55,dx=Math.cos(a)*d,dy=Math.sin(a)*d;
      animate(el,[{transform:'translate(-50%,-50%) scale(.15)',opacity:0},
        {transform:`translate(calc(-50% + ${dx*.6}px),calc(-50% + ${dy*.6}px)) scale(1.15) rotate(80deg)`,opacity:1,offset:.3},
        {transform:`translate(calc(-50% + ${dx}px),calc(-50% + ${dy+35}px)) scale(.3) rotate(180deg)`,opacity:0}],
        {duration:1000+Math.random()*350,easing:'cubic-bezier(.16,1,.3,1)'},true);
    }
    if(word) {
      const el=document.createElement('span');el.className='fx-word';el.textContent=word;
      el.style.left=`${clamp(x,85,innerWidth-90)}px`;el.style.top=`${Math.max(100,y)}px`;layer.append(el);
      animate(el,[{transform:'translate(-50%,0) scale(.1) rotate(-15deg)',opacity:0},
        {transform:'translate(-50%,-120%) scale(1.08) rotate(-6deg)',opacity:1,offset:.3},
        {transform:'translate(-50%,-135%) scale(1) rotate(-4deg)',opacity:1,offset:.72},
        {transform:'translate(-50%,-210%) scale(.85) rotate(4deg)',opacity:0}],
        {duration:1500,easing:'cubic-bezier(.22,1,.36,1)'},true);
    }
  }
  function flyRecord(source,destination) {
    if(!enabled||!source||!destination||document.hidden)return;
    const a=source.getBoundingClientRect(),b=destination.getBoundingClientRect();
    if(a.bottom<0||a.top>innerHeight||b.bottom<0||b.top>innerHeight)return;
    const node=source.cloneNode(true);node.classList.add('disc-flight');node.setAttribute('aria-hidden','true');
    Object.assign(node.style,{left:`${a.left}px`,top:`${a.top}px`,width:`${a.width}px`,height:`${a.height}px`,background:getComputedStyle(source).background});
    layer.append(node);
    const dx=b.left+b.width/2-a.left-a.width/2,dy=b.top+b.height/2-a.top-a.height/2;
    animate(node,[{transform:'translate(0,0) rotate(-8deg)',opacity:.8},
      {transform:`translate(${dx*.45}px,${dy*.45-50}px) rotate(10deg) scale(1.15)`,opacity:1,offset:.46},
      {transform:`translate(${dx}px,${dy}px) rotate(24deg) scale(${b.width/a.width*.8})`,opacity:0}],
      {duration:1000,easing:'cubic-bezier(.32,0,.12,1)'},true);
  }
  document.addEventListener('pointerdown',e=>{
    const button=e.target.closest('button,a.comic-button,a.header-join');
    if(!enabled||!button||button.closest('#motionDock')||button.id==='motionToggle')return;
    if(button.classList.contains('hero-logo')||button.classList.contains('vinyl-hit'))return;
    const r=button.getBoundingClientRect(),ring=document.createElement('span');ring.className='tap-ring';
    ring.style.left=`${e.clientX||r.left+r.width/2}px`;ring.style.top=`${e.clientY||r.top+r.height/2}px`;layer?.append(ring);
    animate(ring,[{transform:'translate(-50%,-50%) scale(.25)',opacity:.65},{transform:'translate(-50%,-50%) scale(1.8)',opacity:0}],{duration:650,easing:'ease-out'},true);
  },{passive:true});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&$('motionDock'))$('motionDock').open=false;});
  document.addEventListener('click',e=>{if(!$('motionDock')?.contains(e.target)&&$('motionDock'))$('motionDock').open=false;});

  window.ClubMotion={version:'2.3.0',burst,flyRecord,animate,register,setChoice,get enabled(){return enabled;},get choice(){return choice;}};
  window.addEventListener('pageshow',()=>{root.dataset.pageHidden='false';syncPreference();register();});
  window.addEventListener('blur',resetPointer);
  root.dataset.pageHidden=String(document.hidden);
  syncPreference();register();
  document.dispatchEvent(new CustomEvent('club:motion-ready'));
})();

} catch(error) { window.ClubModuleErrors.push('js/motion.js'); console.error('js/motion.js', error); }


/* ===== js/turntable.js ===== */
try {
/* Independent turntable motor. No external library, no CSS animation reset.
   Spotify events drive setPlayback(). Demo mode is explicitly silent and labelled. */
(() => {
  'use strict';
  const deck=document.getElementById('turntable');
  const vinyl=document.getElementById('vinyl');
  const rotor=deck?.querySelector('.arm-rotor');
  if(!deck||!vinyl||!rotor)return;
  const t=key=>window.Club?.t(key)||key;
  const button=document.getElementById('previewMotion');
  const notice=document.getElementById('motionPreviewStatus');
  const arm=deck.querySelector('.tonearm');
  const smooth=x=>{x=Math.min(1,Math.max(0,x));return x*x*x*(x*(x*6-15)+10);};
  let frame=0,last=0,angle=0,speed=0,armAngle=-6,lift=0;
  let playing=false,buffering=false,engaged=false,progress=0,demo=false,demoTimer=0;
  let allowed=window.ClubMotion?.enabled!==false,visible=true;
  let armMotion=null;
  function moveArm(on) {
    if(engaged===on)return;
    engaged=on;
    armMotion={elapsed:0,from:armAngle,to:on?23+progress*5:-6,liftFrom:lift};
    deck.dataset.arm=on?'lowering':'lifting';
  }
  function paint() {
    vinyl.style.transform=`rotate(${angle.toFixed(3)}deg)`;
    rotor.style.transform=`rotate(${armAngle.toFixed(3)}deg)`;
    arm.style.setProperty('--arm-lift',lift.toFixed(3));
    deck.style.setProperty('--motor-speed',speed.toFixed(2));
  }
  function wake() {if(!frame&&visible&&!document.hidden&&allowed){last=0;frame=requestAnimationFrame(tick);}}
  function tick(now) {
    frame=0;if(!allowed||document.hidden||!visible)return;
    const dt=last?Math.min(.045,(now-last)/1000):1/60;last=now;
    const shouldRun=playing||demo;
    const target=shouldRun?(buffering&&!demo?65:200):0;
    const tau=target>speed?.72:.8;
    speed+=(target-speed)*(1-Math.exp(-dt/tau));
    if(Math.abs(speed-target)<.025)speed=target;
    angle=(angle+speed*dt)%360;
    if(armMotion) {
      armMotion.elapsed+=dt;
      const elapsed=armMotion.elapsed;
      armAngle=armMotion.from+(armMotion.to-armMotion.from)*smooth((elapsed-.18)/1.15);
      if(elapsed<.23)lift=armMotion.liftFrom+(1-armMotion.liftFrom)*smooth(elapsed/.23);
      else if(elapsed<1.28)lift=1;
      else lift=1-smooth((elapsed-1.28)/.45);
      if(elapsed>=1.73){armMotion=null;lift=0;deck.dataset.arm=engaged?'down':'rest';}
    } else if(engaged) {
      armAngle+=(23+progress*5-armAngle)*(1-Math.exp(-dt/.7));
    }
    paint();
    if(speed>0||target>0||armMotion)frame=requestAnimationFrame(tick);else last=0;
  }
  function renderDemo() {
    deck.classList.toggle('is-demo',demo);
    button?.setAttribute('aria-pressed',String(demo));
    const label=button?.querySelector('span');if(label)label.textContent=t(demo?'stopMotionDemo':'tryMotion');
    if(notice){notice.hidden=!demo;notice.textContent=t('motionDemoNotice');}
  }
  function stopDemo() {
    clearTimeout(demoTimer);demo=false;renderDemo();moveArm(playing);wake();
  }
  function setPlayback(state) {
    const wasPlaying=playing;
    playing=Boolean(state.playing);buffering=Boolean(state.buffering);
    progress=state.duration>0?Math.min(1,Math.max(0,state.position/state.duration)):0;
    if(demo&&playing)stopDemo();
    moveArm(playing||demo);
    // Never spin simply because the play button was clicked.
    deck.classList.toggle('is-playing',playing&&!buffering);
    deck.classList.toggle('is-buffering',playing&&buffering);
    if(!allowed){armAngle=engaged?23+progress*5:-6;lift=0;armMotion=null;paint();}
    if(wasPlaying!==playing||playing||armMotion)wake();
  }
  button?.addEventListener('click',()=>{
    if(demo){stopDemo();return;}
    if(!allowed){if(notice){notice.hidden=false;notice.textContent=t('motionDemoDisabled');}return;}
    if(playing){if(notice){notice.hidden=false;notice.textContent=t('motionDemoPlaying');}return;}
    demo=true;renderDemo();moveArm(true);wake();
    if(innerWidth<801 && deck.getBoundingClientRect().top < 90) deck.scrollIntoView({behavior:'smooth',block:'start'});
    demoTimer=setTimeout(stopDemo,6500);
  });
  document.addEventListener('club:language',()=>{renderDemo();});
  document.addEventListener('club:motion',e=>{
    allowed=Boolean(e.detail);
    if(!allowed){stopDemo();cancelAnimationFrame(frame);frame=0;speed=0;armMotion=null;lift=0;armAngle=playing?23+progress*5:-6;paint();}
    else wake();
  });
  document.addEventListener('visibilitychange',()=>{
    if(document.hidden){cancelAnimationFrame(frame);frame=0;last=0;}
    else wake();
  });
  if('IntersectionObserver' in window)new IntersectionObserver(entries=>{
    visible=entries[0].isIntersecting;
    if(visible)wake();else{cancelAnimationFrame(frame);frame=0;last=0;}
  },{rootMargin:'120px'}).observe(deck);
  window.addEventListener('pageshow',()=>wake());
  window.ClubTurntable={version:'2.3.0',setPlayback,stopDemo,reset(){stopDemo();setPlayback({playing:false,position:0,duration:0});},get state(){return {angle,speed,armAngle,lift,playing,buffering,demo,visible,allowed};}};
  paint();
})();

} catch(error) { window.ClubModuleErrors.push('js/turntable.js'); console.error('js/turntable.js', error); }


/* ===== js/lyrics.js ===== */
try {
/* Lyrics are fetched separately from audio. No private Spotify endpoint, token or scraper. */
(() => {
  'use strict';
  const {t, storage} = window.Club;
  const settings = window.CLUB_CONTENT.lyrics || {};
  const $ = id => document.getElementById(id);
  const elements = {
    status:$('lyricsStatus'), badge:$('lyricsBadge'), lines:$('lyricsLines'),
    viewport:$('lyricsViewport'), empty:$('lyricsEmpty'), candidates:$('lyricsCandidates'),
    source:$('lyricsSource'), title:$('trackTitle'), artist:$('trackArtist'), link:$('currentTrackLink')
  };
  let track=null, rows=[], rawRecord=null, source='', statusKey='lyricsWaiting', badgeKey='waiting';
  let abort=null, requestNumber=0, autoAttempted='', blockUntil=0, lastRequest=0, activeLine=-1, inferred=false;
  let playback={position:0,duration:0,isPaused:true}, sourceDuration=0;
  const cache=new Map();
  let saved={};
  try { const parsed=JSON.parse(storage.get('artclub-lyrics-v2','{}')); if(parsed&&typeof parsed==='object'&&!Array.isArray(parsed))saved=parsed; } catch {}
  function saveMatch(uri,value) {
    delete saved[uri]; saved[uri]=value;
    const entries=Object.entries(saved).slice(-12);
    saved=Object.fromEntries(entries);
    storage.set('artclub-lyrics-v2',JSON.stringify(saved));
  }
  function status(key,badge='waiting') {
    statusKey=key;badgeKey=badge;
    elements.status.textContent=t(key);elements.badge.textContent=t(badge);
  }
  function normal(value) {
    return String(value||'').normalize('NFKD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d').toLowerCase().replace(/[^\p{L}\p{N}]+/gu,' ').trim();
  }
  function parseLrc(text) {
    const offset = Number((text.match(/\[offset:\s*([+-]?\d+)\]/i)||[])[1]||0);
    const out=[];
    for(const line of text.split(/\r?\n/)) {
      const stamps=[...line.matchAll(/\[(\d{1,3}):(\d{2})(?:[.:](\d{1,3}))?\]/g)];
      const content=line.replace(/\[[^\]]*\]/g,'').trim().replace(/<\d{1,3}:\d{2}(?:\.\d+)?>/g,'');
      for(const m of stamps) {
        if(Number(m[2])>=60)continue;
        const frac=m[3] ? Number(`0.${m[3]}`)*1000 : 0;
        out.push({time:Math.max(0,Number(m[1])*60000+Number(m[2])*1000+frac-offset),text:content||'♪'});
      }
    }
    return out.sort((a,b)=>a.time-b.time);
  }
  function isCurrent(uri,number){return track?.uri===uri&&number===requestNumber;}
  async function fetchData(url,signal,asText=false) {
    if(Date.now()<blockUntil)throw new Error('rate');
    const response=await fetch(url,{signal,credentials:'omit'});
    if(response.status===429) {
      const value=response.headers.get('Retry-After')||'60';
      const numeric=Number(value);
      blockUntil=Number.isFinite(numeric) ? Date.now()+Math.max(1,numeric)*1000 : Math.max(Date.now()+1000,Date.parse(value)||Date.now()+60000);
      throw new Error('rate');
    }
    if(!response.ok)throw new Error(response.status===404?'missing':'network');
    return asText ? response.text() : response.json();
  }
  function renderTrack() {
    elements.title.textContent=track?.title||t(track?'trackFallback':'trackWaiting');
    elements.artist.textContent=rawRecord?.artistName ? `LRCLIB · ${rawRecord.artistName}` : track?.artist||t('trackHint');
    elements.link.hidden=!track;
    if(track)elements.link.href=`https://open.spotify.com/track/${track.uri.split(':')[2]}`;
  }
  function resetDisplay() {
    rows=[];rawRecord=null;source='';sourceDuration=0;activeLine=-1;inferred=false;
    elements.lines.replaceChildren();elements.lines.hidden=true;elements.lines.classList.remove('is-plain');
    elements.empty.hidden=false;elements.candidates.hidden=true;elements.candidates.replaceChildren();elements.source.replaceChildren();
  }
  function reset() {
    abort?.abort();requestNumber++;track=null;autoAttempted='';playback={position:0,duration:0,isPaused:true};
    resetDisplay();renderTrack();status('lyricsWaiting');
    $('lyricsQuery').value='';$('lyricsArtistInput').value='';
  }
  function showSource() {
    elements.source.replaceChildren();
    if(!source)return;
    if(source==='lrclib') {
      const a=document.createElement('a');
      a.href='https://lrclib.net/';a.target='_blank';a.rel='noopener noreferrer';a.textContent=t('lyricsProvider');
      elements.source.append(a);
    } else elements.source.textContent=t(source==='library'?'lyricsLibrary':'lyricsLocal');
  }
  function syncAllowed() {
    if(!rows.length||!Number.isFinite(rows[0].time))return false;
    if(playback.duration>0 && sourceDuration>0 && Math.abs(sourceDuration-playback.duration)>6000)return false;
    if(playback.duration>0 && playback.duration<=33000 && rows.at(-1).time>playback.duration+10000)return false;
    return true;
  }
  function updateStatusForLyrics() {
    if(rawRecord?.instrumental)status('lyricsInstrumental','instrumental');
    else if(rows.length&&Number.isFinite(rows[0].time)) {
      if(!syncAllowed())status('lyricsPreview','plain');
      else status(inferred?'lyricsInferred':'lyricsSynced','synced');
    } else if(rows.length) status('lyricsPlain','plain');
  }
  function renderRows() {
    elements.lines.replaceChildren();activeLine=-1;
    elements.lines.hidden=!rows.length;elements.empty.hidden=!!rows.length;
    const fragment=document.createDocumentFragment();
    rows.forEach(row=>{const li=document.createElement('li');li.className='lyric-line';li.textContent=row.text;fragment.append(li);});
    elements.lines.append(fragment);
    elements.lines.classList.toggle('is-plain',!syncAllowed());
    elements.viewport.scrollTop=0;
    updateStatusForLyrics();showSource();renderTrack();syncLines();
  }
  function useRecord(record,remember=false,guess=false) {
    if(!track||!record)return;
    inferred=guess;rawRecord=record;source='lrclib';sourceDuration=Number(record.duration||0)*1000;
    rows=record.syncedLyrics ? parseLrc(String(record.syncedLyrics).slice(0,200000)) : [];
    if(!rows.length&&record.plainLyrics)rows=String(record.plainLyrics).slice(0,200000).split(/\r?\n/).map(text=>({time:NaN,text:text||'♪'}));
    if(remember&&Number.isFinite(Number(record.id)))saveMatch(track.uri,{type:'lrclib',id:Number(record.id)});
    elements.candidates.hidden=true;
    if(!rows.length&&!record.instrumental){status('lyricsUnavailable');return;}
    renderRows();
  }
  function useLrc(text,type='local') {
    const parsed=parseLrc(text);
    if(!parsed.length)throw new Error('lrc');
    rawRecord=null;source=type;sourceDuration=0;inferred=false;rows=parsed;
    elements.candidates.hidden=true;renderRows();
  }
  function showCandidates(matches,uri,number) {
    elements.candidates.replaceChildren();
    const unique=new Map();
    matches.forEach(item=>{
      if(!item||typeof item.trackName!=='string')return;
      const key=`${normal(item.trackName)}|${normal(item.artistName)}|${Math.round(Number(item.duration||0))}`;
      if(!unique.has(key)||(!unique.get(key).syncedLyrics&&item.syncedLyrics))unique.set(key,item);
    });
    const items=[...unique.values()].slice(0,8);
    if(!items.length){status('lyricsUnavailable');return;}
    for(const record of items) {
      const button=document.createElement('button');button.type='button';button.className='lyrics-candidate';
      const title=document.createElement('strong');title.textContent=`${record.trackName} — ${record.artistName||''}`;
      const detail=document.createElement('small');
      const duration=Math.floor(Number(record.duration||0));
      detail.textContent=`${record.albumName||''} · ${Math.floor(duration/60)}:${String(duration%60).padStart(2,'0')} · `;
      const kind=document.createElement('span');
      kind.dataset.lyricKind=record.syncedLyrics?'synced':'plain';kind.textContent=t(kind.dataset.lyricKind);
      detail.append(kind);
      button.append(title,detail);
      button.addEventListener('click',()=>{if(isCurrent(uri,number))useRecord(record,true);});
      elements.candidates.append(button);
    }
    elements.candidates.hidden=false;status('lyricsChoose','chooseLyrics');
  }
  async function findLyrics(title,artist='',manual=false) {
    if(!track){status('lyricsNeedTrack');return;}
    if(!settings.onlineSearch){status('lyricsDisabled');return;}
    if(!title?.trim()){status('lyricsNoMetadata');return;}
    if(Date.now()<blockUntil){status('lyricsRateLimit');return;}
    abort?.abort();abort=new AbortController();
    const controller=abort, number=++requestNumber, uri=track.uri;
    const timer=setTimeout(()=>controller.abort(),10000);
    status('lyricsLoading','searching');
    try {
      // One request at a time; no playlist-wide scraping or background request loop.
      const wait=Math.max(0,500-(Date.now()-lastRequest));
      if(wait)await new Promise(resolve=>setTimeout(resolve,wait));
      if(!isCurrent(uri,number))return;
      const cacheKey=normal(title)+'|'+normal(artist);
      let matches=cache.get(cacheKey);
      if(!matches) {
        const params=new URLSearchParams({track_name:title.trim()});
        if(artist.trim())params.set('artist_name',artist.trim());
        lastRequest=Date.now();
        matches=await fetchData(`https://lrclib.net/api/search?${params}`,controller.signal);
        if(!Array.isArray(matches))throw new Error('network');
        cache.set(cacheKey,matches);
        if(cache.size>24)cache.delete(cache.keys().next().value);
      }
      if(!isCurrent(uri,number))return;
      const seconds=playback.duration/1000 || track.duration/1000 || 0;
      const exact=matches.filter(r=>normal(r.trackName)===normal(title)&&seconds>35&&
        Math.abs(Number(r.duration)-seconds)<=2.5 && (!artist||normal(r.artistName)===normal(artist)));
      const artistGroups=new Set(exact.map(r=>normal(r.artistName)));
      if(!manual&&exact.length&&artistGroups.size===1) {
        exact.sort((a,b)=>Number(!!b.syncedLyrics)-Number(!!a.syncedLyrics)||Math.abs(a.duration-seconds)-Math.abs(b.duration-seconds));
        useRecord(exact[0],false,!artist);
      } else showCandidates(matches,uri,number);
    } catch(error) {
      if(!isCurrent(uri,number))return;
      status(error.message==='rate'?'lyricsRateLimit':error.message==='missing'?'lyricsUnavailable':'lyricsNetwork');
    } finally {clearTimeout(timer);}
  }
  async function loadSavedOrLibrary() {
    if(!track)return false;
    const uri=track.uri, record=saved[uri], entry=settings.tracks?.[uri];
    if(!record&&!entry?.lrc&&!entry?.lrclibId)return false;
    abort?.abort();abort=new AbortController();
    const controller=abort,number=++requestNumber,timer=setTimeout(()=>controller.abort(),10000);
    try {
      status('lyricsLoading','searching');
      if(record?.type==='lrc'&&typeof record.text==='string') {useLrc(record.text);return true;}
      const id=record?.type==='lrclib'?record.id:entry?.lrclibId;
      if(id!==undefined) {
        if(!Number.isFinite(Number(id)))return false;
        const result=await fetchData(`https://lrclib.net/api/get/${Number(id)}`,controller.signal);
        if(isCurrent(uri,number))useRecord(result);
        return true;
      }
      if(entry?.lrc) {
        const url=new URL(entry.lrc,location.href);
        if(url.origin!==location.origin)throw new Error('network');
        const text=await fetchData(url.href,controller.signal,true);
        if(text.length>200000)throw new Error('lrc');
        if(isCurrent(uri,number))useLrc(text,'library');
        return true;
      }
    } catch(error) {
      if(isCurrent(uri,number))status(error.message==='rate'?'lyricsRateLimit':'lyricsNetwork');
      return true; // Do not hammer the service by falling through to another request.
    } finally {clearTimeout(timer);}
    return false;
  }
  async function setTrack(next) {
    if(!next||!/^spotify:track:[A-Za-z0-9]{22}$/.test(next.uri||'')){reset();return;}
    const changed=track?.uri!==next.uri;
    if(changed) {
      abort?.abort();requestNumber++;resetDisplay();autoAttempted='';
      playback={position:0,duration:Number(next.duration)||0,isPaused:true};
    }
    const mapping=settings.tracks?.[next.uri]||{};
    track={...(changed?{}:track),...next,title:next.title||mapping.title||(!changed?track?.title:'')||'',artist:next.artist||mapping.artist||''};
    renderTrack();
    if(track.title)$('lyricsQuery').value=track.title;
    if(track.artist)$('lyricsArtistInput').value=track.artist;
    if(changed&&(saved[track.uri]||mapping.lrc||mapping.lrclibId!==undefined)) {
      autoAttempted=track.uri;
      await loadSavedOrLibrary();return;
    }
    if(rows.length)return;
    if(track.title&&autoAttempted!==track.uri) {
      autoAttempted=track.uri;
      await findLyrics(track.title,track.artist);
    } else if(!track.title)status('lyricsNoMetadata');
  }
  function syncLines() {
    const valid=syncAllowed();
    elements.lines.classList.toggle('is-plain',!valid);
    if(!valid){if(activeLine>=0)elements.lines.children[activeLine]?.classList.remove('is-current');activeLine=-1;return;}
    let low=0,high=rows.length-1,index=-1;
    while(low<=high){const mid=(low+high)>>1;if(rows[mid].time<=playback.position){index=mid;low=mid+1;}else high=mid-1;}
    if(index===activeLine)return;
    if(activeLine>=0)elements.lines.children[activeLine]?.classList.remove('is-current');
    activeLine=index;
    const line=elements.lines.children[index];
    if(line) {
      line.classList.add('is-current');
      const top=line.offsetTop-elements.viewport.clientHeight/2+line.offsetHeight/2;
      elements.viewport.scrollTo({top:Math.max(0,top),behavior:window.ClubMotion?.enabled?'smooth':'auto'});
    }
  }
  function update(state) {
    const previousDuration=playback.duration;
    playback={...playback,...state};
    if(rows.length&&previousDuration!==playback.duration)updateStatusForLyrics();
    syncLines();
  }
  $('lyricsSearch').addEventListener('submit',event=>{
    event.preventDefault();
    findLyrics($('lyricsQuery').value,$('lyricsArtistInput').value,true);
  });
  $('lrcFile').addEventListener('change',async event=>{
    const file=event.target.files?.[0];event.target.value='';
    if(!file)return;
    if(!track){status('lyricsNeedTrack');return;}
    if(file.size>200000||!/\.lrc$/i.test(file.name)){status('lyricsBadFile');return;}
    const uri=track.uri;
    try {
      const text=await file.text();if(track?.uri!==uri)return;
      abort?.abort();requestNumber++;
      useLrc(text);
      saveMatch(uri,{type:'lrc',text});
    } catch {status('lyricsBadFile');}
  });
  $('forgetLyrics').addEventListener('click',()=>{
    if(!track){status('lyricsNeedTrack');return;}
    delete saved[track.uri];storage.set('artclub-lyrics-v2',JSON.stringify(saved));
    abort?.abort();requestNumber++;resetDisplay();renderTrack();status('lyricsUnavailable');
  });
  document.addEventListener('club:language',()=>{
    renderTrack();status(statusKey,badgeKey);showSource();
    elements.candidates.querySelectorAll('[data-lyric-kind]').forEach(node=>{
      node.textContent=t(node.dataset.lyricKind);
    });
  });
  window.ClubLyrics={setTrack,update,reset,parseLrc};
  reset();
})();

} catch(error) { window.ClubModuleErrors.push('js/lyrics.js'); console.error('js/lyrics.js', error); }


/* ===== js/player.js ===== */
try {
/* 2.3 - Official Spotify events drive an independent inertial motor.
   playback_started also works before a duration becomes available. */
(() => {
  'use strict';
  const {t,local,storage}=window.Club;
  const records=window.CLUB_CONTENT.records;
  const $=id=>document.getElementById(id);
  const room=$('playlist'),deck=$('turntable'),vinyl=$('vinyl'),options=$('recordOptions');
  let selected=records.find(r=>r.id===storage.get('artclub-disc'))||records[0];
  let api=null,apiPromise=null,controller=null,bootPromise=null,generation=0,intent=0,ready=false;
  let statusKey='playerIdle',transport='idle',trackUri='',trackMetadata=null,metadataAbort=null;
  let position=0,duration=0,isPaused=true,isBuffering=false,lastUpdate=0,lastPosition=0;
  let pendingTimer=0,artTimer=0;
  const metadataCache=new Map();

  function announce(key) {
    statusKey=key;$('playerStatus').textContent=t(key);
  }
  function renderTransport() {
    const actuallyPlaying=!isPaused&&!isBuffering;
    window.ClubTurntable?.setPlayback({playing:!isPaused,buffering:isBuffering,position,duration});
    deck.dataset.state=transport;
    $('playButton').setAttribute('aria-pressed',String(!isPaused));
    $('retrySpotify').hidden=!['error','unlock'].includes(transport);
    $('playButton').setAttribute('aria-busy',String(['loading','starting','buffering'].includes(transport)));
    $('playIcon').textContent=isPaused?'▶':'Ⅱ';
    $('playText').textContent=t(isPaused?'play':'pause');
    $('deckSignal').textContent=t(actuallyPlaying?'playing':transport==='paused'?'paused':'standby');
    $('playerStatus').textContent=t(statusKey);
  }
  function clock(ms) {
    const seconds=Math.floor(Math.max(0,ms)/1000);
    return `${Math.floor(seconds/60)}:${String(seconds%60).padStart(2,'0')}`;
  }
  function renderProgress() {
    $('currentTime').textContent=clock(position);$('totalTime').textContent=clock(duration);
    $('trackProgress').max=Math.max(1,duration);$('trackProgress').value=Math.min(position,duration);
  }
  function resetPlayback() {
    isPaused=true;isBuffering=false;position=0;lastPosition=0;duration=0;lastUpdate=0;
    trackUri='';trackMetadata=null;metadataAbort?.abort();
    clearTimeout(pendingTimer);
    window.ClubLyrics?.reset();
    renderProgress();renderTransport();
  }
  function drawSelection(animate=false,sourceButton=null) {
    if(animate)window.ClubMotion?.flyRecord(sourceButton?.querySelector('.mini-record'),$('recordCarrier'));
    room.dataset.theme=selected.theme;vinyl.dataset.theme=selected.theme;

    $('recordArtwork').src=selected.image;
    $('selectedRecordName').textContent=local(selected.name);
    $('recordSpotifyLink').href=selected.spotifyUrl;
    options.querySelectorAll('.record-option').forEach(button=>{
      const record=records.find(r=>r.id===button.dataset.record);
      const active=record.id===selected.id;
      button.setAttribute('aria-pressed',String(active));
      button.querySelector('strong').textContent=local(record.name);
      button.querySelector('small').textContent=local(record.caption);
      button.querySelector('.record-selection').textContent=t(active?'selected':'choose');
      button.setAttribute('aria-label',`${local(record.name)} — ${t(active?'selected':'choose')}`);
    });
    if(animate&&window.ClubMotion?.enabled) {
      const carrier=$('recordCarrier');
      carrier.classList.remove('is-arriving');void carrier.offsetWidth;carrier.classList.add('is-arriving');
      clearTimeout(artTimer);artTimer=setTimeout(()=>carrier.classList.remove('is-arriving'),1100);
    }
  }
  function renderOptions() {
    options.replaceChildren();
    records.forEach(record=>{
      const button=document.createElement('button');
      button.className='record-option';button.type='button';button.dataset.record=record.id;
      const mini=document.createElement('span');mini.className='mini-record';mini.setAttribute('aria-hidden','true');
      const image=document.createElement('img');image.src=record.image;image.alt='';image.width=96;image.height=96;mini.append(image);
      const title=document.createElement('strong'),subtitle=document.createElement('small'),state=document.createElement('span');state.className='record-selection';
      button.append(mini,title,subtitle,state);
      button.addEventListener('click',event=>selectRecord(record,button,event));
      options.append(button);
    });
    drawSelection();
    window.ClubMotion?.register(options);
  }
  function loadAPI() {
    if(api)return Promise.resolve(api);
    if(apiPromise)return apiPromise;
    apiPromise=new Promise((resolve,reject)=>{
      let settled=false;
      const timeout=setTimeout(()=>{if(!settled){settled=true;reject(new Error('api-timeout'));}},14000);
      window.onSpotifyIframeApiReady=instance=>{
        api=instance;clearTimeout(timeout);
        if(!settled){settled=true;resolve(instance);}
      };
      $('spotifyApiScript')?.remove();
      const script=document.createElement('script');script.id='spotifyApiScript';
      script.src='https://open.spotify.com/embed/iframe-api/v1';script.async=true;
      script.onerror=()=>{clearTimeout(timeout);if(!settled){settled=true;reject(new Error('api-network'));}};
      document.body.append(script);
    }).catch(error=>{apiPromise=null;throw error;});
    return apiPromise;
  }
  function directEmbed() {
    const iframe=document.createElement('iframe');
    iframe.src=`https://open.spotify.com/embed/playlist/${selected.uri.split(':')[2]}?theme=0`;
    iframe.title=`Spotify — ${local(selected.name)}`;
    iframe.width='100%';iframe.height='352';
    iframe.allow='autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture';
    iframe.referrerPolicy='strict-origin-when-cross-origin';
    $('spotifyMount').replaceChildren(iframe);
  }
  function destroyController() {
    try{controller?.pause();}catch{/* The previous iframe may already have gone away. */}
    try{controller?.destroy();}catch{/* Cleanup must still run if pause failed. */}
    controller=null;ready=false;
  }
  async function updateTrack(uri) {
    if(!/^spotify:track:[A-Za-z0-9]{22}$/.test(uri))return;
    if(uri===trackUri)return;
    trackUri=uri;metadataAbort?.abort();
    const gen=generation;
    const mapping=window.CLUB_CONTENT.lyrics?.tracks?.[uri]||{};
    trackMetadata={uri,title:mapping.title||'',artist:mapping.artist||'',duration};
    window.ClubLyrics?.setTrack(trackMetadata);
    if(metadataCache.has(uri)) {
      trackMetadata={...trackMetadata,...metadataCache.get(uri)};
      window.ClubLyrics?.setTrack(trackMetadata);return;
    }
    metadataAbort=new AbortController();
    const request=metadataAbort,timeout=setTimeout(()=>request.abort(),9000);
    try{
      const url=`https://open.spotify.com/oembed?url=${encodeURIComponent('https://open.spotify.com/track/'+uri.split(':')[2])}`;
      const response=await fetch(url,{signal:request.signal,credentials:'omit'});
      if(!response.ok)throw new Error('metadata');
      const data=await response.json();
      if(gen!==generation||trackUri!==uri)return;
      if(typeof data.title==='string'&&data.title.trim()&&data.title!=='Spotify') {
        // oEmbed exposes the title, not guaranteed artist metadata.
        const metadata={title:data.title.slice(0,300)};
        metadataCache.set(uri,metadata);
        if(metadataCache.size>30)metadataCache.delete(metadataCache.keys().next().value);
        trackMetadata={...trackMetadata,...metadata};
        window.ClubLyrics?.setTrack(trackMetadata);
      }
    }catch{/* Lyrics UI exposes manual title/artist search when oEmbed is blocked. */}
    finally{clearTimeout(timeout);}
  }
  function onPlayback(event,gen) {
    if(gen!==generation)return;
    const data=event?.data||{};
    if(typeof data.isPaused==='boolean')isPaused=data.isPaused;
    isBuffering=data.isBuffering===true;
    if(typeof data.duration==='number'&&Number.isFinite(data.duration))duration=Math.max(0,data.duration);
    if(typeof data.position==='number'&&Number.isFinite(data.position))position=Math.max(0,Math.min(data.position,duration||data.position));
    lastPosition=position;lastUpdate=performance.now();
    if(typeof data.playingURI==='string')updateTrack(data.playingURI);
    const newState=isBuffering?'buffering':isPaused?'paused':'playing';
    transport=newState;
    announce(isBuffering?'playerBuffering':isPaused?'playerPaused':'playerPlaying');
    if(!isPaused||isPaused&&$('playButton').getAttribute('aria-pressed')==='true')clearTimeout(pendingTimer);
    window.ClubLyrics?.update({position,duration,isPaused,isBuffering});
    renderProgress();renderTransport();
  }
  function boot() {
    if(ready&&controller)return Promise.resolve(controller);
    if(bootPromise)return bootPromise;
    const gen=generation,record=selected;
    transport='loading';announce('playerLoading');renderTransport();
    const task=loadAPI().then(spotifyAPI=>new Promise((resolve,reject)=>{
      if(gen!==generation){resolve(null);return;}
      const target=document.createElement('div');target.id=`spotify-target-${gen}`;
      $('spotifyMount').replaceChildren(target);
      let active=true;
      const timeout=setTimeout(()=>{active=false;reject(new Error('embed-timeout'));},16000);
      try {
        spotifyAPI.createController(target,{width:'100%',height:352,uri:record.uri},ctrl=>{
          if(!active||gen!==generation){clearTimeout(timeout);try{ctrl.destroy();}catch{}resolve(null);return;}
          controller=ctrl;
          ctrl.addListener('ready',()=>{
            clearTimeout(timeout);
            if(!active||gen!==generation){try{ctrl.destroy();}catch{}resolve(null);return;}
            ready=true;transport='ready';announce('playerReady');renderTransport();
            const frame=$('spotifyMount').querySelector('iframe');
            if(frame){frame.title=`Spotify — ${local(record.name)}`;frame.allow='autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture';}
            resolve(ctrl);
          });
          ctrl.addListener('playback_update',event=>{if(active)onPlayback(event,gen);});
          ctrl.addListener('playback_started',event=>{
            if(!active||gen!==generation)return;
            // This is a real playback event, not a click or an assumed duration.
            isPaused=false;isBuffering=false;transport='playing';lastUpdate=performance.now();
            announce('playerPlaying');clearTimeout(pendingTimer);
            if(event?.data?.playingURI)updateTrack(event.data.playingURI);
            renderTransport();
          });
        });
      } catch(error){active=false;clearTimeout(timeout);reject(error);}
    })).catch(()=>{
      if(gen===generation) {
        destroyController();transport='error';isPaused=true;announce('playerError');renderTransport();directEmbed();
      }
      return null;
    }).finally(()=>{if(gen===generation)bootPromise=null;});
    bootPromise=task;
    return task;
  }
  function requestPlayback(ctrl) {
    if(!ctrl||!ready)return;
    const wasPaused=isPaused;
    if(wasPaused){transport='starting';announce('playerStarting');renderTransport();}
    try {
      // Called synchronously inside the user gesture whenever the iframe is ready.
      if(wasPaused){if(typeof ctrl.resume==='function')ctrl.resume();else ctrl.play();}
      else ctrl.pause();
      clearTimeout(pendingTimer);
      if(wasPaused)pendingTimer=setTimeout(()=>{
        if(isPaused){transport='unlock';announce('playerUnlock');renderTransport();}
      },6500);
    } catch {
      transport='unlock';announce('playerUnlock');renderTransport();
    }
  }
  function togglePlayback(event) {
    window.ClubMotion?.burst(event.currentTarget,'',8);
    
    const currentIntent=++intent,gen=generation;
    if(ready&&controller){requestPlayback(controller);return;}
    boot().then(ctrl=>{
      if(ctrl&&currentIntent===intent&&gen===generation)requestPlayback(ctrl);
    });
  }
  function selectRecord(record,button,event) {
    if(record.id===selected.id){window.ClubMotion?.burst(button,'',6);return;}
    window.ClubTurntable?.reset();
    generation++;intent++;bootPromise=null;
    destroyController();
    selected=record;storage.set('artclub-disc',record.id);
    transport='idle';announce('playerIdle');resetPlayback();
    drawSelection(true,button);
    
    boot(); // Selection loads the playlist, but does not auto-play it.
  }
  document.querySelectorAll('[data-play]').forEach(button=>button.addEventListener('click',togglePlayback));
  document.addEventListener('club:language',()=>{
    drawSelection();renderTransport();
    const frame=$('spotifyMount').querySelector('iframe');
    if(frame)frame.title=`Spotify — ${local(selected.name)}`;
  });
  $('retrySpotify').addEventListener('click',()=>{
    window.ClubTurntable?.reset();
    generation++;intent++;bootPromise=null;destroyController();resetPlayback();boot();
  });
  renderOptions();renderTransport();renderProgress();
  if('IntersectionObserver' in window){
    const preload=new IntersectionObserver(entries=>{
      if(entries.some(entry=>entry.isIntersecting)){preload.disconnect();boot();}
    },{rootMargin:'650px'});
    preload.observe(room);
  }else boot();
  window.ClubPlayer={get state(){return {transport,isPaused,isBuffering,position,duration,record:selected.id};}};
  // Interpolate at most two seconds beyond an actual update; never invent ongoing playback.
  setInterval(()=>{
    if(document.hidden||isPaused||isBuffering||!lastUpdate)return;
    const elapsed=Math.min(2000,performance.now()-lastUpdate);
    position=Math.min(duration,lastPosition+elapsed);
    renderProgress();window.ClubLyrics?.update({position,duration,isPaused,isBuffering});
  },250);
})();

} catch(error) { window.ClubModuleErrors.push('js/player.js'); console.error('js/player.js', error); }


/* ===== script.js ===== */
try {
(() => {
  'use strict';
  const { t, local } = window.Club;
  const content = window.CLUB_CONTENT;
  const motion = window.ClubMotion;
  const nav = document.querySelector('.nav'), menu = document.querySelector('.menu-toggle');
  function closeMenu() { nav?.classList.remove('open'); menu?.setAttribute('aria-expanded','false'); }
  menu?.addEventListener('click',()=>{
    const open=nav.classList.toggle('open');
    menu.setAttribute('aria-expanded',String(open));
  });
  nav?.querySelectorAll('a').forEach(el=>el.addEventListener('click',closeMenu));
  document.addEventListener('click',e=>{
    if (!e.target.closest('.site-header')) closeMenu();
  });
  document.querySelectorAll('[data-join]').forEach(link=>{
    link.href=content.joinUrl;
    link.addEventListener('click',()=>motion?.burst(link,'',9));
  });
  const stage=document.querySelector('.hero-stage'), logo=document.querySelector('.hero-logo');
  const mascot=document.getElementById('mascotCard');
  function setMascot(open,restore=false) {
    stage.classList.toggle('logo-open',open);
    logo.setAttribute('aria-expanded',String(open));
    mascot.setAttribute('aria-hidden',String(!open));
    mascot.inert=!open;
    if (open) mascot.querySelector('.mascot-close')?.focus({preventScroll:true});
    else if(restore) logo.focus({preventScroll:true});
  }
  logo.addEventListener('click',()=>{
    const open=!stage.classList.contains('logo-open');
    setMascot(open);
    if(open) motion?.burst(logo,t('wow'),16);
  });
  mascot.querySelector('.mascot-close').addEventListener('click',()=>setMascot(false,true));
  document.addEventListener('click',e=>{
    if(stage.classList.contains('logo-open') && !stage.contains(e.target)) setMascot(false);
  });
  document.addEventListener('keydown',e=>{
    if(e.key==='Escape') {
      if(nav?.classList.contains('open')) {closeMenu();menu?.focus();}
      if(stage?.classList.contains('logo-open')) setMascot(false,true);
    }
  });

  const gallery=document.getElementById('galleryGrid');
  const lightbox=document.getElementById('lightbox');
  let filter='all', selectedIndex=-1, lastTrigger=null;
  function make(tag,cls,text) {
    const el=document.createElement(tag);if(cls)el.className=cls;if(text!==undefined)el.textContent=text;return el;
  }
  function paintLightbox(index) {
    const art=content.artworks[index]; if(!art)return;
    selectedIndex=index;
    const img=document.getElementById('lightboxImage');
    img.src=art.image;img.alt=local(art.title);
    document.getElementById('lightboxCaption').textContent=`${local(art.title)} — ${local(art.author)}`;
  }
  function openArtwork(index,trigger) {
    if(!lightbox?.showModal)return;
    lastTrigger=trigger;paintLightbox(index);
    lightbox.showModal(); document.body.classList.add('no-scroll');
    motion?.animate(lightbox.querySelector('figure'),[{opacity:0,transform:'translateY(24px) scale(.95)'},{opacity:1,transform:'translateY(0) scale(1)'}],{duration:550,easing:'cubic-bezier(.16,1,.3,1)'});
  }
  function renderGallery() {
    gallery.replaceChildren();
    const visible=content.artworks.map((art,index)=>({art,index})).filter(({art})=>filter==='all'||art.category===filter);
    const groups=new Map();
    visible.forEach(item=>{
      const key=local(item.art.author)||t('clubFull');
      if(!groups.has(key))groups.set(key,[]);
      groups.get(key).push(item);
    });
    groups.forEach((items,author)=>{
      const head=make('div','gallery-author');
      const label=make('span','gallery-author-kicker',document.documentElement.lang==='en'?'ARTIST':'TÁC GIẢ');
      const title=make('h3','',author);
      const count=make('p','',`${items.length} ${document.documentElement.lang==='en'?(items.length===1?'work':'works'):'tác phẩm'}`);
      head.append(label,title,count);gallery.append(head);
      items.forEach(({art,index})=>{
        const card=make('button','gallery-card');
        card.type='button';card.dataset.index=index;
        card.setAttribute('aria-label',`${t('viewArt')}: ${local(art.title)}`);
        const img=make('img');
        img.src=art.thumb||art.image;img.alt=local(art.title);img.loading='lazy';img.decoding='async';img.width=700;img.height=700;
        try{img.fetchPriority='low';}catch{}
        const info=make('div','gallery-info');
        info.append(make('h3','',local(art.title)),make('p','',local(art.description)));
        card.append(img,info);
        card.addEventListener('click',()=>openArtwork(index,card));
        gallery.append(card);
      });
    });
    if(!visible.length) {
      const card=make('article','gallery-card placeholder-card');
      const art=make('div','placeholder-art');art.innerHTML=t('moreArt');
      const info=make('div','gallery-info');info.append(make('h3','',t('comingSoon')),make('p','',t('clubFull')));
      card.append(art,info);gallery.append(card);
    }
    motion?.register(gallery);
  }
  document.querySelectorAll('.filter').forEach(button=>{
    button.addEventListener('click',()=>{
      filter=button.dataset.filter;
      document.querySelectorAll('.filter').forEach(el=>{
        const active=el===button;el.classList.toggle('active',active);el.setAttribute('aria-pressed',String(active));
      });
      renderGallery();
      motion?.burst(button,'',7);
    });
  });
  let closing=false,closeTimer=0,closeRevision=0;
  function closeArtwork(){
    if(!lightbox.open||closing)return;
    closing=true;
    const revision=++closeRevision;
    const a=motion?.animate(lightbox.querySelector('figure'),[{opacity:1,transform:'scale(1)'},{opacity:0,transform:'scale(.97) translateY(12px)'}],{duration:220,easing:'ease-in'});
    const finish=()=>{if(revision!==closeRevision||!closing)return;clearTimeout(closeTimer);if(lightbox.open)lightbox.close();document.body.classList.remove('no-scroll');closing=false;};
    // Some engines defer the WAAPI finished promise for top-layer dialogs.
    // A bounded, idempotent fallback must always release scrolling.
    if(a){closeTimer=setTimeout(finish,300);a.finished.then(finish,finish);}else finish();
  }
  lightbox.addEventListener('cancel',e=>{e.preventDefault();closeArtwork();});
  lightbox.querySelector('.lightbox-close').addEventListener('click',closeArtwork);
  lightbox.addEventListener('click',e=>{if(e.target===lightbox)closeArtwork();});
  lightbox.addEventListener('close',()=>{
    document.body.classList.remove('no-scroll');
    if(lastTrigger?.isConnected) lastTrigger.focus({preventScroll:true});
  });
  lightbox.addEventListener('keydown',e=>{
    if(e.key!=='ArrowLeft'&&e.key!=='ArrowRight')return;
    const indices=content.artworks.map((a,i)=>({a,i})).filter(({a})=>filter==='all'||a.category===filter).map(({i})=>i);
    if(indices.length<2)return;
    e.preventDefault();
    const at=indices.indexOf(selectedIndex),next=(at+(e.key==='ArrowRight'?1:-1)+indices.length)%indices.length;
    paintLightbox(indices[next]);
  });
  document.addEventListener('club:language',()=>{
    renderGallery();if(lightbox.open)paintLightbox(selectedIndex);
  });
  renderGallery();
  window.ClubUIReady=true;
})();

} catch(error) { window.ClubModuleErrors.push('script.js'); console.error('script.js', error); }

/* 2.3: active navigation, lifecycle recovery and diagnostics. */
(() => {
 'use strict';
 const root=document.documentElement;
 const header=document.querySelector('.site-header');
 const links=[...document.querySelectorAll('.nav a[href^="#"]')];
 const sections=links.map(a=>document.querySelector(a.getAttribute('href'))).filter(Boolean);
 let frame=0;
 function update(){
   frame=0;header?.classList.toggle('has-scrolled',scrollY>24);
   let current='';
   for(const section of sections)if(section.getBoundingClientRect().top<innerHeight*.38)current=section.id;
   for(const link of links){
     if(link.hash==='#'+current)link.setAttribute('aria-current','location');
     else link.removeAttribute('aria-current');
   }
 }
 const queue=()=>{if(!frame)frame=requestAnimationFrame(update);};
 addEventListener('scroll',queue,{passive:true});addEventListener('resize',queue,{passive:true});
 addEventListener('pageshow',()=>{root.dataset.pageHidden='false';queue();});
 document.addEventListener('visibilitychange',()=>{root.dataset.pageHidden=String(document.hidden);if(!document.hidden)queue();});
 document.addEventListener('club:language',queue);
 update();
 window.ClubDiagnostics=()=>({
   build:window.ClubBuild,
   viewport:root.clientWidth,layout:root.scrollWidth,
   overflow:Math.max(0,root.scrollWidth-root.clientWidth),
   motion:root.dataset.motion,choice:root.dataset.motionChoice,
   systemReduce:matchMedia('(prefers-reduced-motion:reduce)').matches,
   cssBuild:getComputedStyle(root).getPropertyValue('--club-build').trim(),
   errors:window.ClubModuleErrors||[],
   turntable:window.ClubTurntable?.state
 });
})();

window.ClubBuild='2.3.0';