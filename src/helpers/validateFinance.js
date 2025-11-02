import balanceService from "../database/services/BalanceService";

const ACTION_TYPES = ['ingreso', 'retiro'];

const validateType = (type) => {
    if (typeof type !== 'string')
        return { valid: false, msg: 'El tipo debe ser un string' };

    if (!ACTION_TYPES.includes(type))
        return { valid: false, msg: 'Tipo de acción inválido' };

    return { valid: true };
};

const validateAmount = (amount) => {
    const num = Number(amount);

    if (isNaN(num))
        return { valid: false, msg: 'Monto inválido' };

    if (num <= 0)
        return { valid: false, msg: 'El monto debe ser mayor a 0' };

    return { valid: true, value: num }; 
};


const validateDescription = (description) => {
    if (typeof description !== 'string')
        return { valid: false, msg: 'La descripción debe ser texto' };

    if (description.length > 150)
        return { valid: false, msg: 'Descripción demasiado larga (máximo 150 caracteres)' };

    return { valid: true };
};

const validateWithdrawal = async (amount) => {
    const balance = await balanceService.getBalance();
    if (balance < amount)
        return { valid: false, msg: 'Monto insuficiente para retiro' };

    return { valid: true };
};



export const validateActionF = async (amount, type, description = '') => {
    // Validar tipo
    const t = validateType(type);
    if (!t.valid) return { validate: false, msg: t.msg };

    // Validar monto
    const a = validateAmount(amount);
    if (!a.valid) return { validate: false, msg: a.msg };

    // Validar descripción
    const d = validateDescription(description);
    if (!d.valid) return { validate: false, msg: d.msg };

    // Validar retiro si corresponde
    if (type === 'retiro') {
        const w = await validateWithdrawal(amount);
        if (!w.valid) return { validate: false, msg: w.msg };
    }

    return { validate: true, msg: 'Validación exitosa ✅' };
};
