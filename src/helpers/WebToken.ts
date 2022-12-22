export interface WebToken {
    generateJWT(userId): Promise<string>
    getJWT(token: string): Promise<string>
}