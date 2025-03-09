export const validateTCKN = (tckn: string) => {
    if (!/^\d{11}$/.test(tckn)) return false; 
    if (tckn[0] === '0') return false; 
}