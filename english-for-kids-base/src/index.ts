import { App } from './app';
import './styles.scss';

window.onload = () => {
  const app = new App(document.body);
  app.renderStartPage();
};
