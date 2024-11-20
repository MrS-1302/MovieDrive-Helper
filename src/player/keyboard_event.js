var ctrlPressed=false;var shiftPressed=false;document.onkeydown=checkKeyDown;function checkKeyDown(e){e=e||window.event;if(e.keyCode=='9')return false;if(e.ctrlKey)ctrlPressed=true;if(e.shiftKey)shiftPressed=true;if(e.keyCode=='70')video_fullscreen();if(e.keyCode=='77')video_mute();if(e.keyCode=='32')video_pouseStart();if(e.keyCode=='37'&&ctrlPressed==false&&shiftPressed==false)gomb_event(0);if(e.keyCode=='39'&&ctrlPressed==false&&shiftPressed==false)gomb_event(1);if(e.keyCode=='38')gomb_event(2);if(e.keyCode=='40')gomb_event(3);if(e.keyCode=='37'&&ctrlPressed==true&&shiftPressed==false)unskip();if(e.keyCode=='39'&&ctrlPressed==true&&shiftPressed==false)skip();if(document.referrer.split("/")[2]=='animedrive.hu'&&e.keyCode=='39'&&ctrlPressed==true&&shiftPressed==true)nextep();}
document.onkeyup=checkKeyUp;function checkKeyUp(e){e=e||window.event;if(e.ctrlKey)ctrlPressed=false;if(e.shiftKey)shiftPressed=false;};var video=document.getElementById("video");var seekTime=5
var ido=300
const adatok=[[0,0],[0,0],[0,0]]
function skip(){player.forward(60);tekeresCount.innerHTML="60s »";tekeresCountParent.style.display="flex";setTimeout(gomb_vege,800);}
function unskip(){player.rewind(60);tekeresCount.innerHTML="« 60s";tekeresCountParent.style.display="flex";setTimeout(gomb_vege,800);}
function clickChecker(szam){most=Date.now()
if(most-adatok[szam][0]<=ido){adatok[szam][1]+=1
if(szam==1&&adatok[szam][1]+1==2||szam==1&&adatok[szam][1]+1==1&&player.paused=="true"){player.togglePlay()}else if(szam==0||szam==2){tekeresCount.innerHTML=(szam==0?"« ":"")+adatok[szam][1]*seekTime+"s"+(szam==2?" »":"")
tekeresCountParent.style.display="flex"}}
adatok[szam][0]=most
clickCheckerAuto()}
function clickCheckerAuto(){most=Date.now()
for(i=0;i<3;i++){if(most-adatok[i][0]>ido&&adatok[i][1]>0){if(i==0)player.rewind(adatok[i][1]*seekTime)
if(i==2)player.forward(adatok[i][1]*seekTime)
if(i==0||i==2)document.getElementById("tekeresCountParent").style.display="none"
adatok[i][1]=0}}
if(adatok[0][1]>0||adatok[1][1]>0||adatok[2][1]>0)setTimeout(clickCheckerAuto,ido)}
const gombok=[[0,0],[0,0],0]
var videoOldVolume=1
function video_mute(){gombok[2]=Date.now()
if(player.volume>0){videoOldVolume=player.volume
player.volume=0
tekeresCount.innerHTML="Muted"}
else{player.volume=videoOldVolume
tekeresCount.innerHTML=Math.round(videoOldVolume*100)+"%"}
tekeresCountParent.style.display="flex"
setTimeout(gomb_vege,800)}
function video_fullscreen(){document.activeElement.blur();player.fullscreen.toggle()}
function video_pouseStart(){document.activeElement.blur();player.togglePlay()}
function gomb_event(szam){most=Date.now()
if(szam==2||szam==3){gombok[2]=most
if(szam==2)player.increaseVolume(0.1)
if(szam==3)player.decreaseVolume(0.1)
tekeresCount.innerHTML=Math.round(player.volume*100)+"%"
tekeresCountParent.style.display="flex"
setTimeout(gomb_vege,800)}else{if(most-gombok[szam][1]>=150){gombok[szam][0]+=1
gombok[szam][1]=most
if(gombok[szam][0]==1||szam==0||szam==1)gomb_checker(szam)
tekeresCount.innerHTML=(szam==0?"« ":"")+gombok[szam][0]*seekTime+"s"+(szam==1?" »":"")
tekeresCountParent.style.display="flex"}}}
function gomb_vege(){if(Date.now()-gombok[2]>800){tekeresCountParent.style.display="none"}else setTimeout(gomb_vege,100)}
function gomb_checker(szam){if(Date.now()-gombok[szam][1]>500){if(szam==0)player.rewind((gombok[szam][0])*seekTime)
if(szam==1)player.forward((gombok[szam][0])*seekTime)
gombok[szam][0]=0
tekeresCountParent.style.display="none"}else{setTimeout(gomb_checker,100,szam)}}
function getDevice(){if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){return "mobile";}else return "desktop";}
ctrlPressedCheck=0
shiftPressedCheck=0
function cleaner(){document.activeElement.blur();if(ctrlPressed==true){ctrlPressedCheck+=1;if(ctrlPressedCheck==5){ctrlPressed=false;}}else{ctrlPressedCheck=0;}
if(shiftPressed==true){shiftPressedCheck+=1;if(shiftPressedCheck==5){shiftPressed=false;}}else{shiftPressedCheck=0;}
setTimeout(cleaner,200)}
cleaner();