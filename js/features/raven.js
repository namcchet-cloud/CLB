const RV64_VERSION = 'raven-6.4.1-fidelity-plus';
const RV64_DURATION = 6800;

function driverSVG() {
  return `
<svg class="rv64-svg" viewBox="0 0 1600 900" role="img" aria-label="Raven Lin vector transformation driver">
  <defs>
    <linearGradient id="rv64-silver" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#fafbfc"/>
      <stop offset=".18" stop-color="#d8dde2"/>
      <stop offset=".52" stop-color="#a3acb5"/>
      <stop offset=".82" stop-color="#f3f5f7"/>
      <stop offset="1" stop-color="#848c94"/>
    </linearGradient>
    <linearGradient id="rv64-gunmetal" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#2b3652"/>
      <stop offset=".35" stop-color="#161d31"/>
      <stop offset=".7" stop-color="#0c1222"/>
      <stop offset="1" stop-color="#172038"/>
    </linearGradient>
    <linearGradient id="rv64-gunmetal-2" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#101727"/>
      <stop offset=".3" stop-color="#202945"/>
      <stop offset=".55" stop-color="#0e1524"/>
      <stop offset="1" stop-color="#24314f"/>
    </linearGradient>
    <linearGradient id="rv64-white" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#ffffff"/>
      <stop offset=".55" stop-color="#f5f6f4"/>
      <stop offset="1" stop-color="#d7dde3"/>
    </linearGradient>
    <linearGradient id="rv64-white-edge" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#ffffff"/>
      <stop offset=".5" stop-color="#c5ccd2"/>
      <stop offset="1" stop-color="#f6f8f7"/>
    </linearGradient>
    <linearGradient id="rv64-red" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#ff6359"/>
      <stop offset=".35" stop-color="#ec231f"/>
      <stop offset=".8" stop-color="#b00613"/>
      <stop offset="1" stop-color="#71000a"/>
    </linearGradient>
    <linearGradient id="rv64-red-hi" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#ff8177"/>
      <stop offset=".46" stop-color="#ef231f"/>
      <stop offset="1" stop-color="#88000c"/>
    </linearGradient>
    <linearGradient id="rv64-red-glass" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#ff9084" stop-opacity=".97"/>
      <stop offset=".5" stop-color="#ea1e26" stop-opacity=".76"/>
      <stop offset="1" stop-color="#7e0012" stop-opacity=".95"/>
    </linearGradient>
    <radialGradient id="rv64-green" cx="50%" cy="50%" r="70%">
      <stop offset="0" stop-color="#edffd8"/>
      <stop offset=".25" stop-color="#95ff69"/>
      <stop offset=".72" stop-color="#39da56"/>
      <stop offset="1" stop-color="#0b7a49"/>
    </radialGradient>
    <radialGradient id="rv64-bluecore" cx="42%" cy="34%" r="65%">
      <stop offset="0" stop-color="#d8e1ff"/>
      <stop offset=".35" stop-color="#8ba2e2"/>
      <stop offset="1" stop-color="#38497c"/>
    </radialGradient>
    <filter id="rv64-shadow" x="-50%" y="-50%" width="200%" height="200%">
      <feDropShadow dx="0" dy="12" stdDeviation="10" flood-color="#000" flood-opacity=".56"/>
    </filter>
    <filter id="rv64-soft" x="-50%" y="-50%" width="200%" height="200%">
      <feDropShadow dx="0" dy="4" stdDeviation="3" flood-color="#000" flood-opacity=".52"/>
    </filter>
    <filter id="rv64-glow" x="-100%" y="-100%" width="300%" height="300%">
      <feGaussianBlur stdDeviation="8" result="b"/>
      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>

  <g class="rv64-belt" filter="url(#rv64-shadow)">
    <g class="rv64-belt-left">
      <path d="M102 374h214v152H102L58 490v-80z" fill="url(#rv64-silver)" stroke="#5d6770" stroke-width="8"/>
      <path d="M126 395h67v111h-67l-22-18v-74z" fill="#eff2f5" stroke="#7a848e" stroke-width="6"/>
      <path d="M206 395h82v111h-82z" fill="#dee4e8" opacity=".84"/>
      <path d="M221 413h52v74h-52z" fill="#f8fafb" stroke="#99a2aa" stroke-width="5"/>
      <path d="M296 395h18v111h-18z" fill="#8d98a4" opacity=".8"/>
      <g stroke="#88929b" stroke-width="5"><path d="M286 418h-55"/><path d="M286 438h-55"/><path d="M286 458h-55"/><path d="M286 478h-55"/></g>
    </g>
    <g class="rv64-belt-right">
      <path d="M1284 374h214l44 36v80l-44 36h-214z" fill="url(#rv64-silver)" stroke="#5d6770" stroke-width="8"/>
      <path d="M1407 395h67l22 18v74l-22 18h-67z" fill="#eff2f5" stroke="#7a848e" stroke-width="6"/>
      <path d="M1312 395h82v111h-82z" fill="#dee4e8" opacity=".84"/>
      <path d="M1327 413h52v74h-52z" fill="#f8fafb" stroke="#99a2aa" stroke-width="5"/>
      <path d="M1286 395h18v111h-18z" fill="#8d98a4" opacity=".8"/>
      <g stroke="#88929b" stroke-width="5"><path d="M1314 418h55"/><path d="M1314 438h55"/><path d="M1314 458h55"/><path d="M1314 478h55"/></g>
    </g>
  </g>

  <g class="rv64-base" filter="url(#rv64-shadow)">
    <path d="M336 292h339l58 58v200l-58 58H336l-59-58V350z" fill="url(#rv64-gunmetal-2)" stroke="#0b1120" stroke-width="12"/>
    <path d="M1264 292H925l-58 58v200l58 58h339l59-58V350z" fill="url(#rv64-gunmetal-2)" stroke="#0b1120" stroke-width="12"/>
    <path d="M367 336h278l40 33v162l-40 33H367l-38-33V369z" fill="url(#rv64-gunmetal)" stroke="#34425e" stroke-width="5"/>
    <path d="M1233 336H955l-40 33v162l40 33h278l38-33V369z" fill="url(#rv64-gunmetal)" stroke="#34425e" stroke-width="5"/>
    <g stroke="#566481" stroke-width="5" opacity=".76" fill="none">
      <path d="M394 378h104l39 28h107"/><path d="M386 433h132l24 18h103"/><path d="M388 489h132l24-18h101"/><path d="M397 547h103l39-28h106"/>
      <path d="M1206 378h-104l-39 28H956"/><path d="M1214 433h-132l-24 18H955"/><path d="M1212 489h-132l-24-18H955"/><path d="M1203 547h-103l-39-28H955"/>
    </g>
    <g fill="#070b13" stroke="#79869d" stroke-width="4">
      <circle cx="447" cy="392" r="11"/><circle cx="447" cy="548" r="11"/><circle cx="1153" cy="392" r="11"/><circle cx="1153" cy="548" r="11"/>
    </g>
    <path d="M425 447h139v18H425zM432 482h118v14H432zM1036 447h139v18h-139zM1050 482h118v14h-118z" fill="#0a0f18"/>

    <circle cx="800" cy="450" r="222" fill="#090d14" stroke="#232c3f" stroke-width="13"/>
    <circle cx="800" cy="450" r="205" fill="#151c2a" stroke="#6b7689" stroke-width="8"/>
    <circle cx="800" cy="450" r="184" fill="#121925" stroke="#2e384d" stroke-width="8"/>
    <g>
      <path d="M647 309a182 182 0 0 1 153-41" stroke="#f2f4f8" stroke-width="16" fill="none" stroke-linecap="round"/>
      <path d="M645 341a150 150 0 0 1 155-39" stroke="#f2f4f8" stroke-width="13" fill="none" stroke-linecap="round"/>
      <path d="M648 372a118 118 0 0 1 152-36" stroke="#f2f4f8" stroke-width="11" fill="none" stroke-linecap="round"/>
      <path d="M648 402a88 88 0 0 1 152-24" stroke="#f2f4f8" stroke-width="9" fill="none" stroke-linecap="round"/>
      <path d="M792 262 877 274 855 294 879 434 853 640 778 636 803 451 781 286z" fill="url(#rv64-gunmetal-2)" stroke="#0f1420" stroke-width="9"/>
      <g stroke="#47536f" stroke-width="4" opacity=".75"><path d="M792 294l58-7"/><path d="M800 323l51-7"/><path d="M808 350l44-6"/><path d="M815 377l38-4"/></g>
    </g>

    <g class="rv64-energy-core" opacity=".15" filter="url(#rv64-glow)">
      <path d="M800 257a193 193 0 0 1 136 56l-52 52a120 120 0 0 0-84-35z" fill="url(#rv64-green)"/>
      <path d="M993 450a193 193 0 0 1-56 136l-52-52a120 120 0 0 0 35-84z" fill="url(#rv64-green)"/>
      <path d="M800 643a193 193 0 0 1-136-56l52-52a120 120 0 0 0 84 35z" fill="url(#rv64-green)"/>
      <path d="M607 450a193 193 0 0 1 56-136l52 52a120 120 0 0 0-35 84z" fill="url(#rv64-green)"/>
    </g>
    <g fill="#0e1524" stroke="#2f3a50" stroke-width="7">
      <path d="M763 247h74l31 105-58 24-59-24z"/>
      <path d="M1003 413v74l-105 31-24-58 24-59z"/>
      <path d="M837 653h-74l-31-105 58-24 59 24z"/>
      <path d="M597 487v-74l105-31 24 58-24 59z"/>
    </g>
    <g fill="#da1c27" opacity=".9"><path d="M796 273h8v56h-8z"/><path d="M923 319l6 6-40 40-6-6z"/><path d="M977 446v8h-56v-8z"/><path d="M923 575l-6 6-40-40 6-6z"/><path d="M804 626h-8v-56h8z"/><path d="M677 581l-6-6 40-40 6 6z"/><path d="M623 454v-8h56v8z"/><path d="M677 325l6-6 40 40-6 6z"/></g>
    <circle cx="800" cy="450" r="84" fill="#0f1624" stroke="#060a12" stroke-width="8"/>
    <circle cx="800" cy="450" r="66" fill="url(#rv64-bluecore)" stroke="#9aacd4" stroke-width="6"/>
    <g fill="none" stroke="#415180" stroke-width="3.5" opacity=".9">
      <path d="M769 430 800 406l31 24v40l-31 24-31-24z"/><path d="M800 406v88"/><path d="M769 430l62 40"/><path d="M831 430l-62 40"/>
    </g>
  </g>

  <g class="rv64-assembly" filter="url(#rv64-soft)">
    <g class="rv64-prelock">
      <g class="rv64-white-top-paws" fill="url(#rv64-white)" stroke="#b8c0c7" stroke-width="5">
        <path d="M680 286h24l14 50-16 8-18-25z"/><path d="M706 280h25l12 50-16 8-17-24z"/><path d="M733 281h22l8 46-14 8-14-22z"/>
        <path d="M844 286h-24l-14 50 16 8 18-25z"/><path d="M870 280h-25l-12 50 16 8 17-24z"/><path d="M897 281h-22l-8 46 14 8 14-22z"/>
      </g>
      <g class="rv64-top-cap" fill="url(#rv64-white)" stroke="#adb5bd" stroke-width="6">
        <path d="M758 220h84l24 36v66h-132v-66z"/>
        <path d="M800 188 840 220H760z"/>
        <path d="M744 232 772 205 800 215 828 205 856 232 842 260H758z" fill="#f3f5f4"/>
        <circle cx="800" cy="250" r="5" fill="#717981"/><circle cx="800" cy="286" r="5" fill="#717981"/>
      </g>
      <g class="rv64-center-lock">
        <circle cx="800" cy="450" r="84" fill="#202733" stroke="#7e8898" stroke-width="7"/>
        <circle cx="800" cy="450" r="70" fill="#f6f7f5" stroke="#c0c7cd" stroke-width="6"/>
        <circle cx="800" cy="450" r="60" fill="#eef2f0" stroke="#ff646e" stroke-width="4"/>
        <path d="M800 397 824 422 855 410 840 451 856 493 816 485 800 525 784 485 744 493 760 451 745 410 776 422z" fill="#eb202a"/>
        <path d="M773 425 800 449 827 425 818 470 800 488 782 470z" fill="#fff"/>
      </g>
    </g>

    <g class="rv64-white-buckle">
      <path d="M205 425h127l42 24v48l-42 24H205l-27-21v-54z" fill="url(#rv64-white)" stroke="#bcc3c9" stroke-width="6"/>
      <path d="M220 438h98l28 16v38l-28 16h-98l-19-15v-40z" fill="#f5f6f5" stroke="#d7dde1" stroke-width="4"/>
      <g fill="#ecefef" stroke="#8fa2b1" stroke-width="2" opacity=".55"><path d="M236 447h62"/><path d="M236 461h62"/><path d="M236 475h62"/></g>
      <g class="rv64-white-group">
        <g class="rv64-w-seg rv64-w-top">
          <path d="M665 405 620 380 542 319 404 279 332 305 387 356 546 382 650 430z" fill="url(#rv64-white)" stroke="#c2c9cf" stroke-width="7"/>
          <path d="M607 379 553 347 446 319 424 329 468 349 558 369 611 398z" fill="#ef2730" stroke="#ff8480" stroke-width="4"/>
          <path d="M409 319h-27v48h30z" fill="#f8f8f8" stroke="#9199a1" stroke-width="3"/>
          <path d="M388 333h18M388 346h18M388 359h18" stroke="#535d67" stroke-width="3"/>
          <path d="M623 388 666 430" stroke="#e6f2ff" stroke-width="4" opacity=".5"/>
          <ellipse cx="533" cy="358" rx="7" ry="5" fill="#850d16"/>
        </g>
        <g class="rv64-w-seg rv64-w-mid">
          <path d="M668 450 616 436 499 424H303l-63 26 63 26h196l117-14z" fill="url(#rv64-white)" stroke="#c2c9cf" stroke-width="7"/>
          <path d="M607 437 513 432H349l-42 18 42 18h164l94-4z" fill="#ef2730" stroke="#ff8480" stroke-width="4"/>
          <path d="M239 431h-28l-31 19 31 19h28z" fill="#fbfbfa" stroke="#c2c6c8" stroke-width="5"/>
          <path d="M647 444h24l10 6-10 6-24-2z" fill="#9d131b" stroke="#ff6d79" stroke-width="2.5"/>
        </g>
        <g class="rv64-w-seg rv64-w-bot">
          <path d="M665 495 620 520 542 581 404 621 332 595 387 544 546 518 650 470z" fill="url(#rv64-white)" stroke="#c2c9cf" stroke-width="7"/>
          <path d="M607 521 553 553 446 581 424 571 468 551 558 531 611 502z" fill="#ef2730" stroke="#ff8480" stroke-width="4"/>
          <path d="M409 581h-27v-48h30z" fill="#f8f8f8" stroke="#9199a1" stroke-width="3"/>
          <path d="M388 567h18M388 554h18M388 541h18" stroke="#535d67" stroke-width="3"/>
          <path d="M623 512 666 470" stroke="#e6f2ff" stroke-width="4" opacity=".5"/>
          <ellipse cx="533" cy="542" rx="7" ry="5" fill="#850d16"/>
        </g>
      </g>
      <g fill="#111722"><circle cx="447" cy="319" r="5"/><circle cx="447" cy="581" r="5"/><circle cx="598" cy="399" r="4.5"/><circle cx="598" cy="501" r="4.5"/></g>
    </g>

    <g class="rv64-red-buckle">
      <path d="M1269 425h-120l-43 24v48l43 24h120l27-21v-54z" fill="url(#rv64-red-glass)" stroke="#78000b" stroke-width="6"/>
      <path d="M1254 438h-90l-28 16v38l28 16h90l20-15v-40z" fill="#c8121d" stroke="#f33b41" stroke-width="4"/>
      <g class="rv64-red-group">
        <g class="rv64-r-seg rv64-r-top">
          <path d="M935 429 1019 388 1119 344 1224 318 1300 322 1280 349 1161 378 1006 442z" fill="url(#rv64-red-hi)" stroke="#8d0610" stroke-width="7"/>
          <path d="M971 426c83-38 173-72 312-88l-20 22c-112 13-191 40-272 78z" fill="#ff7568" opacity=".48"/>
          <path d="M964 410c48-4 88 10 109 25" fill="none" stroke="#ffb1a5" stroke-width="4" opacity=".32"/>
        </g>
        <g class="rv64-r-seg rv64-r-mid">
          <path d="M919 450 1009 420 1166 398h126l72 52-72 52h-126l-157-20z" fill="url(#rv64-red)" stroke="#8d0610" stroke-width="7"/>
          <path d="M1003 446c90-24 194-26 309-8l27 12-27 12c-115 18-219 16-309-8z" fill="#ff7a70" opacity=".34"/>
        </g>
        <g class="rv64-r-seg rv64-r-bot">
          <path d="M935 471 1019 512 1119 556 1224 582 1300 578 1280 551 1161 522 1006 458z" fill="url(#rv64-red-hi)" stroke="#8d0610" stroke-width="7"/>
          <path d="M971 474c83 38 173 72 312 88l-20-22c-112-13-191-40-272-78z" fill="#ff7568" opacity=".48"/>
          <path d="M964 490c48 4 88-10 109-25" fill="none" stroke="#ffb1a5" stroke-width="4" opacity=".32"/>
        </g>
      </g>
      <path d="M1264 357h46l33 29v128l-33 29h-46z" fill="#cf1520" stroke="#84060b" stroke-width="6"/>
      <g stroke="#535a61" stroke-width="5"><path d="M1269 408h43"/><path d="M1272 421h40"/><path d="M1275 434h35"/></g>
      <g fill="#0a0d11"><circle cx="1258" cy="321" r="7"/><circle cx="1234" cy="432" r="7"/><circle cx="1234" cy="486" r="7"/><circle cx="1258" cy="579" r="7"/><circle cx="1197" cy="451" r="6"/></g>
      <path d="M996 548h72l27 22-19 43h-96l-24-43z" fill="url(#rv64-red-glass)" stroke="#7b0710" stroke-width="6"/>
      <path d="M1008 560h48l15 12-12 22h-58z" fill="#ff6257" opacity=".45"/>
      <g stroke="#fff" stroke-width="3" opacity=".76"><path d="M1049 554l-13 35"/><path d="M1062 558l-12 31"/><path d="M1073 563l-10 26"/></g>
    </g>

    <g class="rv64-red-back">
      <g class="rv64-b-seg rv64-b-top">
        <path d="M936 430 1007 389 1084 340 1168 308 1241 295 1275 323 1228 369 1080 392 984 444z" fill="url(#rv64-white)" stroke="#c2c9cf" stroke-width="7"/>
        <path d="M1005 392 1060 358 1150 331 1207 324 1168 357 1060 381 1005 409z" fill="#ef2730" stroke="#ff8480" stroke-width="4"/>
        <ellipse cx="1012" cy="428" rx="9" ry="6" fill="#8c1018"/>
      </g>
      <g class="rv64-b-seg rv64-b-mid">
        <path d="M919 450 1000 428h188l72 22-72 22h-188l-81-12z" fill="url(#rv64-white)" stroke="#c2c9cf" stroke-width="7"/>
        <path d="M998 437h151l46 13-46 13H998z" fill="#ef2730" stroke="#ff8480" stroke-width="4"/>
        <path d="M1262 430h28l31 20-31 20h-28z" fill="#fbfbfa" stroke="#c2c6c8" stroke-width="5"/>
      </g>
      <g class="rv64-b-seg rv64-b-bot">
        <path d="M936 470 1007 511 1084 560 1168 592 1241 605 1275 577 1228 531 1080 508 984 456z" fill="url(#rv64-white)" stroke="#c2c9cf" stroke-width="7"/>
        <path d="M1005 508 1060 542 1150 569 1207 576 1168 543 1060 519 1005 491z" fill="#ef2730" stroke="#ff8480" stroke-width="4"/>
        <ellipse cx="1012" cy="472" rx="9" ry="6" fill="#8c1018"/>
      </g>
    </g>

    <g class="rv64-final">
      <g class="rv64-final-crown">
        <path class="rv64-fw rv64-fw-topl" d="M724 302 693 244 690 172 717 145 764 250z" fill="url(#rv64-white)" stroke="#c2c9cf" stroke-width="7"/>
        <path class="rv64-fw rv64-fw-topcl" d="M771 286 739 183 757 119 787 106 799 224z" fill="url(#rv64-white)" stroke="#c2c9cf" stroke-width="7"/>
        <path class="rv64-fw rv64-fw-topc" d="M800 278 790 184 800 110 810 184z" fill="url(#rv64-white)" stroke="#c2c9cf" stroke-width="7"/>
        <path class="rv64-fw rv64-fw-topcr" d="M829 286 861 183 843 119 813 106 801 224z" fill="url(#rv64-white)" stroke="#c2c9cf" stroke-width="7"/>
        <path class="rv64-fw rv64-fw-topr" d="M876 302 907 244 910 172 883 145 836 250z" fill="url(#rv64-white)" stroke="#c2c9cf" stroke-width="7"/>
        <g fill="#ef2730" stroke="#ff8a86" stroke-width="4">
          <path d="M731 278 713 237 713 191 727 177 756 248z"/>
          <path d="M776 269 758 184 769 142 785 136 795 221z"/>
          <path d="M800 262 794 194 800 156 806 194z"/>
          <path d="M824 269 842 184 831 142 815 136 805 221z"/>
          <path d="M869 278 887 237 887 191 873 177 844 248z"/>
        </g>
      </g>

      <g class="rv64-final-wings-left">
        <path class="rv64-fw rv64-fw-left1" d="M713 379 607 319 469 304 432 324 496 397 683 406z" fill="url(#rv64-white)" stroke="#c2c9cf" stroke-width="7"/>
        <path class="rv64-fw rv64-fw-left2" d="M707 443 582 419 446 430 419 450 521 492 691 479z" fill="url(#rv64-white)" stroke="#c2c9cf" stroke-width="7"/>
        <path class="rv64-fw rv64-fw-left3" d="M713 521 607 581 469 596 432 576 496 503 683 494z" fill="url(#rv64-white)" stroke="#c2c9cf" stroke-width="7"/>
        <g fill="#ef2730" stroke="#ff8a86" stroke-width="4">
          <path d="M685 392 598 346 532 337 576 388 677 397z"/>
          <path d="M680 444 572 427 495 437 590 470 676 467z"/>
          <path d="M685 507 598 553 532 562 576 511 677 500z"/>
        </g>
        <g fill="#8f1019"><ellipse cx="673" cy="405" rx="7" ry="10"/><ellipse cx="664" cy="476" rx="7" ry="10"/><ellipse cx="673" cy="493" rx="7" ry="10"/></g>
      </g>

      <g class="rv64-final-wings-right">
        <path class="rv64-fw rv64-fw-right1" d="M887 379 993 319 1131 304 1168 324 1104 397 917 406z" fill="url(#rv64-white)" stroke="#c2c9cf" stroke-width="7"/>
        <path class="rv64-fw rv64-fw-right2" d="M893 443 1018 419 1154 430 1181 450 1079 492 909 479z" fill="url(#rv64-white)" stroke="#c2c9cf" stroke-width="7"/>
        <path class="rv64-fw rv64-fw-right3" d="M887 521 993 581 1131 596 1168 576 1104 503 917 494z" fill="url(#rv64-white)" stroke="#c2c9cf" stroke-width="7"/>
        <g fill="#ef2730" stroke="#ff8a86" stroke-width="4">
          <path d="M915 392 1002 346 1068 337 1024 388 923 397z"/>
          <path d="M920 444 1028 427 1105 437 1010 470 924 467z"/>
          <path d="M915 507 1002 553 1068 562 1024 511 923 500z"/>
        </g>
        <g fill="#8f1019"><ellipse cx="927" cy="405" rx="7" ry="10"/><ellipse cx="936" cy="476" rx="7" ry="10"/><ellipse cx="927" cy="493" rx="7" ry="10"/></g>
      </g>

      <g class="rv64-final-cylinders" opacity=".96">
        <path d="M693 338 721 356 692 408 662 392z" fill="url(#rv64-red-glass)" stroke="#920b13" stroke-width="5"/>
        <path d="M907 338 879 356 908 408 938 392z" fill="url(#rv64-red-glass)" stroke="#920b13" stroke-width="5"/>
        <g stroke="#ffb5ae" stroke-width="3" opacity=".55"><path d="M676 356l17 9"/><path d="M685 373l16 9"/><path d="M698 390l12 6"/><path d="M924 356l-17 9"/><path d="M915 373l-16 9"/><path d="M902 390l-12 6"/></g>
      </g>

      <g class="rv64-final-mask">
        <path d="M800 364 752 380 728 438 745 491 800 527 855 491 872 438 848 380z" fill="url(#rv64-white)" stroke="#a8b0b8" stroke-width="8"/>
        <path d="M775 362 743 330 760 301 795 328zM825 362l32-32-17-29-35 27z" fill="url(#rv64-white)" stroke="#a8b0b8" stroke-width="6"/>
        <path d="M758 405 780 417 775 439 752 432zM842 405l-22 12 5 22 23-7z" fill="#101722"/>
        <path d="M765 397 780 405 776 418 761 412zM835 397l-15 8 4 13 15-5z" fill="#e3242d"/>
        <path d="M800 432 816 458 800 477 784 458z" fill="#171f2c"/>
        <path d="M789 490h22l-11 18z" fill="#111824"/>
        <path d="M790 502v22M764 511l36 18 36-18" fill="none" stroke="#df1e2b" stroke-width="6" stroke-linecap="round"/>
      </g>

      <g class="rv64-final-paws" fill="url(#rv64-white)" stroke="#b8c0c7" stroke-width="5">
        <path d="M704 533h36l20 33-18 22-38-12-14-22z"/>
        <path d="M896 533h-36l-20 33 18 22 38-12 14-22z"/>
        <path d="M784 532h32l-16 44z" fill="#fff"/>
        <path d="M788 560h24l-12 16z" fill="#111824"/>
      </g>
    </g>
  </g>

  <g class="rv64-streaks" opacity="0" stroke-linecap="round">
    <path d="M150 350h320M120 450h370M150 550h320" stroke="#ffffff" stroke-width="8"/>
    <path d="M1450 350h-320M1480 450h-370M1450 550h-320" stroke="#ff3843" stroke-width="8"/>
  </g>
</svg>`;
}

function styles(scope = '.rv64-layer') {
  return `
${scope}{position:fixed;inset:0;z-index:2147481000;display:grid;place-items:center;overflow:hidden;background:radial-gradient(circle at 50% 45%,#171a20 0,#0a0c11 42%,#020306 80%,#000 100%);color:#fff;font-family:system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;isolation:isolate;touch-action:none}
${scope} *{box-sizing:border-box}
${scope} .rv64-grid{position:absolute;inset:-10%;opacity:.14;background-image:linear-gradient(rgba(255,255,255,.08) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.08) 1px,transparent 1px);background-size:50px 50px;transform:perspective(700px) rotateX(60deg) translateY(34%);mask-image:linear-gradient(to bottom,transparent,#000 22%,#000 65%,transparent)}
${scope} .rv64-aura{position:absolute;width:min(84vw,1100px);aspect-ratio:1;border-radius:50%;background:conic-gradient(from 0deg,transparent,rgba(229,29,39,.16),transparent 22%,rgba(105,255,119,.12),transparent 48%,rgba(229,29,39,.16),transparent 72%);filter:blur(18px);opacity:.38;animation:rv64Aura 4.8s linear infinite}
${scope} .rv64-stage{position:relative;width:min(96vw,1460px);height:min(76vh,820px);display:grid;place-items:center;perspective:1100px}
${scope} .rv64-svg{width:100%;height:100%;overflow:visible;filter:drop-shadow(0 18px 22px rgba(0,0,0,.48));transform:translateZ(0)}
${scope} .rv64-belt,${scope} .rv64-base{opacity:0}
${scope} .rv64-energy-core{opacity:.08}
${scope} .rv64-white-buckle,${scope} .rv64-red-buckle,${scope} .rv64-red-back,${scope} .rv64-final{transform-box:view-box;transform-origin:800px 450px}
${scope} .rv64-white-buckle{opacity:0;transform:translateX(-740px)}
${scope} .rv64-red-buckle{opacity:0;transform:translateX(740px)}
${scope} .rv64-assembly{transform-box:view-box;transform-origin:800px 450px;transform:rotate(0deg)}
${scope} .rv64-red-back,${scope} .rv64-final{opacity:0}
${scope} .rv64-b-seg,${scope} .rv64-final .rv64-fw,${scope} .rv64-final-mask,${scope} .rv64-final-paws,${scope} .rv64-final-cylinders{transform-box:view-box;transform-origin:800px 450px}
${scope} .rv64-b-seg{transform:scaleX(.04)}
${scope} .rv64-final .rv64-fw{opacity:0}
${scope} .rv64-final-mask{opacity:0;transform:scale(.28)}
${scope} .rv64-final-paws{opacity:0;transform:translateY(18px) scale(.6)}
${scope} .rv64-final-cylinders{opacity:0;transform:scale(.45)}
${scope} .rv64-streaks{transform-box:view-box;transform-origin:800px 450px}
${scope}.rv64-running .rv64-belt{animation:rv64Fade .42s cubic-bezier(.16,.84,.22,1) .08s both}
${scope}.rv64-running .rv64-base{animation:rv64Fade .55s cubic-bezier(.16,.84,.22,1) .16s both}
${scope}.rv64-running .rv64-white-buckle{animation:rv64WhiteIn .72s cubic-bezier(.12,.88,.2,1.08) .82s both}
${scope}.rv64-running .rv64-red-buckle{animation:rv64RedIn .72s cubic-bezier(.12,.88,.2,1.08) 1.58s both,rv64RedFrontFade .32s ease 3.66s forwards}
${scope}.rv64-running .rv64-energy-core{animation:rv64Energy .4s ease 2.18s both,rv64EnergyPulse .85s ease-in-out 2.6s infinite alternate}
${scope}.rv64-running .rv64-assembly{animation:rv64Rotate .92s cubic-bezier(.28,.02,.2,.98) 2.9s both,rv64RotateHold .72s linear 3.82s both}
${scope}.rv64-running .rv64-streaks{animation:rv64Streaks .42s ease 3.12s both}
${scope}.rv64-running .rv64-prelock{animation:rv64Hide .22s ease 3.58s forwards}
${scope}.rv64-running .rv64-red-back{animation:rv64BackShow .44s ease 3.76s both}
${scope}.rv64-running .rv64-b-top{animation:rv64BackTop .54s cubic-bezier(.18,.82,.16,1) 3.78s both}
${scope}.rv64-running .rv64-b-mid{animation:rv64BackMid .50s cubic-bezier(.18,.82,.16,1) 3.8s both}
${scope}.rv64-running .rv64-b-bot{animation:rv64BackBot .54s cubic-bezier(.18,.82,.16,1) 3.82s both}
${scope}.rv64-running .rv64-final{animation:rv64FinalShow .4s ease 3.9s both}
${scope}.rv64-running .rv64-fw-topl{animation:rv64PetalA .58s cubic-bezier(.14,.84,.18,1.08) 3.92s both}
${scope}.rv64-running .rv64-fw-topcl{animation:rv64PetalB .58s cubic-bezier(.14,.84,.18,1.08) 3.96s both}
${scope}.rv64-running .rv64-fw-topc{animation:rv64PetalC .58s cubic-bezier(.14,.84,.18,1.08) 4.0s both}
${scope}.rv64-running .rv64-fw-topcr{animation:rv64PetalD .58s cubic-bezier(.14,.84,.18,1.08) 4.04s both}
${scope}.rv64-running .rv64-fw-topr{animation:rv64PetalE .58s cubic-bezier(.14,.84,.18,1.08) 4.08s both}
${scope}.rv64-running .rv64-fw-left1{animation:rv64PetalL1 .55s cubic-bezier(.14,.84,.18,1.08) 4.02s both}
${scope}.rv64-running .rv64-fw-left2{animation:rv64PetalL2 .55s cubic-bezier(.14,.84,.18,1.08) 4.08s both}
${scope}.rv64-running .rv64-fw-left3{animation:rv64PetalL3 .55s cubic-bezier(.14,.84,.18,1.08) 4.14s both}
${scope}.rv64-running .rv64-fw-right1{animation:rv64PetalR1 .55s cubic-bezier(.14,.84,.18,1.08) 4.02s both}
${scope}.rv64-running .rv64-fw-right2{animation:rv64PetalR2 .55s cubic-bezier(.14,.84,.18,1.08) 4.08s both}
${scope}.rv64-running .rv64-fw-right3{animation:rv64PetalR3 .55s cubic-bezier(.14,.84,.18,1.08) 4.14s both}
${scope}.rv64-running .rv64-final-cylinders{animation:rv64Cyl .46s cubic-bezier(.16,.84,.2,1.08) 4.1s both}
${scope}.rv64-running .rv64-final-mask{animation:rv64Mask .5s cubic-bezier(.12,.88,.18,1.12) 4.16s both}
${scope}.rv64-running .rv64-final-paws{animation:rv64Paws .38s cubic-bezier(.16,.84,.2,1.1) 4.22s both}
${scope}.rv64-running .rv64-svg{animation:rv64Impact .34s ease 4.2s both}
${scope} .rv64-flash{position:absolute;inset:0;pointer-events:none;opacity:0;background:#fff;mix-blend-mode:screen}
${scope}.rv64-running .rv64-flash{animation:rv64Flash .34s ease 4.22s both}
${scope} .rv64-burst{position:absolute;width:min(90vw,1200px);aspect-ratio:1;border-radius:50%;border:2px solid rgba(255,255,255,.8);opacity:0;box-shadow:0 0 60px rgba(255,46,57,.5),inset 0 0 60px rgba(72,255,100,.3)}
${scope}.rv64-running .rv64-burst{animation:rv64Burst .8s cubic-bezier(.12,.78,.2,1) 4.16s both}
${scope} .rv64-top{position:absolute;top:max(18px,env(safe-area-inset-top));left:max(18px,env(safe-area-inset-left));right:max(18px,env(safe-area-inset-right));display:flex;align-items:center;justify-content:space-between;gap:14px;z-index:8;pointer-events:none}
${scope} .rv64-brand{display:flex;align-items:center;gap:10px;font-size:12px;letter-spacing:.16em;text-transform:uppercase;color:#d9dde3}
${scope} .rv64-brand i{width:30px;height:3px;background:#e5222e;box-shadow:0 0 14px #e5222e}
${scope} .rv64-actions{display:flex;gap:8px;pointer-events:auto}
${scope} button{border:1px solid rgba(255,255,255,.22);background:rgba(9,12,18,.72);color:#fff;padding:10px 14px;border-radius:999px;font:700 11px/1 system-ui;letter-spacing:.08em;text-transform:uppercase;backdrop-filter:blur(12px);cursor:pointer}
${scope} button:hover{border-color:rgba(255,255,255,.55)}
${scope} .rv64-phase{position:absolute;left:50%;bottom:clamp(58px,8vh,92px);transform:translateX(-50%);text-align:center;z-index:7;min-width:min(88vw,620px);pointer-events:none}
${scope} .rv64-phase b{display:block;font-size:clamp(16px,2.1vw,26px);font-weight:900;letter-spacing:.24em;text-indent:.24em;color:#fff;text-shadow:0 0 24px rgba(255,255,255,.28)}
${scope} .rv64-phase span{display:block;margin-top:7px;font-size:10px;letter-spacing:.25em;color:#8f9aa8;text-transform:uppercase}
${scope} .rv64-phase [data-p]{position:absolute;left:0;right:0;opacity:0;transform:translateY(8px)}
${scope}.rv64-running .rv64-phase [data-p="entry"]{animation:rv64Label .72s ease .18s both}
${scope}.rv64-running .rv64-phase [data-p="white"]{animation:rv64Label .72s ease .84s both}
${scope}.rv64-running .rv64-phase [data-p="red"]{animation:rv64Label .72s ease 1.6s both}
${scope}.rv64-running .rv64-phase [data-p="rev"]{animation:rv64Label 1.18s ease 2.9s both}
${scope}.rv64-running .rv64-phase [data-p="henshin"]{animation:rv64Label 1.22s ease 4.14s both}
${scope} .rv64-reveal{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%) scale(.96);text-align:center;z-index:9;opacity:0;pointer-events:none;filter:drop-shadow(0 10px 20px #000)}
${scope} .rv64-reveal small{display:block;font:800 10px/1 system-ui;letter-spacing:.34em;color:#9ca5af;margin-bottom:12px}
${scope} .rv64-reveal strong{display:block;font:950 clamp(42px,8vw,108px)/.82 system-ui;letter-spacing:-.06em;color:#fff;white-space:nowrap}
${scope} .rv64-reveal em{font-style:normal;color:#ef2732}
${scope}.rv64-running .rv64-reveal{animation:rv64Reveal 1.45s cubic-bezier(.16,.84,.22,1) 5.08s both}
${scope} .rv64-progress{position:absolute;left:max(22px,env(safe-area-inset-left));right:max(22px,env(safe-area-inset-right));bottom:max(18px,env(safe-area-inset-bottom));height:2px;background:rgba(255,255,255,.12);overflow:hidden;z-index:9}
${scope} .rv64-progress i{display:block;height:100%;width:100%;transform-origin:left;background:linear-gradient(90deg,#fff,#e31f2b,#54ff6f);transform:scaleX(0)}
${scope}.rv64-running .rv64-progress i{animation:rv64Progress ${RV64_DURATION}ms linear both}
${scope}.rv64-safe .rv64-belt,${scope}.rv64-safe .rv64-base,${scope}.rv64-safe .rv64-white-buckle,${scope}.rv64-safe .rv64-red-back,${scope}.rv64-safe .rv64-final,${scope}.rv64-safe .rv64-final .rv64-fw,${scope}.rv64-safe .rv64-final-mask,${scope}.rv64-safe .rv64-final-paws,${scope}.rv64-safe .rv64-final-cylinders{opacity:1!important;transform:none!important}
${scope}.rv64-safe .rv64-prelock,${scope}.rv64-safe .rv64-red-buckle{opacity:0!important}
${scope}.rv64-safe .rv64-energy-core{opacity:1!important}
@keyframes rv64Aura{to{transform:rotate(360deg)}}
@keyframes rv64Fade{from{opacity:0;transform:translateY(14px) scale(.985)}to{opacity:1;transform:none}}
@keyframes rv64WhiteIn{0%{opacity:0;transform:translateX(-740px)}68%{opacity:1;transform:translateX(24px)}100%{opacity:1;transform:none}}
@keyframes rv64RedIn{0%{opacity:0;transform:translateX(740px)}68%{opacity:1;transform:translateX(-24px)}100%{opacity:1;transform:none}}
@keyframes rv64Energy{from{opacity:.08}to{opacity:1}}
@keyframes rv64EnergyPulse{from{opacity:.6}to{opacity:1}}
@keyframes rv64Rotate{0%{transform:rotate(0)}100%{transform:rotate(92deg)}}
@keyframes rv64RotateHold{0%{transform:rotate(92deg)}100%{transform:rotate(180deg)}}
@keyframes rv64Streaks{0%,100%{opacity:0}25%{opacity:.9}70%{opacity:.2}}
@keyframes rv64Hide{to{opacity:0}}
@keyframes rv64RedFrontFade{to{opacity:0}}
@keyframes rv64BackShow{0%{opacity:0}100%{opacity:1}}
@keyframes rv64BackTop{0%{opacity:0;transform:scale(.18) rotate(-38deg)}100%{opacity:1;transform:none}}
@keyframes rv64BackMid{0%{opacity:0;transform:scale(.18)}100%{opacity:1;transform:none}}
@keyframes rv64BackBot{0%{opacity:0;transform:scale(.18) rotate(38deg)}100%{opacity:1;transform:none}}
@keyframes rv64FinalShow{0%{opacity:0}100%{opacity:1}}
@keyframes rv64PetalA{0%{opacity:0;transform:translate(88px,126px) rotate(42deg) scale(.18)}100%{opacity:1;transform:none}}
@keyframes rv64PetalB{0%{opacity:0;transform:translate(52px,108px) rotate(28deg) scale(.18)}100%{opacity:1;transform:none}}
@keyframes rv64PetalC{0%{opacity:0;transform:translateY(106px) scale(.14)}100%{opacity:1;transform:none}}
@keyframes rv64PetalD{0%{opacity:0;transform:translate(-52px,108px) rotate(-28deg) scale(.18)}100%{opacity:1;transform:none}}
@keyframes rv64PetalE{0%{opacity:0;transform:translate(-88px,126px) rotate(-42deg) scale(.18)}100%{opacity:1;transform:none}}
@keyframes rv64PetalL1{0%{opacity:0;transform:translate(90px,24px) rotate(18deg) scale(.26)}100%{opacity:1;transform:none}}
@keyframes rv64PetalL2{0%{opacity:0;transform:translate(120px,0) rotate(6deg) scale(.26)}100%{opacity:1;transform:none}}
@keyframes rv64PetalL3{0%{opacity:0;transform:translate(90px,-24px) rotate(-18deg) scale(.26)}100%{opacity:1;transform:none}}
@keyframes rv64PetalR1{0%{opacity:0;transform:translate(-90px,24px) rotate(-18deg) scale(.26)}100%{opacity:1;transform:none}}
@keyframes rv64PetalR2{0%{opacity:0;transform:translate(-120px,0) rotate(-6deg) scale(.26)}100%{opacity:1;transform:none}}
@keyframes rv64PetalR3{0%{opacity:0;transform:translate(-90px,-24px) rotate(18deg) scale(.26)}100%{opacity:1;transform:none}}
@keyframes rv64Cyl{0%{opacity:0;transform:scale(.35)}100%{opacity:1;transform:none}}
@keyframes rv64Mask{0%{opacity:0;transform:scale(.18) translateY(28px)}100%{opacity:1;transform:none}}
@keyframes rv64Paws{0%{opacity:0;transform:translateY(16px) scale(.6)}100%{opacity:1;transform:none}}
@keyframes rv64Impact{0%,100%{transform:none}24%{transform:translate(-4px,3px) scale(1.014)}48%{transform:translate(5px,-2px) scale(.996)}72%{transform:translate(-2px,1px)}}
@keyframes rv64Flash{0%,100%{opacity:0}20%{opacity:.9}46%{opacity:.1}}
@keyframes rv64Burst{0%{opacity:.95;transform:scale(.18)}100%{opacity:0;transform:scale(1.12)}}
@keyframes rv64Label{0%{opacity:0;transform:translateY(9px)}16%,68%{opacity:1;transform:none}100%{opacity:0;transform:translateY(-8px)}}
@keyframes rv64Reveal{0%{opacity:0;transform:translate(-50%,-46%) scale(.94);filter:blur(7px)}26%,76%{opacity:1;transform:translate(-50%,-50%) scale(1);filter:none}100%{opacity:0;transform:translate(-50%,-54%) scale(1.025)}}
@keyframes rv64Progress{to{transform:scaleX(1)}}
@media(max-width:700px){${scope} .rv64-stage{width:118vw;height:62vh;transform:scale(.86)}${scope} .rv64-brand span{display:none}${scope} .rv64-actions button{padding:9px 11px;font-size:10px}${scope} .rv64-phase{bottom:76px}${scope} .rv64-phase span{font-size:9px}}
@media(max-width:430px){${scope} .rv64-stage{width:140vw;height:56vh;transform:scale(.8)}${scope} .rv64-brand b{font-size:10px}${scope} .rv64-actions button[data-rv64-sound]{display:none}}
@media(prefers-reduced-motion:reduce){${scope}:not(.rv64-force) .rv64-aura{animation:none}}
`;
}

const WORDS = {
  vi: { skip: 'Bỏ qua', sfxOff: 'Âm FX: Tắt', sfxOn: 'Âm FX: Bật', entry: 'DRIVER ENTRY', white: 'SET // WHITE BUCKLE', red: 'LOCK // RED BUCKLE', rev: 'REVOLVE // CLOCKWISE', henshin: 'HENSHIN // DEPLOY 180°', complete: 'HỌA SĨ 03 // TÁC PHẨM SẮP RA MẮT' },
  en: { skip: 'Skip', sfxOff: 'SFX: Off', sfxOn: 'SFX: On', entry: 'DRIVER ENTRY', white: 'SET // WHITE BUCKLE', red: 'LOCK // RED BUCKLE', rev: 'REVOLVE // CLOCKWISE', henshin: 'HENSHIN // DEPLOY 180°', complete: 'ARTIST 03 // ARTWORKS COMING SOON' }
};

export function initRaven() {
  const root = document.documentElement;
  let active = null;
  let lastError = '';

  function installStyle() {
    let style = document.getElementById('raven-v641-fidelity-style');
    if (!style) {
      style = document.createElement('style');
      style.id = 'raven-v641-fidelity-style';
      style.textContent = styles('.rv64-layer');
      document.head.append(style);
    }
  }
  function motionEnabled() { return root.dataset.motion !== 'off' && window.ClubMotion?.enabled !== false; }
  function canRun(explicit) { return !document.hidden && (explicit || motionEnabled()); }
  function lockPage(run) {
    const body = document.body;
    run.scrollY = window.scrollY || window.pageYOffset || 0;
    run.restore = { htmlOverflow: root.style.overflow, bodyOverflow: body.style.overflow, bodyPosition: body.style.position, bodyTop: body.style.top, bodyWidth: body.style.width };
    root.style.overflow = 'hidden'; body.style.overflow = 'hidden'; body.style.position = 'fixed'; body.style.top = `-${run.scrollY}px`; body.style.width = '100%';
  }
  function unlockPage(run) {
    if (!run?.restore) return;
    const body = document.body;
    root.style.overflow = run.restore.htmlOverflow; body.style.overflow = run.restore.bodyOverflow; body.style.position = run.restore.bodyPosition; body.style.top = run.restore.bodyTop; body.style.width = run.restore.bodyWidth;
    try { window.scrollTo(0, run.scrollY || 0); } catch {}
  }
  function schedule(run, fn, delay) {
    const id = setTimeout(() => { run.timers.delete(id); if (active === run) fn(); }, delay); run.timers.add(id); return id;
  }
  function stopSound(run) {
    const audio = run?.audio; if (!audio) return; run.audio = null;
    for (const node of audio.nodes) { try { node.stop?.(); } catch {} }
    try { audio.context.close(); } catch {}
  }
  function finish(run, reason = 'cancelled') {
    if (!run || active !== run) return;
    active = null;
    for (const id of run.timers) clearTimeout(id);
    run.timers.clear();
    stopSound(run);
    unlockPage(run);
    run.layer.remove();
    if (reason !== 'replaced' && reason !== 'hidden') {
      const target = run.trigger?.isConnected ? run.trigger : document.querySelector('[data-artist="raven-lin"]');
      target?.focus?.({ preventScroll: true });
    }
    document.dispatchEvent(new CustomEvent('club:raven', { detail: { active: false, reason, version: RV64_VERSION } }));
  }
  function stop(reason = 'cancelled') { finish(active, reason); }

  function makeLayer(words, explicit) {
    const layer = document.createElement('div');
    layer.className = `rv64-layer${explicit ? ' rv64-force' : ''}`;
    layer.setAttribute('role', 'dialog');
    layer.setAttribute('aria-modal', 'true');
    layer.setAttribute('aria-label', 'Raven Lin fidelity transformation');
    layer.innerHTML = `
      <div class="rv64-grid" aria-hidden="true"></div>
      <div class="rv64-aura" aria-hidden="true"></div>
      <div class="rv64-burst" aria-hidden="true"></div>
      <div class="rv64-flash" aria-hidden="true"></div>
      <header class="rv64-top">
        <div class="rv64-brand"><i></i><b>RAVEN LIN</b><span>FIDELITY DRIVER / 6.4.1</span></div>
        <div class="rv64-actions"><button type="button" data-rv64-sound aria-pressed="false">${words.sfxOff}</button><button type="button" data-rv64-skip>${words.skip} ↗</button></div>
      </header>
      <div class="rv64-stage">${driverSVG()}</div>
      <div class="rv64-phase" aria-hidden="true">
        <div data-p="entry"><b>ENTRY</b><span>${words.entry}</span></div>
        <div data-p="white"><b>SET</b><span>${words.white}</span></div>
        <div data-p="red"><b>LOCK</b><span>${words.red}</span></div>
        <div data-p="rev"><b>REVOLVE</b><span>${words.rev}</span></div>
        <div data-p="henshin"><b>HENSHIN</b><span>${words.henshin}</span></div>
      </div>
      <div class="rv64-reveal"><small>VECTOR 2.5D // HIGHER FIDELITY</small><strong>RAVEN <em>LIN</em></strong><span>${words.complete}</span></div>
      <div class="rv64-progress" aria-hidden="true"><i></i></div>`;
    return layer;
  }

  function buildSfx(run, button, words) {
    if (run.audio) { stopSound(run); button.textContent = words.sfxOff; button.setAttribute('aria-pressed', 'false'); return; }
    const Audio = window.AudioContext || window.webkitAudioContext; if (!Audio) { button.disabled = true; return; }
    try {
      const context = new Audio(); const master = context.createGain(); master.gain.value = .15; master.connect(context.destination); const audio = { context, master, nodes: [] }; run.audio = audio;
      context.resume().then(() => {
        if (active !== run || run.audio !== audio) return;
        button.textContent = words.sfxOn; button.setAttribute('aria-pressed', 'true');
        const elapsed = Math.max(0, performance.now() - run.startedAt);
        const cues = [[820,145,140,'square',.13],[1580,190,180,'sawtooth',.11],[2180,280,220,'square',.10],[2900,420,1040,'triangle',.075],[4220,74,780,'sine',.24]];
        for (const [ms,hz,dur,type,g] of cues) {
          if (ms <= elapsed) continue;
          const at = context.currentTime + (ms - elapsed) / 1000;
          const osc = context.createOscillator(); const gain = context.createGain();
          osc.type = type; osc.frequency.setValueAtTime(hz,at); osc.frequency.exponentialRampToValueAtTime(Math.max(35,hz*.45),at+dur/1000);
          gain.gain.setValueAtTime(.0001,at); gain.gain.exponentialRampToValueAtTime(g,at+.012); gain.gain.exponentialRampToValueAtTime(.0001,at+dur/1000);
          osc.connect(gain); gain.connect(master); osc.start(at); osc.stop(at+dur/1000+.05); audio.nodes.push(osc);
        }
      }).catch(() => stopSound(run));
    } catch { stopSound(run); }
  }

  function startTimeline(run) {
    if (active !== run) return;
    run.startedAt = performance.now();
    void run.layer.offsetWidth;
    run.layer.classList.add('rv64-running');
    schedule(run, () => finish(run, 'complete'), RV64_DURATION);
    schedule(run, () => {
      if (active !== run) return;
      const svg = run.layer.querySelector('.rv64-svg'); const box = svg?.getBoundingClientRect();
      if (!box || box.width < 20 || box.height < 20) run.layer.classList.add('rv64-safe');
    }, 500);
    document.dispatchEvent(new CustomEvent('club:raven', { detail: { active: true, duration: RV64_DURATION, version: RV64_VERSION, renderer: 'inline-svg' } }));
  }

  async function launch(trigger, { explicit = false } = {}) {
    stop('replaced'); lastError = ''; if (!canRun(explicit)) return false;
    try {
      installStyle(); const words = WORDS[root.lang === 'en' ? 'en' : 'vi']; const layer = makeLayer(words, explicit);
      const run = { layer, trigger: trigger || document.activeElement, explicit, startedAt: 0, timers: new Set(), audio: null, restore: null, scrollY: 0 };
      active = run;
      document.body.append(layer); lockPage(run);
      const skip = layer.querySelector('[data-rv64-skip]'); const sound = layer.querySelector('[data-rv64-sound]');
      skip.addEventListener('click', () => finish(run, 'skipped')); sound.addEventListener('click', () => buildSfx(run, sound, words));
      skip.focus({ preventScroll: true }); requestAnimationFrame(() => requestAnimationFrame(() => startTimeline(run)));
      return true;
    } catch (error) { lastError = error?.message || String(error); stop('unavailable'); return false; }
  }

  document.addEventListener('visibilitychange', () => { if (document.hidden) stop('hidden'); });
  document.addEventListener('club:motion', () => { if (!motionEnabled() && !active?.explicit) stop('motion-off'); });
  document.addEventListener('club:language', () => stop('language'));
  window.addEventListener('pagehide', () => stop('hidden'));
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && active) { event.preventDefault(); stop('escape'); } });

  const api = { launch, stop, preload: () => Promise.resolve(true), get state() { return { version: RV64_VERSION, active: !!active, elapsed: active?.startedAt ? Math.max(0, performance.now() - active.startedAt) : 0, duration: RV64_DURATION, sound: !!active?.audio, lastError, renderer: 'inline-svg' }; } };
  window.ClubRaven = api;
  return api;
}
