
import { differenceInYears, parseISO } from 'date-fns';

/**
 * Calcula la edad a partir de una fecha en formato ISO.
 * @param {string} isoDate - La fecha en formato ISO 8601.
 * @returns {number} - La edad calculada.
 */
function calcularEdad(isoDate: any) {
    const fechaNacimiento = parseISO(isoDate);
    const ahora = new Date();
    return differenceInYears(ahora, fechaNacimiento);
}

export default calcularEdad;