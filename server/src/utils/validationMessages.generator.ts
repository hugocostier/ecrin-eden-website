export default class ValidationMessages {
    static getMessage(row: string, validationType: string, ...args: any[]): string {
        switch (validationType) {
            case 'isDefined':
                return `${row} must be defined`
            case 'type':
                return `${row} must be a ${args[0]}`
            case 'length':
                return `${row} cannot exceed ${args[0]} characters`
            case 'lengthRange':
                return `${row} must be between ${args[0]} and ${args[1]} characters`
            case 'definedLength':
                return `${row} must be exactly ${args[0]} characters`
            case 'isPhoneNumber':
                return `${row} must be a valid phone number`
            case 'isEmpty':
                return `${row} cannot be empty`
            case 'min':
                return `${row} must be at least ${args[0]}`
            case 'max':
                return `${row} cannot exceed ${args[0]}`
            case 'isPositive':
                return `${row} must be a positive number`
            case 'date':
                return `${row} must be a valid date`
            case 'dateFormat':
                return `${row} must be in the format ${args[0]}`
            case 'isPostalCode':
                return `${row} must be a valid postal code`
            case 'isEmail':
                return `${row} must be a valid email address`
            case 'isEnum':
                return `${row} must be a valid enum value`
            case 'isPositive': 
                return `${row} must be a positive number`
            default:
                return ''
        }
    }
}