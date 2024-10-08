export default function transformIntoBrl(value?: number) {
    return value?.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        maximumFractionDigits: 2,
    });
}