import './styles.scss';
import { App } from './app';

window.onload = () => {
  new App(document.body).routing();
};
