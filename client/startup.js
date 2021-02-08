import * as alt from 'alt-client';
import  {_enterVeh, _leave} from './drawtext';

alt.on('enteredVehicle', _enterVeh);
alt.on('leftVehicle', _leave);

