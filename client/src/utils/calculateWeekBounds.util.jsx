export const calculateWeekBounds = (date) => {
    const dayOfWeek = date.getDay();
    const firstDayOfWeek = new Date(date);
    const lastDayOfWeek = new Date(date);

    const diff = (dayOfWeek === 0 ? 6 : dayOfWeek - 1);
    firstDayOfWeek.setDate(firstDayOfWeek.getDate() - diff);

    const diffEnd = 6 - diff
    lastDayOfWeek.setDate(lastDayOfWeek.getDate() + diffEnd);

    return {
        firstDay: firstDayOfWeek,
        lastDay: lastDayOfWeek
    }
}