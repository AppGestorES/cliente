export const formatDate = (epoch: number): string => {
    const date = new Date(epoch * 1000);
    return date.toLocaleDateString();
};

export const formatKg = (value: number): string => {
    return `${value} kg`;
};
