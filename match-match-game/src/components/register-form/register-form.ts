import { User } from '../../models/user';
import { BaseComponent } from '../base-component';
import { Input } from '../input';
import './register-form.scss';

export class RegisterForm extends BaseComponent {
  private title: BaseComponent;

  private avatarWrapper: BaseComponent;

  private avatarImg: HTMLCanvasElement;

  private controlForm: BaseComponent;

  private addBtn: HTMLButtonElement;

  private cancelBtn: HTMLButtonElement;

  private form: HTMLFormElement;

  private firstNameLabel: HTMLLabelElement;

  private firstName: Input;

  private firstNameError: BaseComponent;

  private lastNameLabel: HTMLLabelElement;

  private lastName: Input;

  private lastNameError: BaseComponent;

  private mailLabel: HTMLLabelElement;

  private mail: Input;

  private fileInput: Input;

  public user: User = {
    firstName: '',
    lastName: '',
    email: '',
    avatar: '',
    score: 0,
  };

  isValid = false;

  imgSrc = './images/avatar.png';

  constructor() {
    super('div', ['form-wrapper']);
    this.title = new BaseComponent('h2', ['title']);
    this.avatarWrapper = new BaseComponent('div', ['avatar-wrapper']);
    this.avatarImg = document.createElement('canvas');
    this.controlForm = new BaseComponent('div', ['control-form']);
    this.addBtn = document.createElement('button');
    this.cancelBtn = document.createElement('button');
    this.form = document.createElement('form');
    this.firstNameLabel = document.createElement('label');
    this.lastNameLabel = document.createElement('label');
    this.mailLabel = document.createElement('label');
    this.firstName = new Input([
      ['type', 'text'],
      ['id', 'first-name'],
      ['placeholder', 'John'],
    ]);
    this.firstNameError = new BaseComponent('div', ['error']);
    this.lastName = new Input([
      ['type', 'text'],
      ['id', 'last-name'],
      ['placeholder', 'Smith'],
    ]);
    this.lastNameError = new BaseComponent('div', ['error']);
    this.mail = new Input([
      ['type', 'email'],
      ['id', 'email'],
      ['placeholder', 'smith.john@example.com'],
    ]);
    this.fileInput = new Input([
      ['type', 'file'],
      ['accept', 'image/*'],
    ]);
  }

  createForm(): void {
    this.title.element.textContent = 'Register new player';
    this.firstNameLabel.setAttribute('for', 'first-name');
    this.firstNameLabel.textContent = 'First Name';
    this.lastNameLabel.setAttribute('for', 'last-name');
    this.lastNameLabel.textContent = 'Last Name';
    this.mailLabel.setAttribute('for', 'email');
    this.mailLabel.textContent = 'E-mail';
    this.addBtn.classList.add('add-user');
    this.cancelBtn.classList.add('cancel');
    this.addBtn.textContent = 'Add player';
    this.cancelBtn.textContent = 'Cancel';
    this.avatarWrapper.element.append(this.avatarImg);
    this.form.append(
      this.firstNameLabel,
      this.firstName.element,
      this.firstNameError.element,
      this.lastNameLabel,
      this.lastName.element,
      this.lastNameError.element,
      this.mailLabel,
      this.mail.element,
      this.fileInput.element
    );
    this.controlForm.element.append(this.addBtn, this.cancelBtn);
    this.element.append(this.title.element, this.avatarWrapper.element, this.form, this.controlForm.element);
  }

  inputValidation(): void {
    const onlyNum = /^[0-9]+$/;
    const validPerson = /^[а-яА-Яa-zA-Z0-9 ]{1,30}$/;
    const mailValid = /\S+@\S+\.\S+/;

    this.firstName.element.addEventListener('input', () => {
      if (this.firstName.element.value.length === 0 || !this.firstName.element.value.match(validPerson)) {
        this.firstName.element.classList.remove('valid');
        this.firstName.element.classList.add('invalid');
        this.firstNameError.element.textContent = 'The field is empty or exceeds 30 characters';
      }
      if (this.firstName.element.value.match(onlyNum)) {
        this.firstName.element.classList.remove('valid');
        this.firstName.element.classList.add('invalid');
        this.firstNameError.element.textContent = 'The field should not contain only numbers';
      }
      if (this.firstName.element.value.match(validPerson) && !this.firstName.element.value.match(onlyNum)) {
        this.firstName.element.classList.remove('invalid');
        this.firstName.element.classList.add('valid');
        this.firstNameError.element.textContent = '';
      }
    });
    this.lastName.element.addEventListener('input', () => {
      if (this.lastName.element.value.length === 0 || !this.lastName.element.value.match(validPerson)) {
        this.lastName.element.classList.remove('valid');
        this.lastName.element.classList.add('invalid');
        this.lastNameError.element.textContent = 'The field is empty or exceeds 30 characters';
      }
      if (this.lastName.element.value.match(onlyNum)) {
        this.lastName.element.classList.remove('valid');
        this.lastName.element.classList.add('invalid');
        this.lastNameError.element.textContent = 'The field should not contain only numbers';
      }
      if (this.lastName.element.value.match(validPerson) && !this.lastName.element.value.match(onlyNum)) {
        this.lastName.element.classList.remove('invalid');
        this.lastName.element.classList.add('valid');
        this.lastNameError.element.textContent = '';
      }
    });
    this.mail.element.addEventListener('input', () => {
      if (this.mail.element.value.match(mailValid)) {
        this.mail.element.classList.remove('invalid');
        this.mail.element.classList.add('valid');
      } else if (this.mail.element.value.length === 0) {
        this.mail.element.classList.remove('valid');
        this.mail.element.classList.add('invalid');
      } else {
        this.mail.element.classList.remove('valid');
        this.mail.element.classList.add('invalid');
      }
    });
  }

  drawAvatar(): void {
    const ctx = this.avatarImg.getContext('2d');
    const image = new Image(80, 80);

    image.src = this.imgSrc;
    const drawImageCanvas = () => {
      if (ctx) {
        this.avatarImg.width = 80;
        this.avatarImg.height = 80;
        ctx.drawImage(image, 0, 0, image.width, image.height);
      }
    };
    image.onload = drawImageCanvas;
  }

  addAvatar(): void {
    this.fileInput.element.addEventListener('input', () => {
      if (this.fileInput.element.files) {
        const file = this.fileInput.element.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
          const ctx = this.avatarImg.getContext('2d');
          const image = new Image(80, 80);

          image.src = String(reader.result);
          const drawImageCanvas = () => {
            if (ctx) {
              this.avatarImg.width = 80;
              this.avatarImg.height = 80;
              ctx.drawImage(image, 0, 0, image.width, image.height);
            }
          };
          image.onload = drawImageCanvas;
          this.imgSrc = String(reader.result);
        };
        if (file) {
          reader.readAsDataURL(file);
        }
      }
    });
  }

  validationForm(): void {
    if (
      this.mail.element.matches('.valid') &&
      this.lastName.element.matches('.valid') &&
      this.firstName.element.matches('.valid')
    ) {
      this.isValid = true;
    }
  }

  clearForm(): void {
    this.mail.element.value = '';
    this.mail.element.classList.remove('valid');
    this.mail.element.classList.remove('invalid');
    this.firstName.element.value = '';
    this.firstName.element.classList.remove('valid');
    this.firstName.element.classList.remove('invalid');
    this.lastName.element.value = '';
    this.lastName.element.classList.remove('valid');
    this.lastName.element.classList.remove('invalid');
    this.controlForm.element.innerHTML = '';
    this.form.innerHTML = '';
    this.element.innerHTML = '';
    this.element.remove();
  }

  showForm(): void {
    this.createForm();
    this.drawAvatar();
    this.inputValidation();
    this.addAvatar();
    this.addBtn.addEventListener('click', () => {
      this.validationForm();
      if (this.isValid) {
        const controlField = document.querySelector('.control-field');
        const avatar = controlField?.querySelector('canvas');

        if (avatar) {
          const ctx = avatar.getContext('2d');
          const image = new Image(40, 40);

          image.src = this.imgSrc;
          const drawImageCanvas = () => {
            if (ctx) {
              ctx.clearRect(0, 0, 40, 40);
              this.avatarImg.width = 40;
              this.avatarImg.height = 40;
              ctx.drawImage(image, 0, 0, image.width, image.height);
            }
          };
          image.onload = drawImageCanvas;
        }
        controlField?.classList.add('register');
        this.user.firstName = `${this.firstName.element.value}`;
        this.user.lastName = `${this.lastName.element.value}`;
        this.user.email = `${this.mail.element.value}`;
        this.user.avatar = `${this.imgSrc}`;

        this.clearForm();
      }
    });
    this.cancelBtn.addEventListener('click', () => {
      this.clearForm();
    });
  }

  getUser(): User {
    return this.user;
  }
}
