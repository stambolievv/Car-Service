function formDataHandler(form, ...fields) {
    const formData = new FormData(form);

    const inputs = {};

    for (const field of fields) {
        inputs[field] = formData.get(field).trim();
    }

    const ignoreField = ['vin', 'model', 'engine', 'customerPhone'];

    const errors = Object
        .entries(inputs)
        .reduce((a, [k, v]) => Object.assign(a, { [k]: (!ignoreField.includes(k) && v == '') }), {});

    const missing = Object
        .values(errors)
        .filter(v => v == true).length;

    if (missing > 0) { handleError('Полета са задължителни!'); }

    if (inputs.password != inputs.repass && inputs.repass) {
        Object.assign(errors, { password: true, repass: true });
        handleError('Паролите не съвпадат!');
    }

    function handleError(message = '') {
        throw {
            errorMsg: new Error(message).message,
            errorType: errors,
            errorData: inputs
        };
    }

    form.reset();

    return inputs;
}

export { formDataHandler };
