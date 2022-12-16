export interface PasswordHelper {
    encryp(unecryptedPassword: string): string
    compare(unecryptedPassword: string, encryptedPassword: string): boolean
}