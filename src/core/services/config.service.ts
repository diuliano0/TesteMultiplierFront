export class ConfigService {

    /**
     *
     * @returns {{host: string; token: string; client_id: number}}
     */
    static config() {
        return {
            // host: 'http://192.168.1.102:8000', //servidor local
            host: 'http://localhost:8200', // servidor local
            //host: 'https://apilook.lookei.com.br', // servidor local
            token: 'Z6UTO36NWuPGqTcIb7cdrO9BAGQSAu7AISBe2UEU',
            language: 'pt-BR',
            client_id: 1
        };
    }
}
