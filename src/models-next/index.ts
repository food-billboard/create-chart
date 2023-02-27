import { makeAutoObservable } from 'mobx';
import {} from 'mobx-react-lite';
import Data from './data';
import Global from './global';
import Local from './local';
import User from './user';
import './configure';

export default class Store {
  data = new Data();
  local = new Local();
  user = new User();
  global = new Global();
}
