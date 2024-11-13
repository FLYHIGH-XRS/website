export function registerValidityCheck(inputUserName, inputQQNumber, inputPassword, inputConfirmPassword, inputInviteCode) {
    if (inputUserName === null) {
        return ({ checkStatus: false, message: '用户名不能为空' });
    }

    if (inputQQNumber === null) {
        return ({ checkStatus: false, message: 'QQ号不能为空' });
    }

    if (inputPassword === null) {
        return ({ checkStatus: false, message: '密码不能为空' });
    }

    if (inputConfirmPassword === null) {
        return ({ checkStatus: false, message: '确认密码不能为空' });
    }

    if (inputInviteCode === null) {
        return ({ checkStatus: false, message: '邀请码不能为空' });
    }

    if (typeof inputUserName !== 'string') {
        return ({ checkStatus: false, message: '用户名的数据类型必须为字符串' });
    }
    if (typeof inputQQNumber !== 'number') {
        return ({ checkStatus: false, message: 'QQ号的数据类型必须为数字' });
    }
    if (typeof inputPassword !== 'string') {
        return ({ checkStatus: false, message: '密码的数据类型必须为字符串' });
    }
    if (typeof inputConfirmPassword !== 'string') {
        return ({ checkStatus: false, message: '确认密码的数据类型必须为字符串' });
    }
    if (typeof inputInviteCode !== 'string') {
        return ({ checkStatus: false, message: '邀请码的数据类型必须为字符串' });
    }

    if (inputUserName.length < 4 || inputUserName.length > 10) {
        return ({ checkStatus: false, message: '用户名长度必须在4-10位之间' });
    }

    if (!isValidUserName(inputUserName)) {
        return ({ checkStatus: false, message: '用户名只能包含字母或数字或同时包含字母和数字' });
    }

    if (inputPassword.length < 6 || inputPassword.length > 15) {
        return ({ checkStatus: false, message: '密码长度必须在6-15位之间' });
    }

    if (!isValidPassword(inputPassword)) {
        return ({ checkStatus: false, message: '密码必须同时包含字母和数字' });
    }

    if (inputConfirmPassword.length < 6 || inputConfirmPassword.length > 15) {
        return ({ checkStatus: false, message: '确认密码的长度必须在6-15位之间' });
    }

    if (!isValidPassword(inputConfirmPassword)) {
        return ({ checkStatus: false, message: '确认密码必须同时包含字母和数字' });
    }

    if (inputConfirmPassword !== inputPassword) {
        return ({ checkStatus: false, message: '两次密码输入不一致，请确认密码的一致性' });
    }

    return ({ checkStatus: true, message: '检查通过' });
}

export function loginValidityCheck(inputQQNumber, inputPassword) {
    if (inputQQNumber === null) {
        return ({ checkStatus: false, message: 'QQ号不能为空' });
    }

    if (inputPassword === null) {
        return ({ checkStatus: false, message: '密码不能为空' });
    }

    if (typeof inputQQNumber !== 'number') {
        return ({ checkStatus: false, message: 'QQ号的数据类型必须为数字' });
    }
    if (typeof inputPassword !== 'string') {
        return ({ checkStatus: false, message: '密码的数据类型必须为字符串' });
    }

    return ({ checkStatus: true, message: '检查通过' });
}

export function isValidUserName(inputUserName) {
    const regex = /^[a-zA-Z0-9]+$/;
    return regex.test(inputUserName);
}

export function isValidPassword(inputPassword) {
    const hasLetter = /[a-zA-Z]/.test(inputPassword); // 检查是否包含英文字母
    const hasNumber = /[0-9]/.test(inputPassword);    // 检查是否包含数字
    return hasLetter && hasNumber;
}

export function isGiftCardCodeValid(giftCardCode) {
    const regex = /^[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/;
    return regex.test(giftCardCode);
}