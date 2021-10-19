function Validator(form) {
  let formRules = {};

  const css =
    '.form-group.invalid .form-control {border-color: #f33a58;} .form-group.invalid .form-message {color: #f33a58;}';
  const head = document.head || document.getElementsByTagName('head')[0];

  const style = document.createElement('style');

  head.appendChild(style);

  style.appendChild(document.createTextNode(css));

  const getParent = (element, selector) => {
    while (element.parentElement) {
      if (element.parentElement.matches(selector)) {
        return element.parentElement;
      }
      element = element.parentElement;
    }
  };

  const getConfirm = (confirmAt) => {
    return document.querySelector(`${form} #${confirmAt}`).value;
  };

  const valid = {
    required: (value) => {
      return value ? undefined : 'This is required.';
    },

    email: (value) => {
      const re =
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(value) ? undefined : 'This is an email address.';
    },

    min: (min) => {
      return (value) => {
        return value.length >= min
          ? undefined
          : `This must have a minimum of ${min} characters.`;
      };
    },

    max: (max) => {
      return (value) => {
        return value.length <= max
          ? undefined
          : `This must have a maximum of ${max} characters.`;
      };
    },
    phone: (value) => {
      const regex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
      return regex.test(value) ? undefined : 'This is a Phone Number.';
    },

    confirm: (confirmId) => {
      return (value) => {
        return value === getConfirm(confirmId)
          ? undefined
          : `The ${confirmId} don't match.`;
      };
    },
  };

  const formElement = document.querySelector(form);

  if (formElement) {
    const inputs = formElement.querySelectorAll('[name][rules]');

    const handleValidate = (event) => {
      const rules = formRules[event.target.name];

      let errorMessage;

      rules.find((rule) => {
        errorMessage = rule(event.target.value);
        return errorMessage;
      });

      if (errorMessage) {
        const parent = getParent(event.target, '.form-group');

        if (parent) {
          const formMessage = parent.querySelector('.form-message');

          parent.classList.add('invalid');

          if (formMessage) {
            formMessage.innerText = errorMessage;
          }
        }
      }
      return !errorMessage;
    };

    const handleClear = (event) => {
      const parent = getParent(event.target, '.form-group');

      if (parent.classList.contains('invalid')) {
        parent.classList.remove('invalid');

        const formMessage = parent.querySelector('.form-message');

        if (formMessage) {
          formMessage.innerText = '';
        }
      }
    };

    inputs.forEach((input) => {
      const ruleAtt = input.getAttribute('rules');

      const rules = ruleAtt.split('|');

      rules.forEach((rule) => {
        let ruleInfor;

        const isHasValue = rule.includes(':');

        if (isHasValue) {
          ruleInfor = rule.split(':');
          rule = ruleInfor[0];
        }

        let ruleCheck = valid[rule];

        if (isHasValue) {
          ruleCheck = ruleCheck(ruleInfor[1]);
        }

        if (Array.isArray(formRules[input.name])) {
          formRules[input.name].push(ruleCheck);
        } else {
          formRules[input.name] = [ruleCheck];
        }
      });
      input.onblur = handleValidate;
      input.oninput = handleClear;
    });

    formElement.onsubmit = (e) => {
      e.preventDefault();

      const inputs = formElement.querySelectorAll('[name][rules]');

      let isValid = true;

      inputs.forEach((input) => {
        if (!handleValidate({ target: input })) {
          isValid = false;
        }
      });
      if (isValid) {
        formElement.submit();
      }
    };
  }
}
