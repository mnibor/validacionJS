window.addEventListener('load', () => {
    const form = document.querySelector('.formulario__form');
    const usuario = document.getElementById('usuario');
    const email = document.getElementById('email');
    const pass  = document.getElementById('password');
    const pass2 = document.getElementById('password2');

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        validaCampos();
    });

    const validaCampos = () => {
        // Validamos el campo usuario
        const usuarioValor = usuario.value.trim();
        const emailValor = email.value.trim();
        const passValor = pass.value.trim();
        const pass2Valor = pass2.value.trim();

        // Operador ternario
        // ->!usuarioValor ? console.log('campo vacío') : console.log(usuarioValor);
        if (!usuarioValor) {
            validacionError(usuario, 'El campo no puede estar vacío');
        } else {
            validacionOk(usuario);
        }

        if (!emailValor) {
            validacionError(email, 'El campo no puede estar vacío');
        } else if (!validaEmail(emailValor)) {
            validacionError(email, 'El email ingresado no es válido');
        } else {
            validacionOk(email);
        }

        const er = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,15}$/;

        if (!passValor) {
            validacionError(pass, 'El campo no puede estar vacío');
        } else if (passValor < 8 || passValor > 16) {
            // Al menos la contraseña tenga 8 caracteres y no mas de 16
            validacionError(pass, 'El campo tiene que tener entre 8 y 16 caracteres');
        } else if (!passValor.match(er)) {
            validacionError(pass, 'El campo tiene que tener por lo menos una minúscula, una mayúscula y un número');
        } else {
            validacionOk(pass);
        }

        if (!pass2Valor) {
            validacionError(pass2, 'El campo no puede estar vacío');
        } else if (pass2Valor !== passValor) {
            validacionError(pass2, 'Las contraseñas no coinciden');
        } else {
            validacionOk(pass2);
        }
    };

    const validaEmail = (email) => {
        const expresion = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;
        return expresion.test(email);
    };

    const validacionError = (campo, mensaje) => {
        const formControl = campo.parentElement;
        const avisoError = formControl.querySelector('small');
        avisoError.innerHTML = mensaje;
        formControl.classList.add('form-control-error');
        avisoError.classList.remove('form-control-msj');
        avisoError.classList.add('form-control-msj-view');
    };

    const validacionOk = (campo) => {
        const formControl = campo.parentElement;
        const avisoError = formControl.querySelector('small');
        formControl.classList.add('form-control-ok');
        avisoError.classList.remove('form-control-msj-view');
        avisoError.classList.add('form-control-msj');
    }
});