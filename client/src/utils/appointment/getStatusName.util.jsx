export const getStatusName = (status) => {
    switch (status) {
        case 'pending':
            return 'En attente'
        case 'confirmed':
            return 'Confirmé'
        case 'cancelled':
            return 'Annulé'
        case 'completed':
            return 'Terminé'
        default:
            return 'Inconnu'
    }
}