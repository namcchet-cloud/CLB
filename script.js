/* CLB Nghe thuat - build 2.5.3. Readable, dependency-free bundle. */
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

  window.ClubMotion={version:'2.6.1',burst,flyRecord,animate,register,setChoice,get enabled(){return enabled;},get choice(){return choice;}};
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
  window.ClubTurntable={version:'2.6.1',setPlayback,stopDemo,reset(){stopDemo();setPlayback({playing:false,position:0,duration:0});},get state(){return {angle,speed,armAngle,lift,playing,buffering,demo,visible,allowed};}};
  paint();
})();

} catch(error) { window.ClubModuleErrors.push('js/turntable.js'); console.error('js/turntable.js', error); }


/* Lyrics module removed in v2.6.2. */

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
    const current=$('currentTime'), total=$('totalTime'), progress=$('trackProgress');
    if(current) current.textContent=clock(position);
    if(total) total.textContent=clock(duration);
    if(progress){progress.max=Math.max(1,duration);progress.value=Math.min(position,duration);}
  }
  function resetPlayback() {
    isPaused=true;isBuffering=false;position=0;lastPosition=0;duration=0;lastUpdate=0;
    trackUri='';trackMetadata=null;metadataAbort?.abort();
    clearTimeout(pendingTimer);
    renderProgress();renderTransport();
  }
  let swapRevision=0;
  function animateSleeveSwap(sourceButton,record){
    if(!sourceButton||window.ClubMotion?.enabled===false||document.documentElement.dataset.motion==='off')return Promise.resolve();
    const rev=++swapRevision, target=$('recordCarrier')?.getBoundingClientRect(), src=sourceButton.getBoundingClientRect();
    if(!target)return Promise.resolve();
    const layer=document.createElement('div');layer.className='disc-swap-scene';layer.setAttribute('aria-hidden','true');
    const sleeve=document.createElement('div');sleeve.className='disc-sleeve';
    const cover=document.createElement('img');cover.src=record.image;cover.alt='';sleeve.append(cover);
    const disc=document.createElement('div');disc.className='disc-sleeve-vinyl';const discImg=document.createElement('img');discImg.src=record.image;discImg.alt='';disc.append(discImg);sleeve.append(disc);layer.append(sleeve);document.body.append(layer);
    const size=Math.min(190,Math.max(118,src.width*.82));
    const sx=src.left+src.width/2-size/2, sy=src.top+src.height/2-size/2;
    const tx=target.left+target.width*.52-size/2, ty=target.top+target.height*.46-size/2;
    sleeve.style.width=size+'px';sleeve.style.height=size+'px';sleeve.style.left=sx+'px';sleeve.style.top=sy+'px';
    const ease='cubic-bezier(.18,.82,.2,1)';
    const travel=sleeve.animate([{transform:'translate3d(0,0,0) rotate(-5deg) scale(.92)',opacity:.2},{offset:.18,opacity:1},{transform:`translate3d(${tx-sx}px,${ty-sy}px,0) rotate(2deg) scale(1)`,opacity:1}],{duration:620,easing:ease,fill:'forwards'});
    return travel.finished.then(()=>{
      if(rev!==swapRevision)return;
      sleeve.classList.add('is-open');
      return disc.animate([{transform:'translate3d(0,0,0) rotate(0deg)'},{offset:.58,transform:'translate3d(64%,3%,0) rotate(34deg)'},{transform:'translate3d(5%,16%,0) rotate(73deg) scale(1.03)'}],{duration:760,easing:'cubic-bezier(.16,.9,.24,1)',fill:'forwards'}).finished;
    }).then(()=>{
      if(rev!==swapRevision)return;
      return sleeve.animate([{opacity:1,transform:sleeve.getAnimations()[0]?.effect?.getComputedTiming?getComputedStyle(sleeve).transform:'none'},{opacity:0,transform:'translate3d('+(tx-sx-24)+'px,'+(ty-sy-18)+'px,0) scale(.94)'}],{duration:260,easing:'ease-out',fill:'forwards'}).finished;
    }).catch(()=>{}).finally(()=>{layer.remove();});
  }
  function drawSelection(animate=false,sourceButton=null) {
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
  function updateTrack(uri) {
    if(/^spotify:track:[A-Za-z0-9]{22}$/.test(uri)) trackUri=uri;
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
    drawSelection(false,button);
    options.classList.add('is-swapping');
    animateSleeveSwap(button,record).finally(()=>options.classList.remove('is-swapping'));
    boot(); // Prepare the playlist only; playback starts from a deliberate Play action.
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
    renderProgress();
  },250);
})();

} catch(error) { window.ClubModuleErrors.push('js/player.js'); console.error('js/player.js', error); }


/* ===== Akiko flight 2.5.3: original pixels, bounded comic flight ===== */
try {
(() => {
  'use strict';
  const VERSION = '2.5.3';
  const MASCOT = 'assets/gallery/akiko/mascot-intact-v253.webp';
  const SVG_NS = 'http://www.w3.org/2000/svg';
  const root = document.documentElement;
  const clamp = (n, a, b) => Math.min(b, Math.max(a, n));
  const smooth = n => { n = clamp(n, 0, 1); return n * n * (3 - 2 * n); };
  const angleDelta = n => ((n + 180) % 360 + 360) % 360 - 180;
  let active = null, requestId = 0, imagePromise = null, lastError = '';
  const allowed = () => root.dataset.motion !== 'off' && window.ClubMotion?.enabled !== false;
  const quiet = () => root.dataset.motionChoice === 'quiet';
  const text = (vi, en) => root.lang === 'en' ? en : vi;

  // Do not recolor, blend, crop, mirror or redraw this bitmap. Both eyes are original.
  function loadMascot() {
    if (imagePromise) return imagePromise;
    imagePromise = new Promise(resolve => {
      const img = new Image();
      let done = false;
      const finish = ok => {
        if (done) return;
        done = true; clearTimeout(timeout); img.onload = img.onerror = null;
        if (!ok) imagePromise = null;
        resolve(ok);
      };
      const timeout = setTimeout(() => finish(false), 8000);
      img.onload = () => {
        if (img.decode) img.decode().then(() => finish(true), () => finish(img.naturalWidth > 0));
        else finish(true);
      };
      img.onerror = () => finish(false);
      img.src = MASCOT;
    });
    return imagePromise;
  }
  function stop() {
    requestId++;
    if (!active) return;
    cancelAnimationFrame(active.raf);
    active.overlay.remove();
    active = null;
  }
  function report(message = '') {
    lastError = message;
    let el = document.getElementById('akikoFlightStatus');
    if (!el && message) {
      el = document.createElement('p'); el.id = 'akikoFlightStatus';
      el.className = 'af253-status'; el.setAttribute('role', 'status');
      document.getElementById('artistSwitcher')?.after(el);
    }
    if (el) { el.textContent = message; el.hidden = !message; }
  }
  function svg(tag, attrs = {}) {
    const node = document.createElementNS(SVG_NS, tag);
    Object.entries(attrs).forEach(([k, v]) => node.setAttribute(k, String(v)));
    return node;
  }
  // Catmull-Rom to cubic Bezier. Adjacent segments share a tangent (no zigzag corners).
  function curvedPath(points) {
    let d = `M ${points[0][0]} ${points[0][1]}`;
    for (let i = 0; i < points.length - 1; i++) {
      const a = points[i - 1] || points[i], b = points[i];
      const c = points[i + 1], e = points[i + 2] || c;
      const c1 = [b[0] + (c[0] - a[0]) / 6, b[1] + (c[1] - a[1]) / 6];
      const c2 = [c[0] - (e[0] - b[0]) / 6, c[1] - (e[1] - b[1]) / 6];
      d += ` C ${c1[0]} ${c1[1]} ${c2[0]} ${c2[1]} ${c[0]} ${c[1]}`;
    }
    return d;
  }
  function buildRoute(width, height, size, trigger, isQuiet) {
    const headerBottom = document.querySelector('.site-header')?.getBoundingClientRect().bottom || 64;
    const left = 130 * size, right = Math.max(left + 32, width - 130 * size);
    const top = Math.min(height * .45, Math.max(118 * size, headerBottom + 97 * size));
    const bottom = Math.max(top + 44, height - 98 * size);
    const point = (x, y) => [left + (right - left) * x, top + (bottom - top) * y];
    const rect = trigger?.getBoundingClientRect();
    const start = rect && rect.bottom > 0 && rect.top < height
      ? [clamp(rect.left + rect.width * .52, left, right), clamp(rect.bottom + 70 * size, top, bottom)]
      : point(.18, .72);
    if (isQuiet || height < 390) {
      return curvedPath([start, point(.65, .36), point(.9, .24), [width + 130 * size, top + 30]]);
    }
    return curvedPath([
      start, point(.46, .13), point(.81, .22), point(.87, .55),
      point(.65, .86), point(.24, .76), point(.12, .43),
      point(.33, .25), point(.62, .40), [width + 146 * size, top + (bottom - top) * .18]
    ]);
  }
  const ROCKET_SVG = `<svg viewBox="0 0 250 150" class="af253-ship af253-ufo" aria-hidden="true" focusable="false">
    <g stroke="#34333b" stroke-linejoin="round" stroke-linecap="round">
      <path class="af253-ufo-beam" d="M91 94 L55 145 L196 145 L161 94Z" fill="url(#ufoBeam)" stroke="none" opacity=".42"/>
      <defs><linearGradient id="ufoBeam" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e8d7f1"/><stop offset="1" stop-color="#f0cfdd" stop-opacity="0"/></linearGradient></defs>
      <ellipse cx="126" cy="87" rx="96" ry="34" fill="#fff0d4" stroke-width="3.4"/>
      <path d="M38 84 Q126 119 214 84 Q201 113 126 119 Q51 113 38 84Z" fill="#d7b8ce" stroke-width="3"/>
      <ellipse cx="126" cy="78" rx="58" ry="39" fill="#b8cfbf" stroke-width="3.2"/>
      <path d="M83 75 Q126 41 169 75" fill="#dbe7df" stroke="none" opacity=".85"/>
      <ellipse cx="126" cy="80" rx="45" ry="28" fill="#c9d7df" stroke-width="2.4"/>
      <path d="M93 70 Q113 53 136 55" fill="none" stroke="#f8f5e9" stroke-width="5" opacity=".8"/>
      <g class="af253-ufo-lights" stroke-width="1.4">
        <circle cx="58" cy="91" r="7" fill="#e6c56d"/><circle cx="89" cy="104" r="7" fill="#cf8fa7"/><circle cx="126" cy="109" r="7" fill="#8fa7b7"/><circle cx="163" cy="104" r="7" fill="#cf8fa7"/><circle cx="194" cy="91" r="7" fill="#e6c56d"/>
      </g>
      <path d="M24 83 Q9 74 7 59 Q22 61 36 71" fill="#8ca08d" stroke-width="3"/><path d="M216 71 Q231 61 245 59 Q243 75 228 83" fill="#8ca08d" stroke-width="3"/>
      <path d="M103 121 Q126 132 149 121 L143 136 Q126 144 109 136Z" fill="#727989" stroke-width="3"/>
      <path d="M115 123 Q126 129 137 123" fill="none" stroke="#f0d7e0" stroke-width="3"/>
      <g class="af253-fire"><path d="M108 135 Q126 151 144 135" fill="#ead17c" stroke-width="2"/><path d="M115 137 Q126 147 137 137" fill="#f4e7be" stroke="none"/></g>
      <path d="M53 79 Q78 69 96 70" fill="none" stroke="#fffaf0" stroke-width="3" opacity=".8"/>
      <path d="M181 88 l6 3 -6 3 -3 7 -3 -7 -6 -3 6 -3 3 -7Z" fill="#fff2c7" stroke-width="1.5"/>
    </g>
  </svg>`;

  function createFlight(trigger) {
    const w = root.clientWidth, h = window.innerHeight;
    const isQuiet = quiet();
    const size = clamp(Math.min(w / 530, h / 620), .56, .92);
    const overlay = document.createElement('div');
    overlay.className = 'af253-layer'; overlay.setAttribute('aria-hidden', 'true');
    const trails = svg('svg', {viewBox: `0 0 ${w} ${h}`, class: 'af253-trails', 'aria-hidden': 'true'});
    const path = svg('path', {d: buildRoute(w, h, size, trigger, isQuiet), fill: 'none', stroke: 'none'});
    const trailUnder = svg('path', {class: 'af253-trail-under', fill: 'none'});
    const trailInk = svg('path', {class: 'af253-trail-ink', fill: 'none'});
    trails.append(path, trailUnder, trailInk);
    const craft = document.createElement('div'); craft.className = 'af253-craft';
    const hull = document.createElement('div'); hull.className = 'af253-hull'; hull.innerHTML = ROCKET_SVG;
    const rider = document.createElement('img'); rider.className = 'af253-rider';
    rider.src = MASCOT; rider.alt = ''; rider.width = 760; rider.height = 603; rider.draggable = false;
    craft.append(hull, rider); overlay.append(trails, craft); document.body.append(overlay);
    const flight = {
      overlay, craft, hull, rider, path, trailUnder, trailInk,
      fire: hull.querySelector('.af253-fire'), length: path.getTotalLength(),
      size, w, h, isQuiet, particles: [], trail: [], emitted: new Set(), raf: 0,
      started: performance.now(), previous: 0, phase: 'boarding', elapsed: 0,
      boarding: isQuiet ? 280 : 760, cruise: isQuiet ? 2300 : 6000,
      lastPuff: -1000, lastStar: -1000, lastTrail: -1000,
      heading: null, position: {x: 0, y: 0}, rng: 14253
    };
    flight.total = flight.boarding + flight.cruise + 160;
    return flight;
  }
  function random(f) { f.rng = (f.rng * 1664525 + 1013904223) >>> 0; return f.rng / 4294967296; }
  function particle(f, kind, x, y, vx = 0, vy = 0, words = '') {
    if (f.particles.length >= (f.isQuiet ? 10 : 38)) return;
    const el = document.createElement('span'); el.className = `af253-particle af253-${kind}`;
    if (kind === 'star') el.textContent = random(f) > .5 ? '\u2726' : '\u2727';
    else if (kind === 'words') el.textContent = words;
    const life = kind === 'words' ? 1080 : kind === 'puff' ? 760 : 920;
    const rotation = (random(f) - .5) * (kind === 'words' ? 14 : 100);
    const tone = ['#c98da7','#7595a4','#d7b55c','#aea3c3'][Math.floor(random(f) * 4)];
    el.style.setProperty('--af253-tone', tone);
    if (kind === 'words') {
      x = clamp(x, 65, f.w - 65); y = clamp(y, 55, f.h - 55);
    }
    el.style.left = `${x}px`; el.style.top = `${y}px`;
    f.overlay.append(el);
    f.particles.push({el, kind, born: f.elapsed, life, vx, vy, rotation});
  }
  function burst(f, x, y) {
    for (let i = 0; i < (f.isQuiet ? 3 : 9); i++) {
      const a = (i / 9) * Math.PI * 2;
      particle(f, i % 3 === 0 ? 'star' : 'puff', x, y,
        Math.cos(a) * (45 + random(f) * 50), Math.sin(a) * (40 + random(f) * 40));
    }
    particle(f, 'ring', x, y);
  }
  function updateParticles(f) {
    for (let i = f.particles.length - 1; i >= 0; i--) {
      const p = f.particles[i], age = f.elapsed - p.born, u = age / p.life;
      if (u >= 1) { p.el.remove(); f.particles.splice(i, 1); continue; }
      const travel = 1 - Math.pow(1 - u, 2);
      const zoom = p.kind === 'ring' ? .4 + u * 2.6
        : p.kind === 'words' ? .8 + .2 * smooth(u * 7)
        : p.kind === 'puff' ? .4 + .85 * travel : .65 + .45 * Math.sin(Math.PI * u);
      p.el.style.opacity = String((p.kind === 'words' ? smooth(u * 12) : .9) * (1 - smooth((u - .45) / .55)));
      p.el.style.transform = `translate(-50%, -50%) translate3d(${p.vx * travel}px,${p.vy * travel}px,0) rotate(${p.rotation + (p.kind === 'star' ? 80 * u : 0)}deg) scale(${zoom})`;
    }
  }
  function frame(now, f) {
    if (active !== f) return;
    if (!allowed() || document.hidden) { stop(); return; }
    const dt = f.previous ? Math.min(60, now - f.previous) : 16.67;
    f.previous = now; f.elapsed = now - f.started;
    if (f.elapsed >= f.total) { stop(); return; }
    const u = clamp((f.elapsed - f.boarding) / f.cruise, 0, 1);
    // One continuous acceleration/deceleration over the whole curve, not per segment.
    const distance = f.length * (.5 - .5 * Math.cos(Math.PI * u));
    const pos = f.path.getPointAtLength(distance);
    const before = f.path.getPointAtLength(Math.max(0, distance - 7));
    const after = f.path.getPointAtLength(Math.min(f.length, distance + 7));
    const target = Math.atan2(after.y - before.y, after.x - before.x) * 180 / Math.PI;
    if (f.heading === null) f.heading = target;
    else f.heading += angleDelta(target - f.heading) * (1 - Math.exp(-dt / 72));
    const boarding = clamp(f.elapsed / f.boarding, 0, 1);
    const bob = f.elapsed < f.boarding ? -4 * Math.sin(boarding * Math.PI * 2) : 0;
    const x = pos.x, y = pos.y + bob;
    f.position = {x, y}; f.phase = u === 0 ? 'boarding' : u > .93 ? 'exit' : 'cruise';
    const scale = f.size * (.91 + .09 * smooth(boarding));
    const visible = smooth(f.elapsed / 160) * (1 - smooth((u - .955) / .045));
    f.craft.style.opacity = String(visible);
    f.craft.style.transform = `translate3d(${x - 120}px,${y - 133}px,0) scale(${scale})`;
    f.hull.style.transform = `rotate(${f.heading}deg)`;
    // Keep the exact face upright and completely above the hull (only a gentle bank).
    const bank = clamp(Math.sin(f.heading * Math.PI / 180) * 9, -9, 9);
    f.rider.style.transform = `translateY(${1.6 * Math.sin(f.elapsed / 240)}px) rotate(${bank}deg)`;
    f.fire.style.transform = `scale(${.80 + .18 * Math.sin(f.elapsed / 69)},${.95 + .05 * Math.sin(f.elapsed / 92)})`;
    f.fire.style.opacity = String(.45 + .55 * smooth(boarding));
    const rad = f.heading * Math.PI / 180;
    const nozzle = {x: x - 81 * scale * Math.cos(rad), y: y - 81 * scale * Math.sin(rad)};
    if (u > .005 && u < .96 && f.elapsed - f.lastTrail > 32) {
      f.lastTrail = f.elapsed; f.trail.push({...nozzle, time: f.elapsed});
    }
    f.trail = f.trail.filter(p => f.elapsed - p.time < 580).slice(-22);
    const d = f.trail.map((p, i) => `${i ? 'L' : 'M'}${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ');
    f.trailUnder.setAttribute('d', d); f.trailInk.setAttribute('d', d);
    if (u > .01 && u < .92 && f.elapsed - f.lastPuff > (f.isQuiet ? 250 : 120)) {
      f.lastPuff = f.elapsed;
      particle(f, 'puff', nozzle.x, nozzle.y, -Math.cos(rad) * 35 + (random(f) - .5) * 20, -Math.sin(rad) * 35 + 15);
    }
    if (!f.isQuiet && u > .03 && u < .94 && f.elapsed - f.lastStar > 260) {
      f.lastStar = f.elapsed;
      particle(f, 'star', nozzle.x + (random(f) - .5) * 26, nozzle.y + (random(f) - .5) * 26,
        (random(f) - .5) * 60, (random(f) - .5) * 65);
    }
    for (const [at, label] of [
      [.015, text('V\u00daT!', 'WHOOSH!')],
      [.39, text('V\u00c8O~', 'WHEE~')],
      [.74, text('H\u00cd H\u00cd!', 'HEHE!')]
    ]) {
      if (u < at || f.emitted.has(at) || (f.isQuiet && at !== .015)) continue;
      f.emitted.add(at); particle(f, 'words', x - 28, y + 65 * scale, 0, -26, label);
      burst(f, nozzle.x, nozzle.y);
    }
    updateParticles(f);
    f.raf = requestAnimationFrame(t => frame(t, f));
  }
  async function launch(trigger) {
    stop(); report();
    if (!allowed() || document.hidden) return false;
    const id = requestId;
    const loaded = await loadMascot();
    if (id !== requestId || !allowed() || document.hidden) return false;
    if (!loaded) {
      report(text('Ch\u01b0a t\u1ea3i \u0111\u01b0\u1ee3c mascot. Ki\u1ec3m tra t\u1ec7p mascot-intact-v253.webp trong assets/gallery/akiko/.',
        'Mascot could not load. Check assets/gallery/akiko/mascot-intact-v253.webp.'));
      return false;
    }
    const f = createFlight(trigger); active = f;
    f.raf = requestAnimationFrame(t => frame(t, f));
    return true;
  }
  document.addEventListener('club:motion', () => { if (!allowed()) stop(); });
  document.addEventListener('visibilitychange', () => { if (document.hidden) stop(); });
  window.addEventListener('pagehide', stop);
  // A real orientation/viewport change cancels safely; iOS toolbar-only height changes do not.
  window.addEventListener('resize', () => {
    if (active && (Math.abs(root.clientWidth - active.w) > 30 || Math.abs(innerHeight - active.h) > 160)) stop();
  }, {passive: true});
  document.addEventListener('keydown', e => { if (e.key === 'Escape') stop(); });
  window.ClubAkikoFlight = {
    version: VERSION, mascotURL: MASCOT, launch, stop,
    get state() {
      return {version: VERSION, active: !!active, phase: active?.phase || 'idle',
        elapsed: Math.round(active?.elapsed || 0), position: active ? {...active.position} : null,
        heading: active?.heading ?? null, particles: active?.particles.length || 0, error: lastError};
    }
  };
})();
} catch (error) { window.ClubModuleErrors.push('akiko-flight'); console.error('akiko-flight', error); }



/* v2.6.1 — Haruko Satoru botanical gallery: viewport-aware and frame-climbing. */
try {
(() => {
  'use strict';
  const root=document.documentElement, section=document.getElementById('gallery');
  let layer=null,selected=false,inView=false,active=false,petalTimer=0,lastOrigin=null;
  const flowerPath='M0 0 C-8 -2 -12 5 -9 11 C-6 17 -1 18 0 23 C1 18 6 17 9 11 C12 5 8 -2 0 0Z';
  const clusters=[[72,32,.72],[214,69,.94],[418,27,.66],[603,76,.86],[792,33,1.02],[1015,71,.74],[1248,29,.92],[1375,83,.62]];
  function cluster(x,y,scale=1){
    const flowers=[];
    const rows=4+((Math.round(x/17))%4);
    for(let r=0;r<rows;r++){
      const count=Math.max(1,4-Math.floor(r/2)+((r+Math.round(x))%2));
      for(let c=0;c<count;c++){
        const cx=(c-(count-1)/2)*17+(r%2?4:-3),cy=r*17;
        const tone=['deep','mid','light','pale'][(r+c)%4];
        flowers.push(`<path class="wisteria-bell ${tone}" d="${flowerPath}" transform="translate(${cx} ${cy}) scale(${.72+r*.035}) rotate(${(c-(count-1)/2)*8})"/>`);
      }
    }
    return `<g class="wisteria-cluster" transform="translate(${x} ${y}) scale(${scale})"><path d="M0 -15 C-4 18,4 60,0 125" fill="none" stroke="#647a57" stroke-width="2.3" stroke-linecap="round"/>${flowers.join('')}</g>`;
  }
  function createLayer(){
    if(layer||!section)return layer;
    layer=document.createElement('div');layer.id='wisteriaLayer';layer.setAttribute('aria-hidden','true');
    layer.innerHTML=`<svg class="wisteria-canopy" viewBox="0 0 1440 460" preserveAspectRatio="none" aria-hidden="true">
      <path class="wisteria-vine" pathLength="1" d="M-40 42 C110 9,230 108,398 62 S680 7,838 69 S1130 112,1480 18"/>
      <path class="wisteria-vine thin" pathLength="1" d="M-20 10 C170 82,320 9,510 81 S812 121,995 49 S1270 8,1465 72"/>
      <path class="wisteria-vine thin mobile-hide" pathLength="1" d="M72 0 C172 68,112 128,214 180 M1218 0 C1124 76,1222 129,1124 194"/>
      <g class="mobile-hide"><path class="wisteria-leaf" d="M70 57 Q91 38 111 58 Q89 72 70 57Z"/><path class="wisteria-leaf" d="M215 69 Q238 48 260 69 Q238 84 215 69Z"/><path class="wisteria-leaf" d="M520 53 Q546 31 570 54 Q545 69 520 53Z"/><path class="wisteria-leaf" d="M920 72 Q944 49 970 72 Q944 87 920 72Z"/><path class="wisteria-leaf" d="M1270 52 Q1294 31 1317 53 Q1293 68 1270 52Z"/></g>
      ${clusters.map(v=>cluster(...v)).join('')}</svg>
      <svg class="wisteria-sprawl" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <path class="wisteria-vine sprawl-vine" pathLength="1" d="M-3 9 C9 15,5 30,17 35 S13 53,27 59 S19 76,34 94"/>
        <path class="wisteria-vine thin sprawl-vine" pathLength="1" d="M102 5 C91 16,99 29,86 38 S94 56,79 66 S88 83,68 102"/>
        <path class="wisteria-vine thin sprawl-vine center-vine" pathLength="1" d="M17 -3 C25 8,39 3,45 15 S61 20,57 31 S72 39,66 53 S79 69,88 72"/>
      </svg><div class="wisteria-caption">HARUKO SATORU · 藤の庭</div>`;
    [['rose','4%','24%'],['white','91%','18%'],['sakura','8%','65%'],['lilac','88%','73%'],['rose','29%','84%'],['white','71%','52%']].forEach((v,i)=>layer.append(flower(v[0],v[1],v[2],`${(.2+i*.11).toFixed(2)}s`,`${-22+i*9}deg`)));
    section.prepend(layer);return layer;
  }
  function flower(kind,x,y,delay,rot){
    const el=document.createElement('span');el.className=`botanical-flower ${kind}`;el.style.left=x;el.style.top=y;el.style.setProperty('--delay',delay);el.style.setProperty('--rot',rot);for(let i=0;i<5;i++)el.append(document.createElement('i'));return el;
  }
  function leaf(x,y,r){const el=document.createElement('i');el.className='frame-leaf';el.style.left=x;el.style.top=y;el.style.setProperty('--r',r);return el;}
  function decorate(gallery){
    if(!gallery)return;
    gallery.querySelectorAll('.gallery-card:not(.placeholder-card)').forEach((card,i)=>{
      if(card.querySelector('.haruko-botany'))return;
      card.classList.add('has-haruko-botany');
      const deco=document.createElement('div');deco.className='haruko-botany';deco.setAttribute('aria-hidden','true');
      const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');svg.setAttribute('class','frame-vine');svg.setAttribute('viewBox','0 0 100 100');svg.setAttribute('preserveAspectRatio','none');
      const path=document.createElementNS('http://www.w3.org/2000/svg','path');path.setAttribute('pathLength','1');
      path.setAttribute('d',i%2===0?'M2 96 C11 78,1 62,10 45 S7 15,28 3 M25 4 C46 8,53 0,70 5':'M98 96 C87 78,99 61,89 43 S94 14,72 3 M75 4 C55 8,48 0,31 5');svg.append(path);deco.append(svg);
      const patterns=[
        [['rose','-6%','12%'],['lilac','12%','-6%']],
        [['white','79%','-5%'],['sakura','93%','45%']],
        [['lilac','-4%','34%'],['rose','86%','78%']],
        [['sakura','9%','-5%'],['white','90%','26%']],
        [['rose','-4%','70%'],['white','73%','-5%']],
        [['lilac','89%','64%'],['sakura','-5%','18%']]
      ];
      const variants=patterns[i%patterns.length];
      variants.forEach((v,k)=>deco.append(flower(v[0],v[1],v[2],`${(.12+i*.04+k*.12).toFixed(2)}s`,`${-15+i*7+k*11}deg`)));
      deco.append(leaf(i%2?'84%':'3%','35%',i%2?'-28deg':'28deg'),leaf(i%2?'91%':'8%','61%',i%2?'24deg':'-24deg'));
      card.append(deco);
    });
  }
  function petals(origin){
    if(!active||root.dataset.motion==='off'||!layer)return;
    const count=matchMedia('(max-width:700px)').matches?8:16,rect=origin?.getBoundingClientRect?.(),sec=section.getBoundingClientRect();
    const ox=rect?rect.left+rect.width/2-sec.left:sec.width*.5,oy=rect?rect.top+rect.height/2-sec.top:70;
    for(let i=0;i<count;i++){
      const p=document.createElement('i');p.className='wisteria-petal';const x=ox+(Math.random()-.5)*Math.min(sec.width*.7,700),y=oy+Math.random()*34;
      p.style.setProperty('--px',`${x}px`);p.style.setProperty('--py',`${y}px`);p.style.setProperty('--pr',`${Math.round(Math.random()*150-75)}deg`);p.style.setProperty('--drift',`${Math.round((Math.random()-.5)*150)}px`);p.style.setProperty('--fall',`${Math.round(170+Math.random()*260)}px`);p.style.setProperty('--pd',`${(3.2+Math.random()*1.8).toFixed(2)}s`);p.style.setProperty('--pdelay',`${(Math.random()*.5).toFixed(2)}s`);layer.append(p);p.addEventListener('animationend',()=>p.remove(),{once:true});
    }
  }
  function show(replay=false){
    createLayer();if(!layer)return;active=true;root.dataset.harukoVisible='true';
    if(replay||!layer.classList.contains('is-active')){layer.classList.remove('is-active');void layer.offsetWidth;layer.classList.add('is-active');}
    clearTimeout(petalTimer);petals(lastOrigin);petalTimer=setTimeout(()=>petals(),1150);
  }
  function hide(){active=false;root.dataset.harukoVisible='false';clearTimeout(petalTimer);layer?.classList.remove('is-active');layer?.querySelectorAll('.wisteria-petal').forEach(p=>p.remove());}
  function checkViewport(){if(!section)return false;const r=section.getBoundingClientRect();return r.bottom>innerHeight*.12&&r.top<innerHeight*.88;}
  function sync(replay=false){inView=checkViewport();if(selected&&inView)show(replay);else hide();}
  function activate(origin,replayOnly=false){selected=true;lastOrigin=origin||lastOrigin;sync(replayOnly);}
  function deactivate(){selected=false;hide();}
  function replay(origin){lastOrigin=origin||lastOrigin;if(selected)sync(true);}
  function pointer(e){if(!active||!layer||root.dataset.motion==='off')return;const r=section.getBoundingClientRect();if(e.clientY<r.top||e.clientY>r.bottom)return;const x=((e.clientX/innerWidth)-.5)*7,y=((e.clientY/innerHeight)-.5)*4;layer.style.setProperty('--wx',`${x.toFixed(1)}px`);layer.style.setProperty('--wy',`${y.toFixed(1)}px`);}
  addEventListener('pointermove',pointer,{passive:true});
  if(section&&'IntersectionObserver' in window)new IntersectionObserver(entries=>{inView=entries[0].isIntersecting;if(selected&&inView)show();else hide();},{rootMargin:'-10% 0px -10% 0px',threshold:.03}).observe(section);
  addEventListener('scroll',()=>{if(selected&&!('IntersectionObserver' in window))sync();},{passive:true});
  window.ClubWisteria={activate,deactivate,replay,decorate,get active(){return active;}};
})();
} catch(error){window.ClubModuleErrors.push('haruko-wisteria');console.error('haruko-wisteria',error);}

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
  const artistSwitcher=document.getElementById('artistSwitcher');
  const lightbox=document.getElementById('lightbox');
  const artists=Array.isArray(content.artists)?content.artists:[];
  let filter='all', selectedArtist=artists[0]?.id||null, selectedIndex=-1, lastTrigger=null;
  function make(tag,cls,text) {
    const el=document.createElement(tag);if(cls)el.className=cls;if(text!==undefined)el.textContent=text;return el;
  }
  function artName(art) {
    const title=local(art.title)?.trim();
    return title||`${local(art.author)} · ${local(art.description)}`;
  }
  function paintLightbox(index) {
    const art=content.artworks[index]; if(!art)return;
    selectedIndex=index;
    const img=document.getElementById('lightboxImage');
    img.src=art.image;img.alt=artName(art);
    const title=local(art.title)?.trim();
    document.getElementById('lightboxCaption').textContent=title?`${title} — ${local(art.author)}`:`${local(art.author)} — ${local(art.description)}`;
  }
  function openArtwork(index,trigger) {
    if(!lightbox?.showModal)return;
    window.ClubAkikoFlight?.stop();
    lastTrigger=trigger;paintLightbox(index);
    lightbox.showModal(); document.body.classList.add('no-scroll');
    motion?.animate(lightbox.querySelector('figure'),[{opacity:0,transform:'translateY(24px) scale(.95)'},{opacity:1,transform:'translateY(0) scale(1)'}],{duration:550,easing:'cubic-bezier(.16,1,.3,1)'});
  }
  function launchAkiko() {
    window.ClubAkikoFlight?.launch(artistSwitcher?.querySelector('[data-artist="akiko-oishi"]'));
  }
  function updateFilterButtons() {
    document.querySelectorAll('.filter').forEach(el=>{
      const active=el.dataset.filter===filter;el.classList.toggle('active',active);el.setAttribute('aria-pressed',String(active));
    });
  }
  function renderArtists() {
    if(!artistSwitcher)return;
    artistSwitcher.replaceChildren();
    artists.forEach((artist,index)=>{
      const btn=make('button','artist-chip');btn.type='button';btn.dataset.artist=artist.id;
      const active=artist.id===selectedArtist;btn.classList.toggle('active',active);btn.setAttribute('aria-pressed',String(active));
      const badge=make('span','artist-chip-index',String(index+1).padStart(2,'0'));
      const copy=make('span','artist-chip-copy');
      copy.append(make('small','',local(artist.label)),make('strong','',local(artist.name)),make('em','',local(artist.note)));
      if(artist.mascot){btn.classList.add('artist-chip-with-avatar');const avatar=make('span','artist-chip-avatar');const im=make('img');im.src=artist.id==='akiko-oishi' ? (window.ClubAkikoFlight?.mascotURL || artist.mascot) : artist.mascot;im.alt='';im.loading='lazy';im.decoding='async';avatar.append(im);btn.append(avatar);}
      btn.append(badge,copy);
      btn.addEventListener('click',()=>{
        if(selectedArtist===artist.id){motion?.burst(btn,'',5);if(artist.id==='akiko-oishi')launchAkiko();if(artist.id==='bao-tam')window.ClubWisteria?.replay(btn);return;}
        window.ClubAkikoFlight?.stop();window.ClubWisteria?.deactivate();selectedArtist=artist.id;filter='all';updateFilterButtons();renderArtists();renderGallery();
        motion?.burst(artistSwitcher.querySelector('[data-artist="'+artist.id+'"]'),'',9);
        if(artist.id==='akiko-oishi')launchAkiko();
        if(artist.id==='bao-tam')window.ClubWisteria?.activate(artistSwitcher.querySelector('[data-artist=\"bao-tam\"]'),true);
      });
      artistSwitcher.append(btn);
    });
  }
  function renderGallery() {
    document.documentElement.dataset.selectedArtist=selectedArtist||'';
    gallery.replaceChildren();
    const visible=content.artworks.map((art,index)=>({art,index})).filter(({art})=>(!selectedArtist||art.artistId===selectedArtist)&&(filter==='all'||art.category===filter));
    const artist=artists.find(a=>a.id===selectedArtist);
    if(artist){
      const head=make('div','gallery-author');
      const label=make('span','gallery-author-kicker',document.documentElement.lang==='en'?'ARTIST':'TÁC GIẢ');
      const title=make('h3','',`${local(artist.label)} ${local(artist.name)}`.trim());
      const count=make('p','',`${visible.length} ${document.documentElement.lang==='en'?(visible.length===1?'work':'works'):'tác phẩm'}`);
      head.append(label,title,count);gallery.append(head);
    }
    visible.forEach(({art,index})=>{
      const card=make('button','gallery-card');
      card.type='button';card.dataset.index=index;
      const label=artName(art);card.setAttribute('aria-label',`${t('viewArt')}: ${label}`);
      const img=make('img');
      img.src=art.thumb||art.image;img.alt=label;img.loading='lazy';img.decoding='async';img.width=700;img.height=700;
      try{img.fetchPriority='low';}catch{}
      const info=make('div','gallery-info');
      const title=local(art.title)?.trim();
      if(title)info.append(make('h3','',title));
      info.append(make('p','',local(art.description)));
      card.classList.toggle('gallery-card-no-title',!title);
      card.append(img,info);
      card.addEventListener('click',()=>openArtwork(index,card));
      gallery.append(card);
    });
    if(!visible.length) {
      const card=make('article','gallery-card placeholder-card');
      const art=make('div','placeholder-art');art.innerHTML=t('moreArt');
      const info=make('div','gallery-info');info.append(make('h3','',t('comingSoon')),make('p','',t('clubFull')));
      card.append(art,info);gallery.append(card);
    }
    if(selectedArtist==='bao-tam')window.ClubWisteria?.decorate(gallery);
    motion?.register(gallery);
  }
  document.querySelectorAll('.filter').forEach(button=>{
    button.addEventListener('click',()=>{
      filter=button.dataset.filter;updateFilterButtons();renderGallery();motion?.burst(button,'',7);
    });
  });
  renderArtists();updateFilterButtons();renderGallery();if(selectedArtist==='bao-tam')window.ClubWisteria?.activate(artistSwitcher?.querySelector('[data-artist=\"bao-tam\"]'),true);
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
    const indices=content.artworks.map((a,i)=>({a,i})).filter(({a})=>(!selectedArtist||a.artistId===selectedArtist)&&(filter==='all'||a.category===filter)).map(({i})=>i);
    if(indices.length<2)return;
    e.preventDefault();
    const at=indices.indexOf(selectedIndex),next=(at+(e.key==='ArrowRight'?1:-1)+indices.length)%indices.length;
    paintLightbox(indices[next]);
  });
  document.addEventListener('club:language',()=>{
    renderArtists();renderGallery();if(lightbox.open)paintLightbox(selectedIndex);
  });
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
   akiko:window.ClubAkikoFlight?.state,
   viewport:root.clientWidth,layout:root.scrollWidth,
   overflow:Math.max(0,root.scrollWidth-root.clientWidth),
   motion:root.dataset.motion,choice:root.dataset.motionChoice,
   systemReduce:matchMedia('(prefers-reduced-motion:reduce)').matches,
   cssBuild:getComputedStyle(root).getPropertyValue('--club-build').trim(),
   errors:window.ClubModuleErrors||[],
   turntable:window.ClubTurntable?.state
 });
})();

window.ClubBuild='2.6.2';