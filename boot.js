/* 総力戦1914　起動用（GitHub Pages でも、GAS でも、ファイルを直接開いても、同じものを使う）
   ゲームの中身は page.js（画面の形と見た目）と game.js（プログラムとデータ）に入っている。
   この2つは、もとのファイルから自動で作るので、ここは書きかえなくてよい。 */
(function(){
  var B=window.TW_BASE||'';
  // 絵・音楽・動画・モデルの場所を、中身の置き場に合わせる
  if(B&&!document.querySelector('base[href]')){var b=document.createElement('base');b.href=B;document.head.insertBefore(b,document.head.firstChild);}
  var f=document.createElement('link');f.rel='stylesheet';
  f.href='https://fonts.googleapis.com/css2?family=BIZ+UDPGothic:wght@400;700&family=BIZ+UDPMincho:wght@400;700&display=swap';document.head.appendChild(f);
  function fail(name){var d=document.createElement('p');d.style.cssText='padding:2em;font:18px "BIZ UDPGothic",sans-serif;color:#ece6d3;background:#151816;margin:0;min-height:100vh;box-sizing:border-box';
    d.textContent='読みこみに失敗しました（'+name+'）。ページを読みこみ直してください。';document.body.insertBefore(d,document.body.firstChild);}
  function load(name,then){var s=document.createElement('script');s.src=B+name;s.onload=then;s.onerror=function(){fail(name);};document.body.appendChild(s);}
  load('page.js',function(){
    var P=window.TW_PAGE;if(!P){fail('page.js');return;}
    P.css.forEach(function(c){var s=document.createElement('style');s.textContent=c;document.head.appendChild(s);});
    document.body.insertAdjacentHTML('afterbegin',P.html);
    load('game.js',function(){
      // 爆発などの効果（three.js を使う部分）。読みこめない端末でも、ゲームは動く
      P.mods.forEach(function(m){var s=document.createElement('script');s.type='module';s.textContent=m;document.body.appendChild(s);});
    });
  });
  // 読みこんだ版を、画面の左下に小さく出す（新しい版が届いているかを確かめるため）
  var m=B.match(/@([0-9a-z.\-]+)\//),v=m?m[1]:'';
  if(v){var t=document.createElement('div');t.id='verTag';t.textContent='版 '+(v.length===40?v.slice(0,7):v);
    t.style.cssText='position:fixed;left:6px;bottom:2px;z-index:9;font:10px "BIZ UDPGothic",sans-serif;color:#a8a28d;opacity:.55;pointer-events:none';document.body.appendChild(t);}
})();
