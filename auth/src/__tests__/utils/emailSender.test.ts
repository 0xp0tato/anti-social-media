import { EmailSender } from '../../utils';

it('should throw an error when sending an email if the email sender is deactivated', () => {
    const emailSender = EmailSender.getInstance();

    emailSender.deactivate();

    expect(emailSender.sendEmail('test@test.com')).rejects.toThrow('Email sender is not active');
});
