import * as native from 'natives';
import * as alt from 'alt-client';

let _Tank;
var _speedTick;
let _test;
let _speed;
let _tank;
let _engine;

export function _leave(){
    alt.clearEveryTick(_Tank);
    alt.clearInterval(_test);
    alt.clearEveryTick(_speedTick);
  }


export function _enterVeh(Vehicle){
   _tank = 1;
    
    _test = alt.setInterval(() =>{
      _speed = Math.round(native.getEntitySpeed(Vehicle.scriptID));
    }, 100);
  
   _engine = alt.everyTick(() =>{
  
        if(_tank <= 0){
          
            native.setVehicleEngineOn(Vehicle.scriptID, false, false, false);   
             
        }
    });
    _Tank = alt.setInterval(()=>{
      if(_tank >= 1){
        _tank -=1;
      }
    }, 7000);
    _speedTick  = alt.everyTick(() =>{
      drawText2d(_speed + ' kmh' , 0.85, 0.85, 1, 4, 255, 255, 255, 255);
      drawText2d('Tank:' + _tank + ' %', 0.85, 0.9, 1, 4, 255, 255, 255, 255);
    });
  }

export function drawText2d(
    msg,
    x,
    y,
    scale,
    fontType,
    r,
    g,
    b,
    a,
    useOutline = true,
    useDropShadow = true,
    layer = 0,
    align = 0
) {
    let hex = msg.match('{.*}');
    if (hex) {
        const rgb = hexToRgb(hex[0].replace('{', '').replace('}', ''));
        r = rgb[0];
        g = rgb[1];
        b = rgb[2];
        msg = msg.replace(hex[0], '');
    }

    native.beginTextCommandDisplayText('STRING');
    native.addTextComponentSubstringPlayerName(msg);
    native.setTextFont(fontType);
    native.setTextScale(1, scale);
    native.setTextWrap(0.0, 1.0);
    native.setTextCentre(true);
    native.setTextColour(r, g, b, a);
    native.setTextJustification(align);

    if (useOutline) {
        native.setTextOutline();
    }

    if (useDropShadow) {
        native.setTextDropShadow();
    }

    native.endTextCommandDisplayText(x, y);
}