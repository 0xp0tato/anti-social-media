type EmailSenderResponse = {
    status: 'success' | 'error';
    toEmail: string;
};

export class EmailSender {
    private isActive = false;
    private static emailSenderInstance: EmailSender;
    private constructor() {}

    static getInstance(): EmailSender {
        if (!this.emailSenderInstance) this.emailSenderInstance = new EmailSender();

        return this.emailSenderInstance;
    }

    deactivate(): void {
        this.isActive = false;
    }

    async sendEmail(toEmail: string): Promise<EmailSenderResponse> {
        this.validateEmailSender();
        return new Promise((reject, resolve) => resolve({ toEmail, status: 'success' }));
    }

    private validateEmailSender(): void {
        if (!this.isActive) throw new Error('Email sender is not active');
    }
}
