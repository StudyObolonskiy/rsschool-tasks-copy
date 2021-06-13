import { App } from './app';
import './styles.scss';

window.onload = () => {
  const appElement = document.body;

  if (!appElement) throw new Error('App root element not found');
  const app = new App(appElement);
  app.start();
};
